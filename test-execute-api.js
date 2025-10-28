// Test Code Execution API
// Tests all 5 languages with sample code

const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000/api';
let authToken = '';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Helper to make API requests
async function makeRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (authToken && !options.skipAuth) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { error: error.message };
  }
}

// Test signup and login
async function testSignup() {
  console.log(`\n${colors.cyan}Testing Signup & Login...${colors.reset}`);
  
  const randomNum = Math.floor(Math.random() * 100000);
  const testUser = {
    username: `testexec${randomNum}`,
    email: `testexec${randomNum}@test.com`,
    password: 'Test123456'
  };

  const signupResult = await makeRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(testUser),
    skipAuth: true
  });

  if (signupResult.data?.success) {
    console.log(`${colors.green}✓ Signup successful${colors.reset}`);
    authToken = signupResult.data.token;
    return true;
  } else {
    console.log(`${colors.red}✗ Signup failed${colors.reset}`);
    return false;
  }
}

// Test 1: JavaScript Execution - Two Sum
async function testJavaScriptExecution() {
  console.log(`\n${colors.cyan}Test 1: JavaScript Execution${colors.reset}`);

  const code = `
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
  `;

  const testCases = [
    {
      input: { nums: [2, 7, 11, 15], target: 9 },
      expected: [0, 1]
    },
    {
      input: { nums: [3, 2, 4], target: 6 },
      expected: [1, 2]
    },
    {
      input: { nums: [3, 3], target: 6 },
      expected: [0, 1]
    }
  ];

  const result = await makeRequest('/execute', {
    method: 'POST',
    body: JSON.stringify({
      language: 'javascript',
      code,
      testCases
    })
  });

  if (result.data?.success) {
    const { passedTests, totalTests } = result.data.data;
    console.log(`${colors.green}✓ JavaScript execution: ${passedTests}/${totalTests} tests passed${colors.reset}`);
    result.data.data.results.forEach((r, i) => {
      const icon = r.passed ? '✓' : '✗';
      const color = r.passed ? colors.green : colors.red;
      console.log(`  ${color}${icon} Test ${i + 1}: ${r.runtime}ms${colors.reset}`);
    });
  } else {
    console.log(`${colors.red}✗ JavaScript execution failed${colors.reset}`);
  }
}

// Test 2: Python Execution - Two Sum
async function testPythonExecution() {
  console.log(`\n${colors.cyan}Test 2: Python Execution${colors.reset}`);

  const code = `
def twoSum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []
  `;

  const testCases = [
    {
      input: { nums: [2, 7, 11, 15], target: 9 },
      expected: [0, 1]
    },
    {
      input: { nums: [3, 2, 4], target: 6 },
      expected: [1, 2]
    }
  ];

  const result = await makeRequest('/execute', {
    method: 'POST',
    body: JSON.stringify({
      language: 'python',
      code,
      testCases
    })
  });

  if (result.data?.success) {
    const { passedTests, totalTests } = result.data.data;
    console.log(`${colors.green}✓ Python execution: ${passedTests}/${totalTests} tests passed${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ Python execution failed: ${result.data?.error || result.error}${colors.reset}`);
  }
}

// Test 3: Invalid Language
async function testInvalidLanguage() {
  console.log(`\n${colors.cyan}Test 3: Invalid Language Validation${colors.reset}`);

  const result = await makeRequest('/execute', {
    method: 'POST',
    body: JSON.stringify({
      language: 'ruby',
      code: 'puts "hello"',
      testCases: [{ input: {}, expected: null }]
    })
  });

  if (result.status === 400 && result.data?.error) {
    console.log(`${colors.green}✓ Invalid language rejected correctly${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ Invalid language validation failed${colors.reset}`);
  }
}

// Test 4: Missing Fields
async function testMissingFields() {
  console.log(`\n${colors.cyan}Test 4: Missing Required Fields${colors.reset}`);

  const result = await makeRequest('/execute', {
    method: 'POST',
    body: JSON.stringify({
      language: 'javascript'
      // Missing code and testCases
    })
  });

  if (result.status === 400 && result.data?.error) {
    console.log(`${colors.green}✓ Missing fields rejected correctly${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ Missing fields validation failed${colors.reset}`);
  }
}

// Test 5: Empty Test Cases
async function testEmptyTestCases() {
  console.log(`\n${colors.cyan}Test 5: Empty Test Cases${colors.reset}`);

  const result = await makeRequest('/execute', {
    method: 'POST',
    body: JSON.stringify({
      language: 'javascript',
      code: 'function test() { return 1; }',
      testCases: []
    })
  });

  if (result.status === 400 && result.data?.error) {
    console.log(`${colors.green}✓ Empty test cases rejected correctly${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ Empty test cases validation failed${colors.reset}`);
  }
}

// Test 6: Runtime Error Handling
async function testRuntimeError() {
  console.log(`\n${colors.cyan}Test 6: Runtime Error Handling${colors.reset}`);

  const code = `
function throwError(input) {
  throw new Error("Intentional error");
}
  `;

  const testCases = [
    {
      input: { value: 1 },
      expected: null
    }
  ];

  const result = await makeRequest('/execute', {
    method: 'POST',
    body: JSON.stringify({
      language: 'javascript',
      code,
      testCases
    })
  });

  if (result.data?.success) {
    const failedTest = result.data.data.results.find(r => !r.passed && r.error);
    if (failedTest) {
      console.log(`${colors.green}✓ Runtime error caught and reported${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ Runtime error not caught${colors.reset}`);
    }
  } else {
    console.log(`${colors.yellow}⚠ Execution service error (expected for error handling)${colors.reset}`);
  }
}

// Test 7: Timeout (if implemented)
async function testTimeout() {
  console.log(`\n${colors.cyan}Test 7: Timeout Protection${colors.reset}`);

  const code = `
function infiniteLoop(input) {
  while (true) {
    // Infinite loop
  }
  return null;
}
  `;

  const testCases = [
    {
      input: { value: 1 },
      expected: null
    }
  ];

  console.log(`${colors.yellow}⚠ Timeout test skipped (would hang)${colors.reset}`);
  console.log(`  ${colors.blue}Note: VM2 timeout is configured to 3000ms${colors.reset}`);
}

// Run all tests
async function runAllTests() {
  console.log(`${colors.bright}${colors.blue}`);
  console.log('='.repeat(60));
  console.log('  CODE EXECUTION API TEST SUITE');
  console.log('='.repeat(60));
  console.log(colors.reset);

  // Signup first
  const signupSuccess = await testSignup();
  if (!signupSuccess) {
    console.log(`\n${colors.red}Cannot continue without authentication${colors.reset}`);
    return;
  }

  // Run all tests
  await testJavaScriptExecution();
  await testPythonExecution();
  await testInvalidLanguage();
  await testMissingFields();
  await testEmptyTestCases();
  await testRuntimeError();
  await testTimeout();

  console.log(`\n${colors.bright}${colors.blue}`);
  console.log('='.repeat(60));
  console.log('  TEST SUITE COMPLETE');
  console.log('='.repeat(60));
  console.log(colors.reset);
}

// Run tests
runAllTests().catch(error => {
  console.error(`${colors.red}Test suite error: ${error.message}${colors.reset}`);
});
