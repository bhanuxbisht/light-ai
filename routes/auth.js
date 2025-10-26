// Authentication Routes
const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');
const { 
  generateToken, 
  authenticateToken,
  validateEmail, 
  validateUsername, 
  validatePassword 
} = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/signup - Register new user
router.post('/signup', async (req, res) => {
  const { username, email, password, fullName } = req.body;
  
  try {
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username, email, and password are required' 
      });
    }
    
    if (!validateEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email format' 
      });
    }
    
    if (!validateUsername(username)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username must be 3-50 characters (alphanumeric and underscores only)' 
      });
    }
    
    if (!validatePassword(password)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Password must be at least 8 characters' 
      });
    }
    
    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ 
        success: false, 
        error: 'User with this email or username already exists' 
      });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    // Insert user
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash, full_name) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, username, email, full_name, created_at`,
      [username, email, passwordHash, fullName || null]
    );
    
    const user = result.rows[0];
    
    // Initialize user progress
    await pool.query(
      `INSERT INTO user_progress (user_id) VALUES ($1)`,
      [user.id]
    );
    
    // Generate JWT token
    const token = generateToken(user);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        createdAt: user.created_at
      },
      token
    });
    
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// POST /api/auth/login - Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and password are required' 
      });
    }
    
    // Find user
    const result = await pool.query(
      `SELECT id, username, email, password_hash, full_name, avatar_url, is_active 
       FROM users 
       WHERE email = $1`,
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }
    
    const user = result.rows[0];
    
    // Check if user is active
    if (!user.is_active) {
      return res.status(403).json({ 
        success: false, 
        error: 'Account is disabled' 
      });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }
    
    // Update last login
    await pool.query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
      [user.id]
    );
    
    // Get user progress
    const progressResult = await pool.query(
      `SELECT total_xp, current_level, problems_solved, current_streak, longest_streak 
       FROM user_progress 
       WHERE user_id = $1`,
      [user.id]
    );
    
    const progress = progressResult.rows[0] || {};
    
    // Generate JWT token
    const token = generateToken(user);
    
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        avatarUrl: user.avatar_url,
        progress: {
          xp: progress.total_xp || 0,
          level: progress.current_level || 1,
          problemsSolved: progress.problems_solved || 0,
          currentStreak: progress.current_streak || 0,
          longestStreak: progress.longest_streak || 0
        }
      },
      token
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET /api/auth/me - Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.id, u.username, u.email, u.full_name, u.avatar_url, u.created_at,
              up.total_xp, up.current_level, up.problems_solved, 
              up.current_streak, up.longest_streak, up.total_time_spent
       FROM users u
       LEFT JOIN user_progress up ON u.id = up.user_id
       WHERE u.id = $1`,
      [req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    const user = result.rows[0];
    
    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        avatarUrl: user.avatar_url,
        createdAt: user.created_at,
        progress: {
          xp: user.total_xp || 0,
          level: user.current_level || 1,
          problemsSolved: user.problems_solved || 0,
          currentStreak: user.current_streak || 0,
          longestStreak: user.longest_streak || 0,
          timeSpent: user.total_time_spent || 0
        }
      }
    });
    
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// PUT /api/auth/profile - Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  const { fullName, avatarUrl } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE users 
       SET full_name = COALESCE($1, full_name), 
           avatar_url = COALESCE($2, avatar_url)
       WHERE id = $3
       RETURNING id, username, email, full_name, avatar_url`,
      [fullName, avatarUrl, req.user.id]
    );
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: result.rows[0]
    });
    
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// POST /api/auth/logout - Logout (client-side token removal mainly)
router.post('/logout', authenticateToken, (req, res) => {
  // With JWT, logout is mainly client-side (remove token)
  // Can implement token blacklist here if needed
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;
