-- Light AI - DSA Patterns Seed Data
-- Phase 3 Week 1 Day 1 - 10 Core DSA Patterns
-- Date: October 27, 2025

-- ============================================================================
-- INSERT 10 DSA PATTERNS
-- ============================================================================

INSERT INTO dsa_patterns (name, slug, description, icon, difficulty_level, total_problems, display_order) VALUES

-- 1. Arrays & Hashing
('Arrays & Hashing', 'arrays-hashing', 
'Master array manipulation and hash table techniques. Learn to solve problems involving element lookup, frequency counting, and array transformations using efficient O(1) hash table operations.',
'📊', 1, 5, 1),

-- 2. Two Pointers
('Two Pointers', 'two-pointers',
'Use two pointers moving towards each other or in the same direction to solve array and string problems efficiently. Perfect for sorted arrays, palindromes, and pair-finding problems.',
'👉👈', 2, 5, 2),

-- 3. Sliding Window
('Sliding Window', 'sliding-window',
'Maintain a window of elements and slide it across the array to find optimal subarrays. Essential for substring problems, maximum/minimum subarray sums, and fixed-size window problems.',
'🪟', 2, 5, 3),

-- 4. Binary Search
('Binary Search', 'binary-search',
'Efficiently search in sorted arrays with O(log n) complexity. Learn variations including rotated arrays, finding boundaries, and search space reduction techniques.',
'🔍', 2, 5, 4),

-- 5. Linked Lists
('Linked Lists', 'linked-lists',
'Master pointer manipulation in singly and doubly linked lists. Learn reversal, cycle detection, merging, and fast/slow pointer techniques.',
'🔗', 2, 5, 5),

-- 6. Trees
('Trees', 'trees',
'Understand binary trees, BSTs, and tree traversals (inorder, preorder, postorder, level-order). Master recursion, tree construction, and tree property problems.',
'🌳', 3, 5, 6),

-- 7. Graphs
('Graphs', 'graphs',
'Learn BFS, DFS, topological sort, and graph traversal techniques. Solve problems involving connected components, shortest paths, and graph coloring.',
'📈', 4, 5, 7),

-- 8. Dynamic Programming
('Dynamic Programming', 'dynamic-programming',
'Break down complex problems into overlapping subproblems. Master memoization, tabulation, and state transitions for optimization problems.',
'💎', 5, 5, 8),

-- 9. Stack & Queue
('Stack & Queue', 'stack-queue',
'Use LIFO and FIFO data structures to solve problems involving parentheses matching, monotonic stacks, and BFS/DFS implementations.',
'📚', 2, 5, 9),

-- 10. Heap / Priority Queue
('Heap / Priority Queue', 'heap-priority-queue',
'Efficiently find min/max elements and solve top-K problems using heaps. Learn heap construction, heapify operations, and priority queue applications.',
'🏔️', 3, 5, 10)

ON CONFLICT (slug) DO UPDATE SET
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  difficulty_level = EXCLUDED.difficulty_level,
  total_problems = EXCLUDED.total_problems,
  display_order = EXCLUDED.display_order;

-- ============================================================================
-- VERIFY INSERTION
-- ============================================================================
DO $$
DECLARE
  pattern_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO pattern_count FROM dsa_patterns;
  RAISE NOTICE '✅ DSA Patterns seeded successfully!';
  RAISE NOTICE '   - Total patterns: %', pattern_count;
  RAISE NOTICE '   - Ready to seed problems!';
END $$;
