// Problems API Test Suite
// Run with: node test-problems-api.js

const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000/api';
let authToken = '';
let userId = '';

// Test user credentials
const testUser = {
  username: `testuser_${Date.now()}`,
  email: `test_${Date.now()}@example.com`,
  password: 'Test1234!',
  fullName: 'Test User'
};

// Color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function makeRequest(method, endpoint, data = null, useAuth = false) {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (useAuth && authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const options = {
    method,
    headers
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const result = await response.json();
    return { status: response.status, data: result };
  } catch (error) {
    console.log(`   Error making request: ${error.message}`);
    return { status: 0, error: error.message, data: { success: false, error: error.message } };
  }
}

// Test 1: Sign up and get auth token
async function testSignup() {
  log('\n📝 Test 1: User Signup', 'blue');
  const result = await makeRequest('POST', '/auth/signup', testUser);
  
  if (result.status === 201 && result.data.success) {
    authToken = result.data.data.token;
    userId = result.data.data.user.id;
    log('✅ Signup successful', 'green');
    log(`   Token: ${authToken.substring(0, 20)}...`, 'yellow');
    return true;
  } else {
    log(`❌ Signup failed: ${result.data.error || 'Unknown error'}`, 'red');
    return false;
  }
}

// Test 2: Get all problems (no filters)
async function testGetAllProblems() {
  log('\n📝 Test 2: GET /api/problems (all problems)', 'blue');
  const result = await makeRequest('GET', '/problems?limit=5', null, true);
  
  if (result.status === 200 && result.data.success) {
    const { problems, pagination } = result.data.data;
    log(`✅ Fetched ${problems.length} problems`, 'green');
    log(`   Total: ${pagination.totalProblems}, Pages: ${pagination.totalPages}`, 'yellow');
    log(`   First problem: ${problems[0]?.title}`, 'yellow');
    return true;
  } else {
    log(`❌ Failed to fetch problems`, 'red');
    return false;
  }
}

// Test 3: Filter by difficulty
async function testFilterByDifficulty() {
  log('\n📝 Test 3: GET /api/problems?difficulty=Easy', 'blue');
  const result = await makeRequest('GET', '/problems?difficulty=Easy&limit=5', null, true);
  
  if (result.status === 200 && result.data.success) {
    const { problems, pagination } = result.data.data;
    log(`✅ Fetched ${problems.length} Easy problems`, 'green');
    log(`   Total Easy: ${pagination.totalProblems}`, 'yellow');
    log(`   Problems: ${problems.map(p => p.title).join(', ')}`, 'yellow');
    return true;
  } else {
    log(`❌ Failed to filter by difficulty`, 'red');
    return false;
  }
}

// Test 4: Filter by pattern
async function testFilterByPattern() {
  log('\n📝 Test 4: GET /api/problems?pattern=arrays-hashing', 'blue');
  const result = await makeRequest('GET', '/problems?pattern=arrays-hashing', null, true);
  
  if (result.status === 200 && result.data.success) {
    const { problems, pagination } = result.data.data;
    log(`✅ Fetched ${problems.length} Arrays & Hashing problems`, 'green');
    log(`   Total: ${pagination.totalProblems}`, 'yellow');
    return true;
  } else {
    log(`❌ Failed to filter by pattern`, 'red');
    return false;
  }
}

// Test 5: Search problems
async function testSearchProblems() {
  log('\n📝 Test 5: GET /api/problems?search=two', 'blue');
  const result = await makeRequest('GET', '/problems?search=two', null, true);
  
  if (result.status === 200 && result.data.success) {
    const { problems, pagination } = result.data.data;
    log(`✅ Search returned ${problems.length} problems`, 'green');
    log(`   Found: ${problems.map(p => p.title).join(', ')}`, 'yellow');
    return true;
  } else {
    log(`❌ Failed to search problems`, 'red');
    return false;
  }
}

// Test 6: Get single problem
async function testGetSingleProblem() {
  log('\n📝 Test 6: GET /api/problems/two-sum', 'blue');
  const result = await makeRequest('GET', '/problems/two-sum', null, true);
  
  if (result.status === 200 && result.data.success) {
    const problem = result.data.data;
    log(`✅ Fetched problem: ${problem.title}`, 'green');
    log(`   Difficulty: ${problem.difficulty}`, 'yellow');
    log(`   Category: ${problem.category}`, 'yellow');
    log(`   Languages: ${Object.keys(problem.starter_code || {}).join(', ')}`, 'yellow');
    log(`   Patterns: ${problem.patterns?.map(p => p.name).join(', ')}`, 'yellow');
    return true;
  } else {
    log(`❌ Failed to fetch single problem`, 'red');
    return false;
  }
}

// Test 7: Submit solution (all tests passed)
async function testSubmitSolution() {
  log('\n📝 Test 7: POST /api/problems/two-sum/submit', 'blue');
  
  const submission = {
    code: 'function twoSum(nums, target) { /* solution */ }',
    language: 'javascript',
    testResults: [
      { passed: true, input: { nums: [2,7,11,15], target: 9 }, expected: [0,1] },
      { passed: true, input: { nums: [3,2,4], target: 6 }, expected: [1,2] },
      { passed: true, input: { nums: [3,3], target: 6 }, expected: [0,1] }
    ],
    runtime: 85,
    memory: 42.5
  };
  
  const result = await makeRequest('POST', '/problems/two-sum/submit', submission, true);
  
  if (result.status === 200 && result.data.success) {
    const { status, passedTests, totalTests, xpEarned } = result.data.data;
    log(`✅ Submission successful: ${status}`, 'green');
    log(`   Passed: ${passedTests}/${totalTests}`, 'yellow');
    log(`   XP Earned: ${xpEarned}`, 'yellow');
    return true;
  } else {
    log(`❌ Failed to submit solution: ${result.data.error}`, 'red');
    return false;
  }
}

// Test 8: Get submission history
async function testGetSubmissions() {
  log('\n📝 Test 8: GET /api/problems/two-sum/submissions', 'blue');
  const result = await makeRequest('GET', '/problems/two-sum/submissions', null, true);
  
  if (result.status === 200 && result.data.success) {
    const { submissions } = result.data.data;
    log(`✅ Fetched ${submissions.length} submissions`, 'green');
    if (submissions.length > 0) {
      log(`   Latest: ${submissions[0].status} (${submissions[0].language})`, 'yellow');
    }
    return true;
  } else {
    log(`❌ Failed to fetch submissions`, 'red');
    return false;
  }
}

// Test 9: Toggle bookmark
async function testToggleBookmark() {
  log('\n📝 Test 9: POST /api/problems/two-sum/bookmark', 'blue');
  
  // Add bookmark
  const result1 = await makeRequest('POST', '/problems/two-sum/bookmark', {}, true);
  if (result1.status === 200 && result1.data.data.bookmarked) {
    log(`✅ Bookmark added`, 'green');
  } else {
    log(`❌ Failed to add bookmark`, 'red');
    return false;
  }
  
  // Remove bookmark
  const result2 = await makeRequest('POST', '/problems/two-sum/bookmark', {}, true);
  if (result2.status === 200 && !result2.data.data.bookmarked) {
    log(`✅ Bookmark removed`, 'green');
    return true;
  } else {
    log(`❌ Failed to remove bookmark`, 'red');
    return false;
  }
}

// Test 10: Get hints
async function testGetHints() {
  log('\n📝 Test 10: GET /api/problems/two-sum/hints?level=1', 'blue');
  const result = await makeRequest('GET', '/problems/two-sum/hints?level=1', null, true);
  
  if (result.status === 200 && result.data.success) {
    const { hints, currentLevel, totalLevels } = result.data.data;
    log(`✅ Fetched hints: Level ${currentLevel}/${totalLevels}`, 'green');
    if (hints.length > 0) {
      log(`   Hint: ${hints[0]}`, 'yellow');
    }
    return true;
  } else {
    log(`❌ Failed to fetch hints`, 'red');
    return false;
  }
}

// Test 11: Get daily challenge
async function testGetDailyChallenge() {
  log('\n📝 Test 11: GET /api/problems/daily/challenge', 'blue');
  const result = await makeRequest('GET', '/problems/daily/challenge', null, true);
  
  if (result.status === 200 && result.data.success) {
    const problem = result.data.data;
    log(`✅ Daily challenge: ${problem.title}`, 'green');
    log(`   Difficulty: ${problem.difficulty}`, 'yellow');
    log(`   Is official: ${problem.isDailyChallenge}`, 'yellow');
    return true;
  } else {
    log(`❌ Failed to fetch daily challenge`, 'red');
    return false;
  }
}

// Test 12: Filter by company
async function testFilterByCompany() {
  log('\n📝 Test 12: GET /api/problems?company=Amazon', 'blue');
  const result = await makeRequest('GET', '/problems?company=Amazon&limit=5', null, true);
  
  if (result.status === 200 && result.data.success) {
    const { problems, pagination } = result.data.data;
    log(`✅ Fetched ${problems.length} Amazon problems`, 'green');
    log(`   Total Amazon: ${pagination.totalProblems}`, 'yellow');
    return true;
  } else {
    log(`❌ Failed to filter by company`, 'red');
    return false;
  }
}

// Test 13: Filter by status (solved)
async function testFilterByStatus() {
  log('\n📝 Test 13: GET /api/problems?status=solved', 'blue');
  const result = await makeRequest('GET', '/problems?status=solved', null, true);
  
  if (result.status === 200 && result.data.success) {
    const { problems, pagination } = result.data.data;
    log(`✅ Fetched ${problems.length} solved problems`, 'green');
    log(`   Total solved: ${pagination.totalProblems}`, 'yellow');
    return true;
  } else {
    log(`❌ Failed to filter by status`, 'red');
    return false;
  }
}

// Run all tests
async function runAllTests() {
  log('\n' + '='.repeat(60), 'blue');
  log('🧪 PROBLEMS API TEST SUITE', 'blue');
  log('='.repeat(60), 'blue');

  const tests = [
    testSignup,
    testGetAllProblems,
    testFilterByDifficulty,
    testFilterByPattern,
    testSearchProblems,
    testGetSingleProblem,
    testSubmitSolution,
    testGetSubmissions,
    testToggleBookmark,
    testGetHints,
    testGetDailyChallenge,
    testFilterByCompany,
    testFilterByStatus
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = await test();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      log(`❌ Test error: ${error.message}`, 'red');
      failed++;
    }
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  log('\n' + '='.repeat(60), 'blue');
  log('📊 TEST RESULTS', 'blue');
  log('='.repeat(60), 'blue');
  log(`✅ Passed: ${passed}`, 'green');
  log(`❌ Failed: ${failed}`, failed > 0 ? 'red' : 'green');
  log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`, 'yellow');
  log('='.repeat(60), 'blue');
}

// Run tests
runAllTests().catch(console.error);
