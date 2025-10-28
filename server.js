// Light AI - Express Server for SaaS Platform
// Copyright © 2025 Bhanu Bisht. All rights reserved.

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// Check if database is available (optional for testing)
let dbAvailable = false;
try {
  const { initializeDatabase } = require('./config/database');
  const authRoutes = require('./routes/auth');
  const progressRoutes = require('./routes/progress');
  const problemsRoutes = require('./routes/problems');
  const executeRoutes = require('./routes/execute');
  app.use('/api/auth', authRoutes);
  app.use('/api/progress', progressRoutes);
  app.use('/api/problems', problemsRoutes);
  app.use('/api/execute', executeRoutes);
  dbAvailable = true;
} catch (error) {
  console.log('⚠️  Database not configured - running in demo mode');
  console.log('   Install PostgreSQL to enable authentication');
}

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/solve/:problemId?', (req, res) => {
  res.sendFile(path.join(__dirname, 'solve.html'));
});

// Start server and initialize database
async function startServer() {
  try {
    // Initialize database schema if available
    if (dbAvailable) {
      try {
        const { initializeDatabase } = require('./config/database');
        await initializeDatabase();
        console.log('✅ Database connected');
      } catch (dbError) {
        console.log('⚠️  Database initialization skipped:', dbError.message);
        dbAvailable = false;
      }
    }
    
    app.listen(PORT, () => {
      console.log(`\n🚀 Light AI Server running on http://localhost:${PORT}`);
      console.log(`📱 Landing Page: http://localhost:${PORT}`);
      console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
      console.log(`💻 Problem Solver: http://localhost:${PORT}/solve`);
      console.log(`🎨 Visual Debugger: http://localhost:${PORT}/visualize.html`);
      if (dbAvailable) {
        console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
        console.log(`📈 Progress API: http://localhost:${PORT}/api/progress`);
        console.log(`📝 Problems API: http://localhost:${PORT}/api/problems`);
        console.log(`⚙️  Execute API: http://localhost:${PORT}/api/execute`);
      } else {
        console.log(`\n⚠️  Running in DEMO MODE (no authentication)`);
        console.log(`   To enable authentication, install PostgreSQL and configure .env`);
      }
      console.log(`\n✨ Ready to test! Open http://localhost:${PORT} in your browser\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
