// Problems API Routes
// Handles problem listing, details, submissions, bookmarks, hints, and daily challenges

const express = require('express');
const { pool } = require('../config/database');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// ============================================================================
// GET /api/problems - List all problems with filters and pagination
// ============================================================================
router.get('/', optionalAuth, async (req, res) => {
  const userId = req.user?.id; // Optional authentication
  const {
    difficulty,    // Filter: 'Easy', 'Medium', 'Hard'
    pattern,       // Filter: pattern slug (e.g., 'arrays-hashing')
    company,       // Filter: company name (e.g., 'Amazon')
    status,        // Filter: 'solved', 'attempted', 'unsolved'
    search,        // Search: title or description
    page = 1,      // Pagination: page number (default 1)
    limit = 20     // Pagination: items per page (default 20)
  } = req.query;

  try {
    // Build WHERE clause dynamically
    const conditions = [];
    const params = [];
    let paramIndex = 1;

    // Difficulty filter
    if (difficulty) {
      conditions.push(`p.difficulty = $${paramIndex}`);
      params.push(difficulty);
      paramIndex++;
    }

    // Pattern filter
    if (pattern) {
      conditions.push(`EXISTS (
        SELECT 1 FROM problem_patterns pp 
        JOIN dsa_patterns pat ON pp.pattern_id = pat.id 
        WHERE pp.problem_id = p.id AND pat.slug = $${paramIndex}
      )`);
      params.push(pattern);
      paramIndex++;
    }

    // Company filter
    if (company) {
      conditions.push(`$${paramIndex} = ANY(p.companies)`);
      params.push(company);
      paramIndex++;
    }

    // Search filter (title or description)
    if (search) {
      conditions.push(`(
        LOWER(p.title) LIKE LOWER($${paramIndex}) OR 
        LOWER(p.description) LIKE LOWER($${paramIndex})
      )`);
      params.push(`%${search}%`);
      paramIndex++;
    }

    // Status filter (requires user to be authenticated)
    if (status && userId) {
      if (status === 'solved') {
        conditions.push(`EXISTS (
          SELECT 1 FROM user_problem_progress upp 
          WHERE upp.user_id = $${paramIndex} AND upp.problem_id = p.id AND upp.solved = true
        )`);
        params.push(userId);
        paramIndex++;
      } else if (status === 'attempted') {
        conditions.push(`EXISTS (
          SELECT 1 FROM user_problem_progress upp 
          WHERE upp.user_id = $${paramIndex} AND upp.problem_id = p.id AND upp.solved = false
        )`);
        params.push(userId);
        paramIndex++;
      } else if (status === 'unsolved') {
        conditions.push(`NOT EXISTS (
          SELECT 1 FROM user_problem_progress upp 
          WHERE upp.user_id = $${paramIndex} AND upp.problem_id = p.id
        )`);
        params.push(userId);
        paramIndex++;
      }
    }

    const whereClause = conditions.length > 0 
      ? `WHERE ${conditions.join(' AND ')}` 
      : '';

    // Calculate offset for pagination
    const offset = (page - 1) * limit;
    params.push(limit, offset);
    const limitIndex = paramIndex;
    const offsetIndex = paramIndex + 1;

    // Get total count for pagination metadata
    const countQuery = `
      SELECT COUNT(*) as total
      FROM problems p
      ${whereClause}
    `;
    const countResult = await pool.query(countQuery, params.slice(0, paramIndex - 1));
    const totalProblems = parseInt(countResult.rows[0].total);

    // Main query - get problems with user progress
    const query = `
      SELECT 
        p.id,
        p.title,
        p.slug,
        p.difficulty,
        p.category,
        p.acceptance_rate,
        p.companies,
        p.tags,
        ${userId ? `
          COALESCE(upp.solved, false) as solved,
          COALESCE(upp.attempted, false) as attempted,
          COALESCE(b.id IS NOT NULL, false) as bookmarked
        ` : `
          false as solved,
          false as attempted,
          false as bookmarked
        `}
      FROM problems p
      ${userId ? `
        LEFT JOIN user_problem_progress upp ON upp.problem_id = p.id AND upp.user_id = $${params.length - 1}
        LEFT JOIN bookmarks b ON b.problem_id = p.id AND b.user_id = $${params.length - 1}
      ` : ''}
      ${whereClause}
      ORDER BY p.id ASC
      LIMIT $${limitIndex} OFFSET $${offsetIndex}
    `;

    const result = await pool.query(query, userId ? [...params, userId, userId] : params);

    // Pagination metadata
    const totalPages = Math.ceil(totalProblems / limit);

    res.json({
      success: true,
      data: {
        problems: result.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalProblems,
          problemsPerPage: parseInt(limit),
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        },
        filters: {
          difficulty,
          pattern,
          company,
          status,
          search
        }
      }
    });

  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch problems' 
    });
  }
});

// ============================================================================
// GET /api/problems/:slug - Get single problem with all details
// ============================================================================
router.get('/:slug', optionalAuth, async (req, res) => {
  const { slug } = req.params;
  const userId = req.user?.id;

  try {
    // Get problem with patterns
    const query = `
      SELECT 
        p.*,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'id', pat.id,
              'name', pat.name,
              'slug', pat.slug,
              'description', pat.description
            )
          ) FILTER (WHERE pat.id IS NOT NULL),
          '[]'
        ) as patterns,
        ${userId ? `
          COALESCE(upp.solved, false) as solved,
          COALESCE(upp.attempted, false) as attempted,
          upp.best_time,
          upp.best_space,
          COALESCE(b.id IS NOT NULL, false) as bookmarked
        ` : `
          false as solved,
          false as attempted,
          null as best_time,
          null as best_space,
          false as bookmarked
        `}
      FROM problems p
      LEFT JOIN problem_patterns pp ON pp.problem_id = p.id
      LEFT JOIN dsa_patterns pat ON pat.id = pp.pattern_id
      ${userId ? `
        LEFT JOIN user_problem_progress upp ON upp.problem_id = p.id AND upp.user_id = $2
        LEFT JOIN bookmarks b ON b.problem_id = p.id AND b.user_id = $2
      ` : ''}
      WHERE p.slug = $1
      GROUP BY p.id ${userId ? ', upp.solved, upp.attempted, upp.best_time, upp.best_space, b.id' : ''}
    `;

    const result = await pool.query(query, userId ? [slug, userId] : [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Problem not found' 
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error fetching problem:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch problem details' 
    });
  }
});

// ============================================================================
// POST /api/problems/:slug/submit - Submit solution and update progress
// ============================================================================
router.post('/:slug/submit', authenticateToken, async (req, res) => {
  const { slug } = req.params;
  const userId = req.user.id;
  const { 
    code, 
    language, 
    testResults,  // Array of test results from code execution
    runtime,      // Total runtime in ms
    memory        // Memory used in MB
  } = req.body;

  try {
    // Get problem
    const problemQuery = await pool.query(
      'SELECT id, difficulty FROM problems WHERE slug = $1',
      [slug]
    );

    if (problemQuery.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Problem not found' 
      });
    }

    const problem = problemQuery.rows[0];
    const problemId = problem.id;

    // Check if all tests passed
    const allPassed = testResults.every(test => test.passed);
    const passedCount = testResults.filter(test => test.passed).length;
    const totalTests = testResults.length;

    // Calculate XP based on difficulty and performance
    let xpEarned = 0;
    if (allPassed) {
      const baseXP = {
        'Easy': 10,
        'Medium': 25,
        'Hard': 50
      };
      xpEarned = baseXP[problem.difficulty] || 10;

      // Bonus XP for fast solutions (if runtime < 100ms)
      if (runtime < 100) {
        xpEarned += 5;
      }
    }

    // Start transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Save submission
      const submissionQuery = `
        INSERT INTO submissions (user_id, problem_id, code, language, status, runtime, memory, passed_tests, total_tests)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id, created_at
      `;
      const submissionResult = await client.query(submissionQuery, [
        userId,
        problemId,
        code,
        language,
        allPassed ? 'accepted' : 'wrong_answer',
        runtime,
        memory,
        passedCount,
        totalTests
      ]);

      // Update user progress
      if (allPassed) {
        const progressQuery = `
          INSERT INTO user_problem_progress (user_id, problem_id, solved, attempted, best_time, best_space, times_attempted)
          VALUES ($1, $2, true, true, $3, $4, 1)
          ON CONFLICT (user_id, problem_id) 
          DO UPDATE SET 
            solved = true,
            best_time = LEAST(user_problem_progress.best_time, EXCLUDED.best_time),
            best_space = LEAST(user_problem_progress.best_space, EXCLUDED.best_space),
            times_attempted = user_problem_progress.times_attempted + 1,
            last_attempted_at = CURRENT_TIMESTAMP
        `;
        await client.query(progressQuery, [userId, problemId, runtime, memory]);
      } else {
        // Mark as attempted (not solved)
        const attemptQuery = `
          INSERT INTO user_problem_progress (user_id, problem_id, solved, attempted, times_attempted)
          VALUES ($1, $2, false, true, 1)
          ON CONFLICT (user_id, problem_id) 
          DO UPDATE SET 
            attempted = true,
            times_attempted = user_problem_progress.times_attempted + 1,
            last_attempted_at = CURRENT_TIMESTAMP
        `;
        await client.query(attemptQuery, [userId, problemId]);
      }

      // Update user XP if problem was solved
      if (allPassed) {
        await client.query(
          'UPDATE user_progress SET total_xp = total_xp + $1, problems_solved = problems_solved + 1 WHERE user_id = $2',
          [xpEarned, userId]
        );
      }

      // Record daily activity
      await client.query(`
        INSERT INTO daily_activity (user_id, date, problems_attempted, problems_solved, xp_earned)
        VALUES ($1, CURRENT_DATE, 1, $2, $3)
        ON CONFLICT (user_id, date) 
        DO UPDATE SET 
          problems_attempted = daily_activity.problems_attempted + 1,
          problems_solved = daily_activity.problems_solved + $2,
          xp_earned = daily_activity.xp_earned + $3
      `, [userId, allPassed ? 1 : 0, xpEarned]);

      await client.query('COMMIT');

      res.json({
        success: true,
        data: {
          submissionId: submissionResult.rows[0].id,
          status: allPassed ? 'accepted' : 'wrong_answer',
          passedTests: passedCount,
          totalTests: totalTests,
          xpEarned: xpEarned,
          runtime: runtime,
          memory: memory,
          submittedAt: submissionResult.rows[0].created_at
        }
      });

    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Error submitting solution:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to submit solution' 
    });
  }
});

// ============================================================================
// GET /api/problems/:slug/submissions - Get user's submission history
// ============================================================================
router.get('/:slug/submissions', authenticateToken, async (req, res) => {
  const { slug } = req.params;
  const userId = req.user.id;
  const { limit = 10 } = req.query;

  try {
    const query = `
      SELECT 
        s.id,
        s.language,
        s.status,
        s.runtime,
        s.memory,
        s.passed_tests,
        s.total_tests,
        s.created_at
      FROM submissions s
      JOIN problems p ON p.id = s.problem_id
      WHERE s.user_id = $1 AND p.slug = $2
      ORDER BY s.created_at DESC
      LIMIT $3
    `;

    const result = await pool.query(query, [userId, slug, limit]);

    res.json({
      success: true,
      data: {
        submissions: result.rows,
        total: result.rows.length
      }
    });

  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch submission history' 
    });
  }
});

// ============================================================================
// POST /api/problems/:slug/bookmark - Toggle bookmark
// ============================================================================
router.post('/:slug/bookmark', authenticateToken, async (req, res) => {
  const { slug } = req.params;
  const userId = req.user.id;

  try {
    // Get problem ID
    const problemQuery = await pool.query(
      'SELECT id FROM problems WHERE slug = $1',
      [slug]
    );

    if (problemQuery.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Problem not found' 
      });
    }

    const problemId = problemQuery.rows[0].id;

    // Check if already bookmarked
    const existingBookmark = await pool.query(
      'SELECT id FROM bookmarks WHERE user_id = $1 AND problem_id = $2',
      [userId, problemId]
    );

    let bookmarked;
    if (existingBookmark.rows.length > 0) {
      // Remove bookmark
      await pool.query(
        'DELETE FROM bookmarks WHERE user_id = $1 AND problem_id = $2',
        [userId, problemId]
      );
      bookmarked = false;
    } else {
      // Add bookmark
      await pool.query(
        'INSERT INTO bookmarks (user_id, problem_id) VALUES ($1, $2)',
        [userId, problemId]
      );
      bookmarked = true;
    }

    res.json({
      success: true,
      data: {
        bookmarked,
        message: bookmarked ? 'Problem bookmarked' : 'Bookmark removed'
      }
    });

  } catch (error) {
    console.error('Error toggling bookmark:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to toggle bookmark' 
    });
  }
});

// ============================================================================
// GET /api/problems/:slug/hints - Get hints (progressive reveal)
// ============================================================================
router.get('/:slug/hints', authenticateToken, async (req, res) => {
  const { slug } = req.params;
  const { level = 1 } = req.query; // Hint level 1, 2, 3...

  try {
    const query = `
      SELECT hints
      FROM problems
      WHERE slug = $1
    `;

    const result = await pool.query(query, [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Problem not found' 
      });
    }

    const hints = result.rows[0].hints || [];
    const requestedLevel = parseInt(level);

    // Return hints up to the requested level
    const availableHints = hints.slice(0, requestedLevel);

    res.json({
      success: true,
      data: {
        hints: availableHints,
        currentLevel: requestedLevel,
        totalLevels: hints.length,
        hasMore: requestedLevel < hints.length
      }
    });

  } catch (error) {
    console.error('Error fetching hints:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch hints' 
    });
  }
});

// ============================================================================
// GET /api/problems/daily - Get daily challenge
// ============================================================================
router.get('/daily/challenge', optionalAuth, async (req, res) => {
  const userId = req.user?.id;

  try {
    // Get today's daily challenge
    const challengeQuery = `
      SELECT 
        dc.id as challenge_id,
        dc.date,
        dc.bonus_xp,
        p.*,
        ${userId ? `
          COALESCE(udc.completed, false) as completed,
          udc.completed_at
        ` : `
          false as completed,
          null as completed_at
        `}
      FROM daily_challenges dc
      JOIN problems p ON p.id = dc.problem_id
      ${userId ? `
        LEFT JOIN user_daily_challenges udc ON udc.challenge_id = dc.id AND udc.user_id = $1
      ` : ''}
      WHERE dc.date = CURRENT_DATE
    `;

    const result = await pool.query(challengeQuery, userId ? [userId] : []);

    if (result.rows.length === 0) {
      // No daily challenge set for today - pick a random medium problem
      const randomQuery = `
        SELECT * FROM problems 
        WHERE difficulty = 'Medium' 
        ORDER BY RANDOM() 
        LIMIT 1
      `;
      const randomResult = await pool.query(randomQuery);

      if (randomResult.rows.length > 0) {
        return res.json({
          success: true,
          data: {
            ...randomResult.rows[0],
            isDailyChallenge: false,
            bonus_xp: 0,
            message: 'No official daily challenge today. Here\'s a recommended problem!'
          }
        });
      }

      return res.status(404).json({ 
        success: false, 
        error: 'No daily challenge available' 
      });
    }

    res.json({
      success: true,
      data: {
        ...result.rows[0],
        isDailyChallenge: true
      }
    });

  } catch (error) {
    console.error('Error fetching daily challenge:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch daily challenge' 
    });
  }
});

module.exports = router;
