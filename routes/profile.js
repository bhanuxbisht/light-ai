const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// GET /api/profile/me - current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const pool = req.app.get('db');
    if (!pool) return res.status(503).json({ success: false, error: 'Database not available' });

    const userId = req.user.id;
    const result = await pool.query(
      `SELECT u.id, u.username, u.email, u.full_name, u.avatar_url, u.created_at,
              up.total_xp, up.current_level, up.problems_solved, up.current_streak, up.longest_streak, up.total_time_spent
       FROM users u
       LEFT JOIN user_progress up ON u.id = up.user_id
       WHERE u.id = $1`,
      [userId]
    );

    if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'User not found' });
    const u = result.rows[0];

    res.json({ success: true, user: {
      id: u.id,
      username: u.username,
      email: u.email,
      fullName: u.full_name,
      avatarUrl: u.avatar_url,
      createdAt: u.created_at,
      progress: {
        xp: u.total_xp || 0,
        level: u.current_level || 1,
        problemsSolved: u.problems_solved || 0,
        currentStreak: u.current_streak || 0,
        longestStreak: u.longest_streak || 0,
        timeSpent: u.total_time_spent || 0
      }
    }});

  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
});

// GET /api/profile/:username - public profile view
router.get('/:username', async (req, res) => {
  try {
    const pool = req.app.get('db');
    if (!pool) return res.status(503).json({ success: false, error: 'Database not available' });

    const username = req.params.username;
    const result = await pool.query(
      `SELECT u.id, u.username, u.full_name, u.avatar_url, up.total_xp, up.problems_solved
       FROM users u
       LEFT JOIN user_progress up ON u.id = up.user_id
       WHERE u.username = $1`,
      [username]
    );

    if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'User not found' });
    const u = result.rows[0];

    res.json({ success: true, user: {
      id: u.id,
      username: u.username,
      fullName: u.full_name,
      avatarUrl: u.avatar_url,
      progress: {
        xp: u.total_xp || 0,
        problemsSolved: u.problems_solved || 0
      }
    }});

  } catch (error) {
    console.error('Error fetching public profile:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
});

// PUT /api/profile/me - update user profile
router.put('/me', authenticateToken, async (req, res) => {
  try {
    const pool = req.app.get('db');
    if (!pool) return res.status(503).json({ success: false, error: 'Database not available' });

    const userId = req.user.id;
    const { fullName, avatarUrl } = req.body;

    const result = await pool.query(
      `UPDATE users SET full_name = COALESCE($1, full_name), avatar_url = COALESCE($2, avatar_url) WHERE id = $3 RETURNING id, username, email, full_name, avatar_url`,
      [fullName, avatarUrl, userId]
    );

    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

// GET /api/profile/heatmap - 365-day activity calendar data
router.get('/me/heatmap', authenticateToken, async (req, res) => {
  try {
    const pool = req.app.get('db');
    if (!pool) return res.status(503).json({ success: false, error: 'Database not available' });

    const userId = req.user.id;
    const rows = await pool.query(
      `SELECT activity_date, problems_solved, xp_earned
       FROM daily_activity
       WHERE user_id = $1 AND activity_date >= (CURRENT_DATE - INTERVAL '365 days')
       ORDER BY activity_date ASC`,
      [userId]
    );

    res.json({ success: true, heatmap: rows.rows });
  } catch (error) {
    console.error('Error fetching heatmap:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch heatmap' });
  }
});

module.exports = router;
