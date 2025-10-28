// API Validation Middleware
// Validates request parameters and body for Problems API

// Validate difficulty parameter
function validateDifficulty(req, res, next) {
  const { difficulty } = req.query;
  
  if (difficulty && !['Easy', 'Medium', 'Hard'].includes(difficulty)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid difficulty. Must be: Easy, Medium, or Hard'
    });
  }
  
  next();
}

// Validate pagination parameters
function validatePagination(req, res, next) {
  const { page, limit } = req.query;
  
  if (page && (isNaN(page) || page < 1)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid page number. Must be >= 1'
    });
  }
  
  if (limit && (isNaN(limit) || limit < 1 || limit > 100)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid limit. Must be between 1 and 100'
    });
  }
  
  next();
}

// Validate status parameter
function validateStatus(req, res, next) {
  const { status } = req.query;
  
  if (status && !['solved', 'attempted', 'unsolved'].includes(status)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid status. Must be: solved, attempted, or unsolved'
    });
  }
  
  next();
}

// Validate submission body
function validateSubmission(req, res, next) {
  const { code, language, testResults, runtime, memory } = req.body;
  
  // Check required fields
  if (!code || !language || !testResults || runtime === undefined || memory === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: code, language, testResults, runtime, memory'
    });
  }
  
  // Validate language
  if (!['javascript', 'python', 'java', 'cpp', 'c'].includes(language)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid language. Must be: javascript, python, java, cpp, or c'
    });
  }
  
  // Validate test results array
  if (!Array.isArray(testResults) || testResults.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'testResults must be a non-empty array'
    });
  }
  
  // Validate each test result
  for (const test of testResults) {
    if (typeof test.passed !== 'boolean') {
      return res.status(400).json({
        success: false,
        error: 'Each test result must have a "passed" boolean field'
      });
    }
  }
  
  // Validate runtime and memory
  if (typeof runtime !== 'number' || runtime < 0) {
    return res.status(400).json({
      success: false,
      error: 'runtime must be a non-negative number'
    });
  }
  
  if (typeof memory !== 'number' || memory < 0) {
    return res.status(400).json({
      success: false,
      error: 'memory must be a non-negative number'
    });
  }
  
  next();
}

// Validate hint level parameter
function validateHintLevel(req, res, next) {
  const { level } = req.query;
  
  if (level && (isNaN(level) || level < 1 || level > 10)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid hint level. Must be between 1 and 10'
    });
  }
  
  next();
}

// Validate problem slug format
function validateSlug(req, res, next) {
  const { slug } = req.params;
  
  // Slug should be lowercase letters, numbers, and hyphens only
  const slugRegex = /^[a-z0-9-]+$/;
  
  if (!slugRegex.test(slug)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid problem slug format'
    });
  }
  
  next();
}

module.exports = {
  validateDifficulty,
  validatePagination,
  validateStatus,
  validateSubmission,
  validateHintLevel,
  validateSlug
};
