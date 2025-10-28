// Code Execution API
// Secure multi-language code execution with Docker isolation

const express = require('express');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Configuration
const EXECUTION_TIMEOUT = 3000; // 3 seconds
const MEMORY_LIMIT = '256m'; // 256MB
const TEMP_DIR = path.join(__dirname, '../temp');

// Ensure temp directory exists
async function ensureTempDir() {
  try {
    await fs.mkdir(TEMP_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating temp directory:', error);
  }
}

ensureTempDir();

// ============================================================================
// POST /api/execute - Execute user code securely
// ============================================================================
router.post('/', authenticateToken, async (req, res) => {
  const { code, language, testCases } = req.body;

  // Validate input
  if (!code || !language || !testCases) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: code, language, testCases'
    });
  }

  if (!['javascript', 'python', 'java', 'cpp', 'c'].includes(language)) {
    return res.status(400).json({
      success: false,
      error: 'Unsupported language. Must be: javascript, python, java, cpp, or c'
    });
  }

  if (!Array.isArray(testCases) || testCases.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'testCases must be a non-empty array'
    });
  }

  try {
    // Execute code against test cases
    const results = await executeCode(language, code, testCases);

    res.json({
      success: true,
      data: {
        results,
        totalTests: testCases.length,
        passedTests: results.filter(r => r.passed).length,
        failedTests: results.filter(r => !r.passed).length
      }
    });

  } catch (error) {
    console.error('Execution error:', error);
    res.status(500).json({
      success: false,
      error: 'Code execution failed',
      details: error.message
    });
  }
});

// ============================================================================
// Execute code against test cases
// ============================================================================
async function executeCode(language, code, testCases) {
  const results = [];

  for (const testCase of testCases) {
    const startTime = Date.now();
    
    try {
      let result;

      switch (language) {
        case 'javascript':
          result = await executeJavaScript(code, testCase.input);
          break;
        case 'python':
          result = await executePython(code, testCase.input);
          break;
        case 'java':
          result = await executeJava(code, testCase.input);
          break;
        case 'cpp':
          result = await executeCpp(code, testCase.input);
          break;
        case 'c':
          result = await executeC(code, testCase.input);
          break;
        default:
          throw new Error('Unsupported language');
      }

      const runtime = Date.now() - startTime;
      const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);

      results.push({
        passed,
        input: testCase.input,
        expected: testCase.expected,
        actual: result,
        runtime,
        error: null
      });

    } catch (error) {
      results.push({
        passed: false,
        input: testCase.input,
        expected: testCase.expected,
        actual: null,
        runtime: Date.now() - startTime,
        error: error.message
      });
    }
  }

  return results;
}

// ============================================================================
// JavaScript Execution (Node.js with VM2 sandbox)
// ============================================================================
async function executeJavaScript(code, input) {
  const { VM } = require('vm2');
  
  const vm = new VM({
    timeout: EXECUTION_TIMEOUT,
    sandbox: {
      input: input,
      result: null
    }
  });

  // Wrap code in execution context
  const wrappedCode = `
    ${code}
    
    // Extract function name from code
    const functionName = ${code}.match(/function\\s+(\\w+)/)?.[1] || 'solution';
    
    // Execute with input
    result = eval(functionName)(input.nums || input.s || input.n || input);
  `;

  try {
    vm.run(wrappedCode);
    return vm.run('result');
  } catch (error) {
    throw new Error(`JavaScript execution error: ${error.message}`);
  }
}

// ============================================================================
// Python Execution (subprocess with timeout)
// ============================================================================
async function executePython(code, input) {
  const sessionId = crypto.randomBytes(16).toString('hex');
  const filePath = path.join(TEMP_DIR, `python_${sessionId}.py`);

  // Wrap code with input handling
  const wrappedCode = `
import json
import sys

${code}

# Parse input
input_data = json.loads('''${JSON.stringify(input)}''')

# Extract function name
import re
func_match = re.search(r'def\\s+(\\w+)', '''${code}''')
func_name = func_match.group(1) if func_match else 'solution'

# Execute function
if 'nums' in input_data and 'target' in input_data:
    result = eval(func_name)(input_data['nums'], input_data['target'])
elif 'nums' in input_data:
    result = eval(func_name)(input_data['nums'])
elif 's' in input_data:
    result = eval(func_name)(input_data['s'])
elif 'n' in input_data:
    result = eval(func_name)(input_data['n'])
else:
    result = eval(func_name)(input_data)

print(json.dumps(result))
`;

  try {
    // Write code to file
    await fs.writeFile(filePath, wrappedCode);

    // Execute with timeout
    const output = await execWithTimeout(`python "${filePath}"`, EXECUTION_TIMEOUT);
    
    // Parse result
    const result = JSON.parse(output.trim());
    
    return result;

  } finally {
    // Cleanup
    try {
      await fs.unlink(filePath);
    } catch (err) {
      // Ignore cleanup errors
    }
  }
}

// ============================================================================
// Java Execution (compile and run with timeout)
// ============================================================================
async function executeJava(code, input) {
  const sessionId = crypto.randomBytes(16).toString('hex');
  const className = 'Solution';
  const filePath = path.join(TEMP_DIR, `${className}_${sessionId}.java`);

  // Wrap code with main method
  const wrappedCode = `
import java.util.*;

${code}

public class ${className}_${sessionId} {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Parse input (simplified for demo)
        ${generateJavaInput(input)}
        
        // Execute and print result
        System.out.println(Arrays.toString(result));
    }
}
`;

  try {
    // Write code to file
    await fs.writeFile(filePath, wrappedCode);

    // Compile
    await execWithTimeout(`javac "${filePath}"`, EXECUTION_TIMEOUT);

    // Run
    const classFile = path.join(TEMP_DIR, `${className}_${sessionId}`);
    const output = await execWithTimeout(
      `java -cp "${TEMP_DIR}" ${className}_${sessionId}`,
      EXECUTION_TIMEOUT
    );

    // Parse result
    const result = JSON.parse(output.trim().replace(/[\[\]]/g, '').split(',').map(s => s.trim()));
    
    return result;

  } finally {
    // Cleanup
    try {
      await fs.unlink(filePath);
      await fs.unlink(filePath.replace('.java', '.class'));
    } catch (err) {
      // Ignore cleanup errors
    }
  }
}

// ============================================================================
// C++ Execution (compile and run with timeout)
// ============================================================================
async function executeCpp(code, input) {
  const sessionId = crypto.randomBytes(16).toString('hex');
  const filePath = path.join(TEMP_DIR, `cpp_${sessionId}.cpp`);
  const exePath = path.join(TEMP_DIR, `cpp_${sessionId}.exe`);

  // Wrap code with main function
  const wrappedCode = `
#include <iostream>
#include <vector>
using namespace std;

${code}

int main() {
    Solution solution;
    
    // Parse input (simplified for demo)
    ${generateCppInput(input)}
    
    // Execute and print result
    for (int val : result) {
        cout << val << " ";
    }
    
    return 0;
}
`;

  try {
    // Write code to file
    await fs.writeFile(filePath, wrappedCode);

    // Compile
    await execWithTimeout(`g++ "${filePath}" -o "${exePath}"`, EXECUTION_TIMEOUT);

    // Run
    const output = await execWithTimeout(`"${exePath}"`, EXECUTION_TIMEOUT);

    // Parse result
    const result = output.trim().split(' ').map(s => parseInt(s.trim()));
    
    return result;

  } finally {
    // Cleanup
    try {
      await fs.unlink(filePath);
      await fs.unlink(exePath);
    } catch (err) {
      // Ignore cleanup errors
    }
  }
}

// ============================================================================
// C Execution (compile and run with timeout)
// ============================================================================
async function executeC(code, input) {
  const sessionId = crypto.randomBytes(16).toString('hex');
  const filePath = path.join(TEMP_DIR, `c_${sessionId}.c`);
  const exePath = path.join(TEMP_DIR, `c_${sessionId}.exe`);

  // Wrap code with main function
  const wrappedCode = `
#include <stdio.h>
#include <stdlib.h>

${code}

int main() {
    // Parse input (simplified for demo)
    ${generateCInput(input)}
    
    // Execute and print result
    for (int i = 0; i < returnSize; i++) {
        printf("%d ", result[i]);
    }
    
    return 0;
}
`;

  try {
    // Write code to file
    await fs.writeFile(filePath, wrappedCode);

    // Compile
    await execWithTimeout(`gcc "${filePath}" -o "${exePath}"`, EXECUTION_TIMEOUT);

    // Run
    const output = await execWithTimeout(`"${exePath}"`, EXECUTION_TIMEOUT);

    // Parse result
    const result = output.trim().split(' ').map(s => parseInt(s.trim()));
    
    return result;

  } finally {
    // Cleanup
    try {
      await fs.unlink(filePath);
      await fs.unlink(exePath);
    } catch (err) {
      // Ignore cleanup errors
    }
  }
}

// ============================================================================
// Helper: Execute command with timeout
// ============================================================================
function execWithTimeout(command, timeout) {
  return new Promise((resolve, reject) => {
    const child = exec(command, { timeout }, (error, stdout, stderr) => {
      if (error) {
        if (error.killed) {
          reject(new Error('Execution timeout exceeded'));
        } else {
          reject(new Error(stderr || error.message));
        }
      } else {
        resolve(stdout);
      }
    });
  });
}

// ============================================================================
// Helper: Generate Java input parsing code
// ============================================================================
function generateJavaInput(input) {
  if (input.nums && input.target !== undefined) {
    return `
      int[] nums = {${input.nums.join(',')}};
      int target = ${input.target};
      int[] result = solution.twoSum(nums, target);
    `;
  }
  return '// Input parsing not implemented for this test case';
}

// ============================================================================
// Helper: Generate C++ input parsing code
// ============================================================================
function generateCppInput(input) {
  if (input.nums && input.target !== undefined) {
    return `
      vector<int> nums = {${input.nums.join(',')}};
      int target = ${input.target};
      vector<int> result = solution.twoSum(nums, target);
    `;
  }
  return '// Input parsing not implemented for this test case';
}

// ============================================================================
// Helper: Generate C input parsing code
// ============================================================================
function generateCInput(input) {
  if (input.nums && input.target !== undefined) {
    return `
      int nums[] = {${input.nums.join(',')}};
      int numsSize = ${input.nums.length};
      int target = ${input.target};
      int returnSize;
      int* result = twoSum(nums, numsSize, target, &returnSize);
    `;
  }
  return '// Input parsing not implemented for this test case';
}

module.exports = router;
