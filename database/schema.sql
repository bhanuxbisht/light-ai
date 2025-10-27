-- Light AI Database Schema Extension
-- Phase 3 Week 1 Day 1 - New Tables for Problems, Patterns, and Learning
-- Date: October 27, 2025

-- ============================================================================
-- 1. DSA PATTERNS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS dsa_patterns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50), -- Emoji or icon name
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5), -- 1=Beginner, 5=Expert
  total_problems INTEGER DEFAULT 0,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 2. PROBLEMS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS problems (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  description TEXT NOT NULL,
  constraints TEXT,
  examples JSONB, -- Array of {input, output, explanation}
  hints JSONB, -- Array of progressive hints
  starter_code JSONB NOT NULL, -- {javascript: "", python: "", java: "", cpp: "", c: ""}
  solution JSONB, -- {explanation: "", code: {javascript: "", python: "", ...}}
  test_cases JSONB NOT NULL, -- Array of {input, expected, isHidden}
  company_tags JSONB, -- Array of company names ["Google", "Amazon", etc.]
  topic_tags JSONB, -- Array of tags ["array", "hash-table", etc.]
  acceptance_rate DECIMAL(5,2),
  likes INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 3. PROBLEM-PATTERN MAPPING (Many-to-Many)
-- ============================================================================
CREATE TABLE IF NOT EXISTS problem_patterns (
  problem_id INTEGER REFERENCES problems(id) ON DELETE CASCADE,
  pattern_id INTEGER REFERENCES dsa_patterns(id) ON DELETE CASCADE,
  PRIMARY KEY (problem_id, pattern_id)
);

-- ============================================================================
-- 4. USER PROBLEM PROGRESS
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_problem_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  problem_id INTEGER REFERENCES problems(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'attempted', 'solved')),
  attempts INTEGER DEFAULT 0,
  first_solved_at TIMESTAMP,
  last_attempted_at TIMESTAMP,
  best_runtime INTEGER, -- milliseconds
  best_memory INTEGER, -- KB
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, problem_id)
);

-- ============================================================================
-- 5. BOOKMARKS
-- ============================================================================
CREATE TABLE IF NOT EXISTS bookmarks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  problem_id INTEGER REFERENCES problems(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, problem_id)
);

-- ============================================================================
-- 6. LEARNING PATHS
-- ============================================================================
CREATE TABLE IF NOT EXISTS learning_paths (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT,
  difficulty VARCHAR(20) CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  estimated_hours INTEGER,
  problem_ids JSONB, -- Ordered array of problem IDs
  icon VARCHAR(50),
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 7. DAILY CHALLENGES
-- ============================================================================
CREATE TABLE IF NOT EXISTS daily_challenges (
  id SERIAL PRIMARY KEY,
  problem_id INTEGER REFERENCES problems(id) ON DELETE CASCADE,
  challenge_date DATE NOT NULL UNIQUE,
  bonus_xp INTEGER DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 8. USER DAILY CHALLENGES (Track completion)
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_daily_challenges (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  daily_challenge_id INTEGER REFERENCES daily_challenges(id) ON DELETE CASCADE,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  xp_earned INTEGER,
  UNIQUE(user_id, daily_challenge_id)
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Problems indexes
CREATE INDEX IF NOT EXISTS idx_problems_slug ON problems(slug);
CREATE INDEX IF NOT EXISTS idx_problems_difficulty ON problems(difficulty);
CREATE INDEX IF NOT EXISTS idx_problems_created_at ON problems(created_at DESC);

-- Pattern indexes
CREATE INDEX IF NOT EXISTS idx_patterns_slug ON dsa_patterns(slug);
CREATE INDEX IF NOT EXISTS idx_patterns_display_order ON dsa_patterns(display_order);

-- User progress indexes
CREATE INDEX IF NOT EXISTS idx_user_problem_progress_user ON user_problem_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_problem_progress_problem ON user_problem_progress(problem_id);
CREATE INDEX IF NOT EXISTS idx_user_problem_progress_status ON user_problem_progress(status);

-- Bookmarks indexes
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_problem ON bookmarks(problem_id);

-- Daily challenges indexes
CREATE INDEX IF NOT EXISTS idx_daily_challenges_date ON daily_challenges(challenge_date DESC);

-- ============================================================================
-- UPDATE EXISTING SUBMISSIONS TABLE (Add new columns)
-- ============================================================================
ALTER TABLE submissions 
  ADD COLUMN IF NOT EXISTS execution_time INTEGER, -- milliseconds
  ADD COLUMN IF NOT EXISTS memory_used INTEGER, -- KB
  ADD COLUMN IF NOT EXISTS test_cases_passed INTEGER,
  ADD COLUMN IF NOT EXISTS total_test_cases INTEGER;

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- View: Problems with pattern names
CREATE OR REPLACE VIEW problems_with_patterns AS
SELECT 
  p.id,
  p.title,
  p.slug,
  p.difficulty,
  p.acceptance_rate,
  p.likes,
  p.dislikes,
  COALESCE(
    json_agg(
      json_build_object('id', dp.id, 'name', dp.name, 'slug', dp.slug)
    ) FILTER (WHERE dp.id IS NOT NULL),
    '[]'::json
  ) as patterns
FROM problems p
LEFT JOIN problem_patterns pp ON p.id = pp.problem_id
LEFT JOIN dsa_patterns dp ON pp.pattern_id = dp.id
GROUP BY p.id, p.title, p.slug, p.difficulty, p.acceptance_rate, p.likes, p.dislikes;

-- View: Pattern statistics
CREATE OR REPLACE VIEW pattern_statistics AS
SELECT 
  dp.id,
  dp.name,
  dp.slug,
  dp.icon,
  dp.difficulty_level,
  COUNT(DISTINCT pp.problem_id) as actual_problem_count,
  COUNT(DISTINCT CASE WHEN p.difficulty = 'Easy' THEN p.id END) as easy_count,
  COUNT(DISTINCT CASE WHEN p.difficulty = 'Medium' THEN p.id END) as medium_count,
  COUNT(DISTINCT CASE WHEN p.difficulty = 'Hard' THEN p.id END) as hard_count
FROM dsa_patterns dp
LEFT JOIN problem_patterns pp ON dp.id = pp.pattern_id
LEFT JOIN problems p ON pp.problem_id = p.id
GROUP BY dp.id, dp.name, dp.slug, dp.icon, dp.difficulty_level;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Database schema extension complete!';
  RAISE NOTICE '   - 8 new tables created';
  RAISE NOTICE '   - Indexes added for performance';
  RAISE NOTICE '   - Views created for common queries';
  RAISE NOTICE '   - Ready for seed data!';
END $$;
