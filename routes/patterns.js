const express = require('express');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const router = express.Router();

// GET /api/patterns - list all patterns with counts and optional user progress
router.get('/', optionalAuth, async (req, res) => {
  try {
    const pool = req.app.get('db');
    if (!pool) {
      // Fallback: return demo patterns if DB not available
      return res.json({
        patterns: [
          { id: 1, name: 'Two Pointers', slug: 'two-pointers', description: 'Two pointers pattern', totalProblems: 10, userSolved: 0 },
          { id: 2, name: 'Sliding Window', slug: 'sliding-window', description: 'Sliding window pattern', totalProblems: 8, userSolved: 0 }
        ]
      });
    }

    // Get all patterns
    const patternsResult = await pool.query('SELECT id, name, slug, description FROM dsa_patterns ORDER BY name');
    const patterns = patternsResult.rows;

    // For performance, fetch counts in batch
    const patternIds = patterns.map(p => p.id);
    let counts = {};
    if (patternIds.length > 0) {
      const countsQuery = await pool.query(
        `SELECT pp.pattern_id, COUNT(*) as total
         FROM problem_patterns pp
         JOIN problems p ON pp.problem_id = p.id
         WHERE pp.pattern_id = ANY($1::int[])
         GROUP BY pp.pattern_id`,
        [patternIds]
      );
      countsQuery.rows.forEach(r => { counts[r.pattern_id] = parseInt(r.total, 10); });
    }

    // If user is authenticated, get solved counts per pattern
    let userSolved = {};
    if (req.user && req.user.id) {
      const solvedQuery = await pool.query(
        `SELECT pp.pattern_id, COUNT(DISTINCT s.problem_id) as solved
         FROM problem_patterns pp
         JOIN submissions s ON s.problem_id = pp.problem_id AND s.passed = true
         WHERE pp.pattern_id = ANY($1::int[]) AND s.user_id = $2
         GROUP BY pp.pattern_id`,
        [patternIds, req.user.id]
      );
      solvedQuery.rows.forEach(r => { userSolved[r.pattern_id] = parseInt(r.solved, 10); });
    }

    const enriched = patterns.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      totalProblems: counts[p.id] || 0,
      userSolved: userSolved[p.id] || 0
    }));

    res.json({ patterns: enriched });
  } catch (error) {
    console.error('Error fetching patterns:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch patterns' });
  }
});

// GET /api/patterns/:slug - pattern detail with associated problems
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const pool = req.app.get('db');
    const { slug } = req.params;

    if (!pool) {
      return res.status(200).json({
        pattern: { id: 1, name: 'Two Pointers', slug: 'two-pointers', description: 'Demo pattern' },
        problems: []
      });
    }

    const patternRes = await pool.query('SELECT id, name, slug, description FROM dsa_patterns WHERE slug = $1', [slug]);
    if (patternRes.rows.length === 0) return res.status(404).json({ success: false, error: 'Pattern not found' });
    const pattern = patternRes.rows[0];

    // Get associated problems
    const problemsRes = await pool.query(
      `SELECT p.id, p.title, p.slug, p.difficulty, p.acceptance_rate
       FROM problem_patterns pp
       JOIN problems p ON pp.problem_id = p.id
       WHERE pp.pattern_id = $1
       ORDER BY p.difficulty, p.title`,
      [pattern.id]
    );

    const problems = problemsRes.rows;

    // If user, annotate solved
    if (req.user && req.user.id) {
      const problemIds = problems.map(p => p.id);
      if (problemIds.length > 0) {
        const solvedRes = await pool.query(
          `SELECT problem_id FROM submissions WHERE user_id = $1 AND passed = true AND problem_id = ANY($2::int[])`,
          [req.user.id, problemIds]
        );
        const solvedSet = new Set(solvedRes.rows.map(r => r.problem_id));
        problems.forEach(p => p.solved = solvedSet.has(p.id));
      }
    }

    res.json({ pattern, problems });
  } catch (error) {
    console.error('Error fetching pattern detail:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch pattern' });
  }
});

module.exports = router;
