const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Get user progress and stats
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const pool = req.app.get('db');
    if (!pool) {
      return res.status(503).json({ error: 'Database not available' });
    }

    const userId = req.user.userId;

    // Get user progress
    const progressResult = await pool.query(
      'SELECT * FROM user_progress WHERE user_id = $1',
      [userId]
    );

    if (progressResult.rows.length === 0) {
      return res.status(404).json({ error: 'User progress not found' });
    }

    const progress = progressResult.rows[0];

    // Get recent submissions
    const submissionsResult = await pool.query(
      `SELECT s.*, p.title as problem_title, p.difficulty 
       FROM submissions s 
       JOIN problems p ON s.problem_id = p.id 
       WHERE s.user_id = $1 
       ORDER BY s.submitted_at DESC 
       LIMIT 10`,
      [userId]
    );

    // Get user achievements
    const achievementsResult = await pool.query(
      `SELECT a.* FROM achievements a
       JOIN user_achievements ua ON a.id = ua.achievement_id
       WHERE ua.user_id = $1
       ORDER BY ua.earned_at DESC`,
      [userId]
    );

    // Calculate current streak
    const streakResult = await pool.query(
      `SELECT activity_date FROM daily_activity 
       WHERE user_id = $1 
       ORDER BY activity_date DESC 
       LIMIT 30`,
      [userId]
    );

    let currentStreak = 0;
    if (streakResult.rows.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let checkDate = new Date(today);
      const activities = streakResult.rows.map(row => {
        const date = new Date(row.activity_date);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      });

      // Check if user was active today or yesterday
      const todayTime = today.getTime();
      const yesterdayTime = todayTime - 86400000; // 24 hours in ms

      if (activities.includes(todayTime) || activities.includes(yesterdayTime)) {
        // Start from yesterday if not active today
        if (!activities.includes(todayTime)) {
          checkDate = new Date(yesterdayTime);
        }

        // Count consecutive days
        while (activities.includes(checkDate.getTime())) {
          currentStreak++;
          checkDate = new Date(checkDate.getTime() - 86400000);
        }
      }
    }

    res.json({
      progress: {
        ...progress,
        current_streak: currentStreak
      },
      recentSubmissions: submissionsResult.rows,
      achievements: achievementsResult.rows
    });

  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Submit a solution
router.post('/submit', authenticateToken, async (req, res) => {
  try {
    const pool = req.app.get('db');
    if (!pool) {
      return res.status(503).json({ error: 'Database not available' });
    }

    const userId = req.user.userId;
    const { problemId, code, language, timeTaken, passed, testsPassed, testsTotal } = req.body;

    // Validate input
    if (!problemId || !code || !language || typeof passed !== 'boolean') {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Start transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Check if this is first time solving this problem
      const firstSolveResult = await client.query(
        'SELECT id FROM submissions WHERE user_id = $1 AND problem_id = $2 AND passed = true',
        [userId, problemId]
      );
      const isFirstSolve = firstSolveResult.rows.length === 0 && passed;

      // Insert submission
      const submissionResult = await client.query(
        `INSERT INTO submissions (user_id, problem_id, code, language, time_taken, passed, tests_passed, tests_total)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [userId, problemId, code, language, timeTaken || 0, passed, testsPassed || 0, testsTotal || 0]
      );

      let xpEarned = 0;

      if (passed) {
        // Calculate XP
        const baseXP = 50;
        let bonusXP = 0;

        // Speed bonus: 10 XP if solved in less than 2 minutes
        if (timeTaken && timeTaken < 120) {
          bonusXP += 10;
        }

        // First time solve bonus: 25 XP
        if (isFirstSolve) {
          bonusXP += 25;
        }

        xpEarned = baseXP + bonusXP;

        // Update user progress
        await client.query(
          `UPDATE user_progress 
           SET total_xp = total_xp + $1,
               problems_solved = problems_solved + $2,
               total_time_spent = total_time_spent + $3,
               last_activity = NOW()
           WHERE user_id = $4`,
          [xpEarned, isFirstSolve ? 1 : 0, timeTaken || 0, userId]
        );

        // Record daily activity
        const today = new Date().toISOString().split('T')[0];
        await client.query(
          `INSERT INTO daily_activity (user_id, activity_date, problems_solved, xp_earned)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (user_id, activity_date) 
           DO UPDATE SET 
             problems_solved = daily_activity.problems_solved + $3,
             xp_earned = daily_activity.xp_earned + $4`,
          [userId, today, isFirstSolve ? 1 : 0, xpEarned]
        );

        // Check and award achievements
        await checkAndAwardAchievements(client, userId);
      }

      await client.query('COMMIT');

      // Get updated progress
      const progressResult = await client.query(
        'SELECT * FROM user_progress WHERE user_id = $1',
        [userId]
      );

      res.json({
        submission: submissionResult.rows[0],
        xpEarned,
        isFirstSolve,
        progress: progressResult.rows[0]
      });

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Error submitting solution:', error);
    res.status(500).json({ error: 'Failed to submit solution' });
  }
});

// Get leaderboard
router.get('/leaderboard', authenticateToken, async (req, res) => {
  try {
    const pool = req.app.get('db');
    if (!pool) {
      return res.status(503).json({ error: 'Database not available' });
    }

    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const result = await pool.query(
      `SELECT u.id, u.username, u.full_name, up.total_xp, up.problems_solved, up.current_streak
       FROM users u
       JOIN user_progress up ON u.id = up.user_id
       ORDER BY up.total_xp DESC, up.problems_solved DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    // Add rank to each user
    const leaderboard = result.rows.map((user, index) => ({
      ...user,
      rank: offset + index + 1
    }));

    res.json({ leaderboard });

  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get user's submission history for a specific problem
router.get('/submissions/:problemId', authenticateToken, async (req, res) => {
  try {
    const pool = req.app.get('db');
    if (!pool) {
      return res.status(503).json({ error: 'Database not available' });
    }

    const userId = req.user.userId;
    const problemId = parseInt(req.params.problemId);

    const result = await pool.query(
      `SELECT s.*, p.title as problem_title 
       FROM submissions s
       JOIN problems p ON s.problem_id = p.id
       WHERE s.user_id = $1 AND s.problem_id = $2
       ORDER BY s.submitted_at DESC`,
      [userId, problemId]
    );

    res.json({ submissions: result.rows });

  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Helper function to check and award achievements
async function checkAndAwardAchievements(client, userId) {
  // Get current progress
  const progressResult = await client.query(
    'SELECT * FROM user_progress WHERE user_id = $1',
    [userId]
  );
  const progress = progressResult.rows[0];

  // Get all achievements
  const achievementsResult = await client.query('SELECT * FROM achievements');
  const achievements = achievementsResult.rows;

  // Get already earned achievements
  const earnedResult = await client.query(
    'SELECT achievement_id FROM user_achievements WHERE user_id = $1',
    [userId]
  );
  const earnedIds = new Set(earnedResult.rows.map(row => row.achievement_id));

  // Check each achievement
  for (const achievement of achievements) {
    if (earnedIds.has(achievement.id)) continue;

    let shouldAward = false;

    // Check criteria based on achievement type
    if (achievement.criteria.type === 'problems_solved') {
      shouldAward = progress.problems_solved >= achievement.criteria.target;
    } else if (achievement.criteria.type === 'streak') {
      shouldAward = progress.current_streak >= achievement.criteria.target;
    } else if (achievement.criteria.type === 'xp') {
      shouldAward = progress.total_xp >= achievement.criteria.target;
    }

    if (shouldAward) {
      await client.query(
        'INSERT INTO user_achievements (user_id, achievement_id) VALUES ($1, $2)',
        [userId, achievement.id]
      );
    }
  }
}

module.exports = router;
