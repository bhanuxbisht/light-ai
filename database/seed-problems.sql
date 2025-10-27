-- Light AI - Problems Seed Data
-- Phase 3 Week 1 Day 1 - 50 DSA Problems (5 per pattern)
-- Date: October 27, 2025

-- ============================================================================
-- PATTERN 1: ARRAYS & HASHING (5 Problems)
-- ============================================================================

-- Problem 1: Two Sum
INSERT INTO problems (title, slug, difficulty, description, constraints, examples, hints, starter_code, test_cases, companies, tags, acceptance_rate) VALUES
('Two Sum', 'two-sum', 'Easy',
'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.',
'• 2 ≤ nums.length ≤ 10⁴
• -10⁹ ≤ nums[i] ≤ 10⁹
• -10⁹ ≤ target ≤ 10⁹
• Only one valid answer exists',
'[
  {
    "input": "nums = [2,7,11,15], target = 9",
    "output": "[0,1]",
    "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
  },
  {
    "input": "nums = [3,2,4], target = 6",
    "output": "[1,2]",
    "explanation": "Because nums[1] + nums[2] == 6, we return [1, 2]."
  },
  {
    "input": "nums = [3,3], target = 6",
    "output": "[0,1]",
    "explanation": "Because nums[0] + nums[1] == 6, we return [0, 1]."
  }
]'::jsonb,
'[
  "A brute force approach would use nested loops to check every pair. Can you do better?",
  "Think about what you need to find: target - current_number. Can you store this?",
  "Use a hash map to store numbers you''ve seen and their indices. Check if target - num exists in the map."
]'::jsonb,
'{
  "javascript": "function twoSum(nums, target) {\n    // Your code here\n}",
  "python": "def two_sum(nums, target):\n    # Your code here\n    pass",
  "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}",
  "cpp": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n    }\n};",
  "c": "int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Your code here\n}"
}'::jsonb,
'[
  {"input": {"nums": [2,7,11,15], "target": 9}, "expected": [0,1], "isHidden": false},
  {"input": {"nums": [3,2,4], "target": 6}, "expected": [1,2], "isHidden": false},
  {"input": {"nums": [3,3], "target": 6}, "expected": [0,1], "isHidden": false},
  {"input": {"nums": [1,5,3,7,9], "target": 12}, "expected": [2,4], "isHidden": true},
  {"input": {"nums": [-1,-2,-3,-4,-5], "target": -8}, "expected": [2,4], "isHidden": true}
]'::jsonb,
'["Google", "Amazon", "Meta", "Microsoft", "Apple"]'::jsonb,
'["array", "hash-table"]'::jsonb,
52.3);

-- Problem 2: Contains Duplicate
INSERT INTO problems (title, slug, difficulty, description, constraints, examples, hints, starter_code, test_cases, companies, tags, acceptance_rate) VALUES
('Contains Duplicate', 'contains-duplicate', 'Easy',
'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
'• 1 ≤ nums.length ≤ 10⁵
• -10⁹ ≤ nums[i] ≤ 10⁹',
'[
  {
    "input": "nums = [1,2,3,1]",
    "output": "true",
    "explanation": "The element 1 appears at indices 0 and 3."
  },
  {
    "input": "nums = [1,2,3,4]",
    "output": "false",
    "explanation": "All elements are distinct."
  },
  {
    "input": "nums = [1,1,1,3,3,4,3,2,4,2]",
    "output": "true",
    "explanation": "Multiple elements appear more than once."
  }
]'::jsonb,
'[
  "Could you use a hash set to track elements you''ve seen?",
  "If you''ve seen an element before, return true immediately.",
  "The set will help you achieve O(n) time complexity."
]'::jsonb,
'{
  "javascript": "function containsDuplicate(nums) {\n    // Your code here\n}",
  "python": "def contains_duplicate(nums):\n    # Your code here\n    pass",
  "java": "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // Your code here\n    }\n}",
  "cpp": "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        // Your code here\n    }\n};",
  "c": "bool containsDuplicate(int* nums, int numsSize) {\n    // Your code here\n}"
}'::jsonb,
'[
  {"input": {"nums": [1,2,3,1]}, "expected": true, "isHidden": false},
  {"input": {"nums": [1,2,3,4]}, "expected": false, "isHidden": false},
  {"input": {"nums": [1,1,1,3,3,4,3,2,4,2]}, "expected": true, "isHidden": false},
  {"input": {"nums": []}, "expected": false, "isHidden": true},
  {"input": {"nums": [1]}, "expected": false, "isHidden": true}
]'::jsonb,
'["Google", "Amazon", "Apple"]'::jsonb,
'["array", "hash-table"]'::jsonb,
61.8);

-- Problem 3: Valid Anagram
INSERT INTO problems (title, slug, difficulty, description, constraints, examples, hints, starter_code, test_cases, companies, tags, acceptance_rate) VALUES
('Valid Anagram', 'valid-anagram', 'Easy',
'Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
'• 1 ≤ s.length, t.length ≤ 5 × 10⁴
• s and t consist of lowercase English letters',
'[
  {
    "input": "s = \"anagram\", t = \"nagaram\"",
    "output": "true",
    "explanation": "Both strings have the same characters with the same frequencies."
  },
  {
    "input": "s = \"rat\", t = \"car\"",
    "output": "false",
    "explanation": "The strings have different characters."
  }
]'::jsonb,
'[
  "If the lengths are different, they cannot be anagrams.",
  "Count the frequency of each character in both strings.",
  "Use a hash map or sort both strings and compare."
]'::jsonb,
'{
  "javascript": "function isAnagram(s, t) {\n    // Your code here\n}",
  "python": "def is_anagram(s, t):\n    # Your code here\n    pass",
  "java": "class Solution {\n    public boolean isAnagram(String s, String t) {\n        // Your code here\n    }\n}",
  "cpp": "class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        // Your code here\n    }\n};",
  "c": "bool isAnagram(char* s, char* t) {\n    // Your code here\n}"
}'::jsonb,
'[
  {"input": {"s": "anagram", "t": "nagaram"}, "expected": true, "isHidden": false},
  {"input": {"s": "rat", "t": "car"}, "expected": false, "isHidden": false},
  {"input": {"s": "listen", "t": "silent"}, "expected": true, "isHidden": true},
  {"input": {"s": "hello", "t": "world"}, "expected": false, "isHidden": true},
  {"input": {"s": "a", "t": "a"}, "expected": true, "isHidden": true}
]'::jsonb,
'["Meta", "Amazon", "Bloomberg"]'::jsonb,
'["hash-table", "string", "sorting"]'::jsonb,
64.2);

-- Problem 4: Group Anagrams
INSERT INTO problems (title, slug, difficulty, description, constraints, examples, hints, starter_code, test_cases, companies, tags, acceptance_rate) VALUES
('Group Anagrams', 'group-anagrams', 'Medium',
'Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
'• 1 ≤ strs.length ≤ 10⁴
• 0 ≤ strs[i].length ≤ 100
• strs[i] consists of lowercase English letters',
'[
  {
    "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
    "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
    "explanation": "Strings that are anagrams are grouped together."
  },
  {
    "input": "strs = [\"\"]",
    "output": "[[\"\"]]",
    "explanation": "Single empty string forms one group."
  },
  {
    "input": "strs = [\"a\"]",
    "output": "[[\"a\"]]",
    "explanation": "Single character forms one group."
  }
]'::jsonb,
'[
  "Anagrams will have the same characters when sorted.",
  "Use the sorted string as a key in a hash map.",
  "Group all strings that produce the same sorted key together."
]'::jsonb,
'{
  "javascript": "function groupAnagrams(strs) {\n    // Your code here\n}",
  "python": "def group_anagrams(strs):\n    # Your code here\n    pass",
  "java": "class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        // Your code here\n    }\n}",
  "cpp": "class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        // Your code here\n    }\n};",
  "c": "char*** groupAnagrams(char** strs, int strsSize, int* returnSize, int** returnColumnSizes) {\n    // Your code here\n}"
}'::jsonb,
'[
  {"input": {"strs": ["eat","tea","tan","ate","nat","bat"]}, "expected": [["bat"],["nat","tan"],["ate","eat","tea"]], "isHidden": false},
  {"input": {"strs": [""]}, "expected": [[""]], "isHidden": false},
  {"input": {"strs": ["a"]}, "expected": [["a"]], "isHidden": false},
  {"input": {"strs": ["abc","bca","cab","xyz","zyx","yxz"]}, "expected": [["abc","bca","cab"],["xyz","zyx","yxz"]], "isHidden": true},
  {"input": {"strs": ["",""]}, "expected": [["",""]], "isHidden": true}
]'::jsonb,
'["Amazon", "Google", "Microsoft", "Meta"]'::jsonb,
'["array", "hash-table", "string", "sorting"]'::jsonb,
67.1);

-- Problem 5: Top K Frequent Elements
INSERT INTO problems (title, slug, difficulty, description, constraints, examples, hints, starter_code, test_cases, companies, tags, acceptance_rate) VALUES
('Top K Frequent Elements', 'top-k-frequent-elements', 'Medium',
'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
'• 1 ≤ nums.length ≤ 10⁵
• -10⁴ ≤ nums[i] ≤ 10⁴
• k is in the range [1, the number of unique elements]
• The answer is guaranteed to be unique',
'[
  {
    "input": "nums = [1,1,1,2,2,3], k = 2",
    "output": "[1,2]",
    "explanation": "1 appears 3 times and 2 appears 2 times. These are the top 2."
  },
  {
    "input": "nums = [1], k = 1",
    "output": "[1]",
    "explanation": "Only one element exists."
  }
]'::jsonb,
'[
  "First, count the frequency of each element using a hash map.",
  "Then find the k elements with highest frequencies.",
  "You can use a heap or bucket sort for optimal performance."
]'::jsonb,
'{
  "javascript": "function topKFrequent(nums, k) {\n    // Your code here\n}",
  "python": "def top_k_frequent(nums, k):\n    # Your code here\n    pass",
  "java": "class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        // Your code here\n    }\n}",
  "cpp": "class Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        // Your code here\n    }\n};",
  "c": "int* topKFrequent(int* nums, int numsSize, int k, int* returnSize) {\n    // Your code here\n}"
}'::jsonb,
'[
  {"input": {"nums": [1,1,1,2,2,3], "k": 2}, "expected": [1,2], "isHidden": false},
  {"input": {"nums": [1], "k": 1}, "expected": [1], "isHidden": false},
  {"input": {"nums": [4,1,-1,2,-1,2,3], "k": 2}, "expected": [-1,2], "isHidden": true},
  {"input": {"nums": [1,2,3,4,5], "k": 3}, "expected": [1,2,3], "isHidden": true},
  {"input": {"nums": [5,5,5,5,1,1,1,2,2,3], "k": 2}, "expected": [5,1], "isHidden": true}
]'::jsonb,
'["Amazon", "Meta", "Google", "Apple"]'::jsonb,
'["array", "hash-table", "heap", "sorting"]'::jsonb,
58.9);

-- Continue with more patterns...
-- Due to length, I'll create a summary and provide remaining problems in chunks

DO $$
BEGIN
  RAISE NOTICE '✅ Pattern 1 (Arrays & Hashing): 5 problems seeded!';
  RAISE NOTICE '   Continuing with remaining patterns...';
END $$;
