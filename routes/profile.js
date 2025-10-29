// Profile API
// GET /api/profile/me - Current user stats
// GET /api/profile/:username - Public profile
// PUT /api/profile/me - Update settings
// GET /api/profile/heatmap - Activity calendar

const express = require('express');
const router = express.Router();
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const pool = require('../config/database').pool;

// GET /api/profile/me
router.get('/me', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const userQuery = `
      SELECT u.username, u.email, u.full_name, u.avatar_url,
        COALESCE(up.total_xp, 0) AS total_xp,
        COALESCE(up.problems_solved, 0) AS problems_solved,
        COALESCE(up.current_streak, 0) AS current_streak
      FROM users u
      LEFT JOIN user_progress up ON u.id = up.user_id
      WHERE u.id = $1
    `;
    const { rows } = await pool.query(userQuery, [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, profile: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// (dynamic username route will be appended at the end of the file)

// PUT /api/profile/me
router.put('/me', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { full_name, avatar_url } = req.body;
  try {
    const updateQuery = `
      UPDATE users SET full_name = $1, avatar_url = $2 WHERE id = $3 RETURNING username, full_name, avatar_url
    `;
    const { rows } = await pool.query(updateQuery, [full_name, avatar_url, userId]);
    res.json({ success: true, profile: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/profile/heatmap
router.get('/heatmap', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const heatmapQuery = `
      SELECT activity_date, problems_solved
      FROM daily_activity
      WHERE user_id = $1
      ORDER BY activity_date DESC
      LIMIT 365
    `;
    const { rows } = await pool.query(heatmapQuery, [userId]);
    res.json({ success: true, heatmap: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/profile/:username (dynamic) - placed after other fixed routes to avoid conflicts
router.get('/:username', optionalAuth, async (req, res) => {
  const { username } = req.params;
  try {
    const userQuery = `
      SELECT u.username, u.full_name, u.avatar_url,
        COALESCE(up.total_xp, 0) AS total_xp,
        COALESCE(up.problems_solved, 0) AS problems_solved
      FROM users u
      LEFT JOIN user_progress up ON u.id = up.user_id
      WHERE u.username = $1
    `;
    const { rows } = await pool.query(userQuery, [username]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, profile: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
