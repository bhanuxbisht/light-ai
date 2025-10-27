-- Quick seed for 10 essential problems
-- Simplified version without special characters

BEGIN;

-- Problem 1: Two Sum
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Two Sum', 'two-sum', 'Easy', 'Arrays & Hashing', 
'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.',
'[{"input": {"nums": [2,7,11,15], "target": 9}, "expected": [0,1], "hidden": false}, {"input": {"nums": [3,2,4], "target": 6}, "expected": [1,2], "hidden": false}]'::jsonb,
'{"javascript": "function twoSum(nums, target) {\n  // Your code here\n}", "python": "def two_sum(nums, target):\n  pass"}'::jsonb,
ARRAY['Google', 'Amazon', 'Apple'], ARRAY['array', 'hash-table'], 85.5);

-- Problem 2: Valid Parentheses
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Valid Parentheses', 'valid-parentheses', 'Easy', 'Stack', 
'Given a string s containing just the characters ''()'', ''{}'' and ''[]'', determine if the input string is valid.',
'[{"input": {"s": "()"}, "expected": true, "hidden": false}, {"input": {"s": "()[]{}"}, "expected": true, "hidden": false}, {"input": {"s": "(]"}, "expected": false, "hidden": false}]'::jsonb,
'{"javascript": "function isValid(s) {\n  // Your code here\n}", "python": "def is_valid(s):\n  pass"}'::jsonb,
ARRAY['Google', 'Amazon', 'Meta'], ARRAY['string', 'stack'], 88.2);

-- Problem 3: Merge Two Sorted Lists
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Merge Two Sorted Lists', 'merge-two-sorted-lists', 'Easy', 'Linked List', 
'Merge two sorted linked lists and return it as a sorted list.',
'[{"input": {"list1": [1,2,4], "list2": [1,3,4]}, "expected": [1,1,2,3,4,4], "hidden": false}]'::jsonb,
'{"javascript": "function mergeTwoLists(list1, list2) {\n  // Your code here\n}", "python": "def merge_two_lists(list1, list2):\n  pass"}'::jsonb,
ARRAY['Amazon', 'Microsoft', 'Apple'], ARRAY['linked-list', 'recursion'], 62.4);

-- Problem 4: Binary Search
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Binary Search', 'binary-search', 'Easy', 'Binary Search', 
'Given a sorted array of integers nums and an integer target, write a function to search target in nums.',
'[{"input": {"nums": [-1,0,3,5,9,12], "target": 9}, "expected": 4, "hidden": false}, {"input": {"nums": [-1,0,3,5,9,12], "target": 2}, "expected": -1, "hidden": false}]'::jsonb,
'{"javascript": "function search(nums, target) {\n  // Your code here\n}", "python": "def search(nums, target):\n  pass"}'::jsonb,
ARRAY['Amazon', 'Google', 'Meta'], ARRAY['array', 'binary-search'], 54.8);

-- Problem 5: Maximum Subarray
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Maximum Subarray', 'maximum-subarray', 'Medium', 'Dynamic Programming', 
'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
'[{"input": {"nums": [-2,1,-3,4,-1,2,1,-5,4]}, "expected": 6, "hidden": false}, {"input": {"nums": [1]}, "expected": 1, "hidden": false}]'::jsonb,
'{"javascript": "function maxSubArray(nums) {\n  // Your code here\n}", "python": "def max_sub_array(nums):\n  pass"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Apple'], ARRAY['array', 'dynamic-programming'], 50.2);

-- Problem 6: Contains Duplicate
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Contains Duplicate', 'contains-duplicate', 'Easy', 'Arrays & Hashing', 
'Given an integer array nums, return true if any value appears at least twice in the array.',
'[{"input": {"nums": [1,2,3,1]}, "expected": true, "hidden": false}, {"input": {"nums": [1,2,3,4]}, "expected": false, "hidden": false}]'::jsonb,
'{"javascript": "function containsDuplicate(nums) {\n  // Your code here\n}", "python": "def contains_duplicate(nums):\n  pass"}'::jsonb,
ARRAY['Google', 'Amazon'], ARRAY['array', 'hash-table'], 60.2);

-- Problem 7: Best Time to Buy and Sell Stock
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Best Time to Buy and Sell Stock', 'best-time-to-buy-and-sell-stock', 'Easy', 'Arrays & Hashing', 
'You want to maximize your profit by choosing a single day to buy one stock and a different day in the future to sell that stock.',
'[{"input": {"prices": [7,1,5,3,6,4]}, "expected": 5, "hidden": false}, {"input": {"prices": [7,6,4,3,1]}, "expected": 0, "hidden": false}]'::jsonb,
'{"javascript": "function maxProfit(prices) {\n  // Your code here\n}", "python": "def max_profit(prices):\n  pass"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Apple', 'Google'], ARRAY['array', 'dynamic-programming'], 54.6);

-- Problem 8: Valid Anagram
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Valid Anagram', 'valid-anagram', 'Easy', 'Arrays & Hashing', 
'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
'[{"input": {"s": "anagram", "t": "nagaram"}, "expected": true, "hidden": false}, {"input": {"s": "rat", "t": "car"}, "expected": false, "hidden": false}]'::jsonb,
'{"javascript": "function isAnagram(s, t) {\n  // Your code here\n}", "python": "def is_anagram(s, t):\n  pass"}'::jsonb,
ARRAY['Amazon', 'Bloomberg'], ARRAY['string', 'hash-table'], 62.8);

-- Problem 9: Reverse Linked List
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Reverse Linked List', 'reverse-linked-list', 'Easy', 'Linked List', 
'Given the head of a singly linked list, reverse the list, and return the reversed list.',
'[{"input": {"head": [1,2,3,4,5]}, "expected": [5,4,3,2,1], "hidden": false}, {"input": {"head": [1,2]}, "expected": [2,1], "hidden": false}]'::jsonb,
'{"javascript": "function reverseList(head) {\n  // Your code here\n}", "python": "def reverse_list(head):\n  pass"}'::jsonb,
ARRAY['Amazon', 'Google', 'Meta', 'Microsoft'], ARRAY['linked-list', 'recursion'], 73.1);

-- Problem 10: Climbing Stairs
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Climbing Stairs', 'climbing-stairs', 'Easy', 'Dynamic Programming', 
'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
'[{"input": {"n": 2}, "expected": 2, "hidden": false}, {"input": {"n": 3}, "expected": 3, "hidden": false}, {"input": {"n": 5}, "expected": 8, "hidden": false}]'::jsonb,
'{"javascript": "function climbStairs(n) {\n  // Your code here\n}", "python": "def climb_stairs(n):\n  pass"}'::jsonb,
ARRAY['Amazon', 'Google', 'Apple'], ARRAY['math', 'dynamic-programming'], 52.3);

COMMIT;

-- Link problems to patterns
INSERT INTO problem_patterns (problem_id, pattern_id)
SELECT p.id, pat.id
FROM problems p
JOIN dsa_patterns pat ON pat.slug IN ('arrays-hashing', 'stack', 'linked-list', 'binary-search', 'dynamic-programming')
WHERE p.slug IN ('two-sum', 'contains-duplicate', 'best-time-to-buy-and-sell-stock', 'valid-anagram')
AND pat.slug = 'arrays-hashing'
UNION ALL
SELECT p.id, pat.id  
FROM problems p
JOIN dsa_patterns pat ON pat.slug = 'stack'
WHERE p.slug = 'valid-parentheses'
UNION ALL
SELECT p.id, pat.id
FROM problems p
JOIN dsa_patterns pat ON pat.slug = 'linked-list'
WHERE p.slug IN ('merge-two-sorted-lists', 'reverse-linked-list')
UNION ALL
SELECT p.id, pat.id
FROM problems p
JOIN dsa_patterns pat ON pat.slug = 'binary-search'
WHERE p.slug = 'binary-search'
UNION ALL
SELECT p.id, pat.id
FROM problems p
JOIN dsa_patterns pat ON pat.slug = 'dynamic-programming'
WHERE p.slug IN ('maximum-subarray', 'climbing-stairs');
