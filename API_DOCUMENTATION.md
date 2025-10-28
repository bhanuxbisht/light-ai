# Problems API Documentation

## Base URL
```
http://localhost:3000/api/problems
```

## Authentication
Most endpoints support optional authentication. Include JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 1. List All Problems
**GET** `/api/problems`

Get paginated list of problems with optional filters.

**Query Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `difficulty` | string | Filter by difficulty | `Easy`, `Medium`, `Hard` |
| `pattern` | string | Filter by DSA pattern slug | `arrays-hashing`, `two-pointers` |
| `company` | string | Filter by company | `Amazon`, `Google`, `Meta` |
| `status` | string | Filter by solve status (requires auth) | `solved`, `attempted`, `unsolved` |
| `search` | string | Search in title/description | `two sum` |
| `page` | number | Page number | `1` (default) |
| `limit` | number | Items per page | `20` (default) |

**Example Request:**
```bash
curl "http://localhost:3000/api/problems?difficulty=Easy&limit=5"
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "problems": [
      {
        "id": 1,
        "title": "Two Sum",
        "slug": "two-sum",
        "difficulty": "Easy",
        "category": "Arrays & Hashing",
        "acceptance_rate": "85.50",
        "companies": ["Google", "Amazon", "Apple"],
        "tags": ["array", "hash-table"],
        "solved": false,
        "attempted": false,
        "bookmarked": false
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalProblems": 50,
      "problemsPerPage": 5,
      "hasNextPage": true,
      "hasPrevPage": false
    },
    "filters": {
      "difficulty": "Easy"
    }
  }
}
```

---

### 2. Get Single Problem
**GET** `/api/problems/:slug`

Get complete problem details including description, test cases, and starter code.

**Path Parameters:**
- `slug` - Problem slug (e.g., `two-sum`)

**Example Request:**
```bash
curl "http://localhost:3000/api/problems/two-sum"
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Two Sum",
    "slug": "two-sum",
    "difficulty": "Easy",
    "category": "Arrays & Hashing",
    "description": "Given an array of integers nums and an integer target...",
    "test_cases": [
      {
        "input": { "nums": [2,7,11,15], "target": 9 },
        "expected": [0,1],
        "hidden": false
      }
    ],
    "starter_code": {
      "javascript": "function twoSum(nums, target) {\n  // Your code here\n}",
      "python": "def two_sum(nums, target):\n  pass",
      "java": "class Solution {...}",
      "cpp": "class Solution {...}",
      "c": "int* twoSum(...) {...}"
    },
    "patterns": [
      {
        "id": 1,
        "name": "Arrays & Hashing",
        "slug": "arrays-hashing",
        "description": "..."
      }
    ],
    "companies": ["Google", "Amazon", "Apple"],
    "tags": ["array", "hash-table"],
    "acceptance_rate": "85.50",
    "solved": false,
    "attempted": false,
    "bookmarked": false
  }
}
```

---

### 3. Submit Solution
**POST** `/api/problems/:slug/submit`

Submit a solution and get test results. Requires authentication.

**Path Parameters:**
- `slug` - Problem slug

**Request Body:**
```json
{
  "code": "function twoSum(nums, target) { /* solution */ }",
  "language": "javascript",
  "testResults": [
    {
      "passed": true,
      "input": { "nums": [2,7,11,15], "target": 9 },
      "expected": [0,1]
    }
  ],
  "runtime": 85,
  "memory": 42.5
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "submissionId": 123,
    "status": "accepted",
    "passedTests": 3,
    "totalTests": 3,
    "xpEarned": 15,
    "runtime": 85,
    "memory": 42.5,
    "submittedAt": "2025-10-28T10:30:00Z"
  }
}
```

**XP Calculation:**
- Easy: 10 XP base
- Medium: 25 XP base
- Hard: 50 XP base
- +5 XP bonus if runtime < 100ms

---

### 4. Get Submission History
**GET** `/api/problems/:slug/submissions`

Get user's submission history for a problem. Requires authentication.

**Query Parameters:**
- `limit` - Number of submissions (default: 10)

**Example Response:**
```json
{
  "success": true,
  "data": {
    "submissions": [
      {
        "id": 123,
        "language": "javascript",
        "status": "accepted",
        "runtime": 85,
        "memory": 42.5,
        "passed_tests": 3,
        "total_tests": 3,
        "created_at": "2025-10-28T10:30:00Z"
      }
    ],
    "total": 1
  }
}
```

---

### 5. Toggle Bookmark
**POST** `/api/problems/:slug/bookmark`

Add or remove problem from bookmarks. Requires authentication.

**Example Response:**
```json
{
  "success": true,
  "data": {
    "bookmarked": true,
    "message": "Problem bookmarked"
  }
}
```

---

### 6. Get Hints
**GET** `/api/problems/:slug/hints`

Get progressive hints for a problem.

**Query Parameters:**
- `level` - Hint level (1, 2, 3..., default: 1)

**Example Response:**
```json
{
  "success": true,
  "data": {
    "hints": [
      "Try using a hash map to store seen values"
    ],
    "currentLevel": 1,
    "totalLevels": 3,
    "hasMore": true
  }
}
```

---

### 7. Get Daily Challenge
**GET** `/api/problems/daily/challenge`

Get today's daily challenge problem.

**Example Response:**
```json
{
  "success": true,
  "data": {
    "challenge_id": 45,
    "date": "2025-10-28",
    "bonus_xp": 50,
    "id": 15,
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "isDailyChallenge": true,
    "completed": false
  }
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common Error Codes:**
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found (problem doesn't exist)
- `500` - Internal Server Error

---

## Rate Limiting

Currently no rate limiting implemented. Will be added in production.

**Planned Limits:**
- Authenticated: 1000 requests/hour
- Unauthenticated: 100 requests/hour

---

## Testing

Use the provided test suite:
```bash
node test-problems-api.js
```

Or test manually with curl:
```bash
# List problems
curl "http://localhost:3000/api/problems?limit=5"

# Get problem details
curl "http://localhost:3000/api/problems/two-sum"

# Search problems
curl "http://localhost:3000/api/problems?search=array"
```

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- Problem slugs are lowercase with hyphens
- Test cases include both visible and hidden cases
- Starter code is provided for all 5 languages
- XP is only awarded when all tests pass
- Daily challenges rotate automatically
