# Code Execution Service Documentation

## Overview
The Code Execution API provides secure, sandboxed execution of user-submitted code in 5 programming languages: JavaScript, Python, Java, C++, and C.

## Endpoint

### POST /api/execute

Execute user code against test cases and return results.

**Authentication:** Required (JWT Bearer token)

**Request Body:**
```json
{
  "language": "javascript",
  "code": "function twoSum(nums, target) { ... }",
  "testCases": [
    {
      "input": { "nums": [2, 7, 11, 15], "target": 9 },
      "expected": [0, 1]
    }
  ]
}
```

**Query Parameters:** None

**Request Body Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| language | string | Yes | Programming language: `javascript`, `python`, `java`, `cpp`, or `c` |
| code | string | Yes | User's solution code |
| testCases | array | Yes | Array of test case objects with `input` and `expected` fields |

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "passed": true,
        "input": { "nums": [2, 7, 11, 15], "target": 9 },
        "expected": [0, 1],
        "actual": [0, 1],
        "runtime": 45,
        "error": null
      }
    ],
    "totalTests": 3,
    "passedTests": 3,
    "failedTests": 0
  }
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| results | array | Array of test result objects |
| results[].passed | boolean | Whether the test passed |
| results[].input | object | Test input data |
| results[].expected | any | Expected output |
| results[].actual | any | Actual output from code execution |
| results[].runtime | number | Execution time in milliseconds |
| results[].error | string\|null | Error message if execution failed |
| totalTests | number | Total number of test cases |
| passedTests | number | Number of passed tests |
| failedTests | number | Number of failed tests |

**Error Responses:**

```json
// 400 Bad Request - Invalid input
{
  "success": false,
  "error": "Missing required fields: code, language, testCases"
}

// 400 Bad Request - Unsupported language
{
  "success": false,
  "error": "Unsupported language. Must be: javascript, python, java, cpp, or c"
}

// 401 Unauthorized
{
  "success": false,
  "error": "Invalid or expired token"
}

// 500 Internal Server Error
{
  "success": false,
  "error": "Code execution failed",
  "details": "SyntaxError: Unexpected token"
}
```

## Security Features

### 1. Execution Timeout
- **Limit:** 3 seconds per test case
- **Purpose:** Prevent infinite loops and long-running processes
- **Implementation:** VM2 timeout for JavaScript, subprocess timeout for other languages

### 2. Memory Limits
- **Limit:** 256MB per execution (Docker)
- **Purpose:** Prevent memory exhaustion attacks
- **Implementation:** Docker container resource constraints

### 3. Sandboxing
- **JavaScript:** VM2 sandbox with isolated context
- **Python/Java/C++/C:** Subprocess execution with file system isolation
- **Network Access:** Disabled in Docker containers (`--network none`)
- **File System:** Read-only with temp directory for compilation (`--read-only`)

### 4. User Isolation
- **Docker User:** Non-root user `coderunner` (UID 1000)
- **File Permissions:** Limited write access to `/tmp` only
- **Process Isolation:** Each execution in separate subprocess

### 5. Input Validation
- Language whitelist: Only 5 supported languages allowed
- Required fields validation: code, language, testCases
- Test cases format validation: Must be non-empty array

## Language-Specific Implementation

### JavaScript (Node.js)
```javascript
// Execution: VM2 sandbox with timeout
const { VM } = require('vm2');
const vm = new VM({ timeout: 3000 });

// Example code wrapper
const wrappedCode = `
  ${userCode}
  const functionName = ${userCode}.match(/function\\s+(\\w+)/)?.[1];
  result = eval(functionName)(input);
`;

vm.run(wrappedCode);
```

**Features:**
- Isolated VM context
- 3-second timeout
- Automatic function name extraction
- No access to Node.js modules or file system

### Python 3
```python
# Execution: subprocess with timeout
import json
import subprocess

# Write code to temp file
with open(f'/tmp/python_{session_id}.py', 'w') as f:
    f.write(wrapped_code)

# Execute with timeout
result = subprocess.run(
    ['python3', f'/tmp/python_{session_id}.py'],
    timeout=3,
    capture_output=True
)
```

**Features:**
- JSON input/output serialization
- Automatic function name extraction with regex
- 3-second timeout
- File cleanup after execution

### Java
```java
// Execution: javac + java with timeout
// 1. Write .java file with class wrapper
public class Solution_{sessionId} {
    public static void main(String[] args) {
        Solution solution = new Solution();
        // Parse input and execute
        System.out.println(Arrays.toString(result));
    }
}

// 2. Compile: javac Solution_{sessionId}.java
// 3. Run: java -cp /tmp Solution_{sessionId}
```

**Features:**
- Unique class name per execution (prevents conflicts)
- Compilation + execution in single workflow
- JSON input parsing
- Automatic cleanup of .java and .class files

### C++
```cpp
// Execution: g++ + executable with timeout
// 1. Write .cpp file with main wrapper
#include <iostream>
#include <vector>
using namespace std;

${userCode}

int main() {
    Solution solution;
    // Parse input and execute
    for (int val : result) {
        cout << val << " ";
    }
    return 0;
}

// 2. Compile: g++ code.cpp -o code.exe
// 3. Run: ./code.exe
```

**Features:**
- STL support (vector, iostream)
- Compilation with g++
- Output parsing (space-separated integers)
- Binary cleanup after execution

### C
```c
// Execution: gcc + executable with timeout
// 1. Write .c file with main wrapper
#include <stdio.h>
#include <stdlib.h>

${userCode}

int main() {
    // Parse input and execute
    for (int i = 0; i < returnSize; i++) {
        printf("%d ", result[i]);
    }
    return 0;
}

// 2. Compile: gcc code.c -o code.exe
// 3. Run: ./code.exe
```

**Features:**
- Standard C library support
- Compilation with gcc
- Output parsing
- Binary cleanup

## Docker Setup (Production)

### Build Docker Image
```bash
docker build -f Dockerfile.executor -t code-executor:latest .
```

### Run Code Execution Container
```bash
docker run \
  --name code-executor \
  --memory="256m" \
  --cpus="0.5" \
  --network none \
  --read-only \
  -v /tmp:/tmp:rw \
  -d \
  code-executor:latest
```

**Container Constraints:**
- **Memory:** 256MB maximum
- **CPU:** 0.5 cores (50% of 1 core)
- **Network:** Disabled (`--network none`)
- **File System:** Read-only except `/tmp`
- **User:** Non-root (`coderunner`)

### Execute Code in Container
```bash
# Copy code to container
docker cp /host/code.js code-executor:/workspace/

# Execute in container
docker exec code-executor node /workspace/code.js

# Retrieve results
docker exec code-executor cat /workspace/output.json
```

## Current Implementation Status

### ✅ Completed (Day 5)
- [x] Express route `/api/execute` created
- [x] Multi-language support (5 languages)
- [x] VM2 JavaScript sandboxing
- [x] Subprocess execution for Python/Java/C++/C
- [x] 3-second timeout per test case
- [x] Test case execution and comparison
- [x] Runtime measurement
- [x] Error handling and reporting
- [x] Input validation
- [x] Authentication integration
- [x] Comprehensive test suite

### 🔄 In Progress (Day 6)
- [ ] Docker container implementation
- [ ] Production-ready security hardening
- [ ] Resource limit enforcement (memory/CPU)
- [ ] Enhanced input parsing for complex data types
- [ ] Code compilation caching (Java/C++/C)
- [ ] Metrics and logging

### 📋 Future Enhancements
- [ ] Support for additional languages (Go, Rust, TypeScript)
- [ ] Custom test case timeout configuration
- [ ] Execution result caching
- [ ] Real-time execution progress updates (WebSocket)
- [ ] Code profiling and optimization suggestions
- [ ] Integration with problem submission workflow

## Testing

### Run Test Suite
```bash
# Ensure server is running
npm start

# In another terminal, run tests
node test-execute-api.js
```

### Manual Testing with curl
```bash
# 1. Signup and get token
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"Test123"}'

# 2. Execute JavaScript code
curl -X POST http://localhost:3000/api/execute \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "language": "javascript",
    "code": "function twoSum(nums, target) { const map = new Map(); for (let i = 0; i < nums.length; i++) { const complement = target - nums[i]; if (map.has(complement)) { return [map.get(complement), i]; } map.set(nums[i], i); } return []; }",
    "testCases": [
      {
        "input": { "nums": [2, 7, 11, 15], "target": 9 },
        "expected": [0, 1]
      }
    ]
  }'
```

## Performance Considerations

### Execution Time
- **JavaScript:** ~5-50ms per test (VM2 overhead minimal)
- **Python:** ~50-200ms per test (subprocess startup)
- **Java:** ~500-1000ms per test (compilation + execution)
- **C++:** ~300-800ms per test (compilation + execution)
- **C:** ~200-600ms per test (compilation + execution)

### Optimization Strategies
1. **Compilation Caching:** Cache compiled Java/C++/C binaries for identical code
2. **Warm Containers:** Keep Docker containers running to avoid cold starts
3. **Parallel Execution:** Run multiple test cases in parallel (with resource limits)
4. **Worker Pool:** Maintain pool of execution workers for load balancing

## Error Codes

| Code | Error Type | Description |
|------|-----------|-------------|
| 400 | Validation Error | Missing or invalid request parameters |
| 401 | Authentication Error | Missing or invalid JWT token |
| 500 | Execution Error | Code execution failed (syntax, runtime, timeout) |

## Rate Limiting (Future)

Planned rate limits for code execution:
- **Authenticated Users:** 100 executions per hour
- **Premium Users:** 500 executions per hour
- **Per Test Case:** Maximum 10 test cases per request

## Support

For issues or questions about the Code Execution API:
1. Check error messages in response
2. Verify code syntax and language
3. Review test case format
4. Check authentication token validity
5. See logs in `server.js` console output

## Changelog

### Version 1.0 (Week 1, Day 5-6)
- Initial release with 5 language support
- VM2 JavaScript sandboxing
- Subprocess execution for compiled languages
- Basic security features (timeout, validation)
- Test suite with 7 test scenarios
