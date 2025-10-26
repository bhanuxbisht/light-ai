// Light AI - Express Server for SaaS Platform
// Copyright © 2025 Bhanu Bisht. All rights reserved.

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// API Routes
app.post('/api/execute', async (req, res) => {
  const { language, code, testCases } = req.body;
  
  try {
    // Execute code based on language
    const results = await executeCode(language, code, testCases);
    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Code execution handler (safe sandbox - production should use Docker)
async function executeCode(language, code, testCases) {
  const results = [];
  
  for (const test of testCases) {
    try {
      let result;
      const startTime = Date.now();
      
      if (language === 'javascript') {
        result = executeJavaScript(code, test.input);
      } else if (language === 'python') {
        result = await executePython(code, test.input);
      } else if (language === 'java') {
        result = await executeJava(code, test.input);
      } else if (language === 'cpp') {
        result = await executeCpp(code, test.input);
      }
      
      const runtime = Date.now() - startTime;
      const passed = JSON.stringify(result) === JSON.stringify(test.expected);
      
      results.push({
        passed,
        input: test.input,
        expected: test.expected,
        actual: result,
        runtime,
        error: null
      });
    } catch (error) {
      results.push({
        passed: false,
        input: test.input,
        expected: test.expected,
        actual: null,
        runtime: 0,
        error: error.message
      });
    }
  }
  
  return results;
}

// JavaScript execution (sandbox in Web Worker on client side for now)
function executeJavaScript(code, input) {
  // Client-side execution via Web Worker
  return { clientSide: true };
}

// Python execution (mock for now - production needs docker/sandbox)
async function executePython(code, input) {
  // Mock: compute Two Sum
  if (input.nums && typeof input.target === 'number') {
    const map = new Map();
    for (let i = 0; i < input.nums.length; i++) {
      const complement = input.target - input.nums[i];
      if (map.has(complement)) {
        return [map.get(complement), i];
      }
      map.set(input.nums[i], i);
    }
    return [];
  }
  return null;
}

// Java execution (mock for now)
async function executeJava(code, input) {
  return executePython(code, input); // Mock
}

// C++ execution (mock for now)
async function executeCpp(code, input) {
  return executePython(code, input); // Mock
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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Light AI Server running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
  console.log(`💻 Solve: http://localhost:${PORT}/solve`);
});
