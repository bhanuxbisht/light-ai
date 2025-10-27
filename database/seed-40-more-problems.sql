-- Seed 40 more problems to reach 50 total
-- Day 2: Complete problem seeding across all 10 patterns

BEGIN;

-- ============================================================================
-- TWO POINTERS PATTERN (5 Problems: #11-15)
-- ============================================================================

-- Problem 11: Two Sum II - Input Array Is Sorted
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Two Sum II - Input Array Is Sorted', 'two-sum-ii', 'Medium', 'Two Pointers', 
'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.',
'[{"input": {"numbers": [2,7,11,15], "target": 9}, "expected": [1,2], "hidden": false}, {"input": {"numbers": [2,3,4], "target": 6}, "expected": [1,3], "hidden": false}, {"input": {"numbers": [-1,0], "target": -1}, "expected": [1,2], "hidden": false}]'::jsonb,
'{"javascript": "function twoSum(numbers, target) {\n  // Your code here\n}", "python": "def two_sum(numbers, target):\n  pass", "java": "class Solution {\n  public int[] twoSum(int[] numbers, int target) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  vector<int> twoSum(vector<int>& numbers, int target) {\n    // Your code here\n  }\n};", "c": "int* twoSum(int* numbers, int numbersSize, int target, int* returnSize) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Microsoft'], ARRAY['array', 'two-pointers'], 59.3);

-- Problem 12: 3Sum
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('3Sum', 'three-sum', 'Medium', 'Two Pointers', 
'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
'[{"input": {"nums": [-1,0,1,2,-1,-4]}, "expected": [[-1,-1,2],[-1,0,1]], "hidden": false}, {"input": {"nums": [0,1,1]}, "expected": [], "hidden": false}, {"input": {"nums": [0,0,0]}, "expected": [[0,0,0]], "hidden": false}]'::jsonb,
'{"javascript": "function threeSum(nums) {\n  // Your code here\n}", "python": "def three_sum(nums):\n  pass", "java": "class Solution {\n  public List<List<Integer>> threeSum(int[] nums) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  vector<vector<int>> threeSum(vector<int>& nums) {\n    // Your code here\n  }\n};", "c": "int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Google', 'Microsoft'], ARRAY['array', 'two-pointers', 'sorting'], 32.8);

-- Problem 13: Container With Most Water
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Container With Most Water', 'container-with-most-water', 'Medium', 'Two Pointers', 
'You are given an integer array height of length n. Find two lines that together with the x-axis form a container, such that the container contains the most water.',
'[{"input": {"height": [1,8,6,2,5,4,8,3,7]}, "expected": 49, "hidden": false}, {"input": {"height": [1,1]}, "expected": 1, "hidden": false}, {"input": {"height": [4,3,2,1,4]}, "expected": 16, "hidden": false}]'::jsonb,
'{"javascript": "function maxArea(height) {\n  // Your code here\n}", "python": "def max_area(height):\n  pass", "java": "class Solution {\n  public int maxArea(int[] height) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  int maxArea(vector<int>& height) {\n    // Your code here\n  }\n};", "c": "int maxArea(int* height, int heightSize) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Google', 'Bloomberg'], ARRAY['array', 'two-pointers', 'greedy'], 54.2);

-- Problem 14: Valid Palindrome
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Valid Palindrome', 'valid-palindrome', 'Easy', 'Two Pointers', 
'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
'[{"input": {"s": "A man, a plan, a canal: Panama"}, "expected": true, "hidden": false}, {"input": {"s": "race a car"}, "expected": false, "hidden": false}, {"input": {"s": " "}, "expected": true, "hidden": false}]'::jsonb,
'{"javascript": "function isPalindrome(s) {\n  // Your code here\n}", "python": "def is_palindrome(s):\n  pass", "java": "class Solution {\n  public boolean isPalindrome(String s) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  bool isPalindrome(string s) {\n    // Your code here\n  }\n};", "c": "bool isPalindrome(char* s) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Meta', 'Microsoft', 'Amazon'], ARRAY['string', 'two-pointers'], 44.1);

-- Problem 15: Remove Duplicates from Sorted Array
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Remove Duplicates from Sorted Array', 'remove-duplicates-sorted-array', 'Easy', 'Two Pointers', 
'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once.',
'[{"input": {"nums": [1,1,2]}, "expected": 2, "hidden": false}, {"input": {"nums": [0,0,1,1,1,2,2,3,3,4]}, "expected": 5, "hidden": false}]'::jsonb,
'{"javascript": "function removeDuplicates(nums) {\n  // Your code here\n}", "python": "def remove_duplicates(nums):\n  pass", "java": "class Solution {\n  public int removeDuplicates(int[] nums) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  int removeDuplicates(vector<int>& nums) {\n    // Your code here\n  }\n};", "c": "int removeDuplicates(int* nums, int numsSize) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Google', 'Microsoft'], ARRAY['array', 'two-pointers'], 51.7);

-- ============================================================================
-- SLIDING WINDOW PATTERN (5 Problems: #16-20)
-- ============================================================================

-- Problem 16: Longest Substring Without Repeating Characters
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Longest Substring Without Repeating Characters', 'longest-substring-without-repeating', 'Medium', 'Sliding Window', 
'Given a string s, find the length of the longest substring without repeating characters.',
'[{"input": {"s": "abcabcbb"}, "expected": 3, "hidden": false}, {"input": {"s": "bbbbb"}, "expected": 1, "hidden": false}, {"input": {"s": "pwwkew"}, "expected": 3, "hidden": false}]'::jsonb,
'{"javascript": "function lengthOfLongestSubstring(s) {\n  // Your code here\n}", "python": "def length_of_longest_substring(s):\n  pass", "java": "class Solution {\n  public int lengthOfLongestSubstring(String s) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  int lengthOfLongestSubstring(string s) {\n    // Your code here\n  }\n};", "c": "int lengthOfLongestSubstring(char* s) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Google', 'Meta', 'Microsoft'], ARRAY['string', 'hash-table', 'sliding-window'], 33.9);

-- Problem 17: Minimum Window Substring
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Minimum Window Substring', 'minimum-window-substring', 'Hard', 'Sliding Window', 
'Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.',
'[{"input": {"s": "ADOBECODEBANC", "t": "ABC"}, "expected": "BANC", "hidden": false}, {"input": {"s": "a", "t": "a"}, "expected": "a", "hidden": false}, {"input": {"s": "a", "t": "aa"}, "expected": "", "hidden": false}]'::jsonb,
'{"javascript": "function minWindow(s, t) {\n  // Your code here\n}", "python": "def min_window(s, t):\n  pass", "java": "class Solution {\n  public String minWindow(String s, String t) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  string minWindow(string s, string t) {\n    // Your code here\n  }\n};", "c": "char* minWindow(char* s, char* t) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Google'], ARRAY['string', 'hash-table', 'sliding-window'], 40.3);

-- Problem 18: Best Time to Buy and Sell Stock II
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Best Time to Buy and Sell Stock II', 'best-time-buy-sell-stock-ii', 'Medium', 'Sliding Window', 
'You are given an integer array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit you can achieve. You may complete as many transactions as you like.',
'[{"input": {"prices": [7,1,5,3,6,4]}, "expected": 7, "hidden": false}, {"input": {"prices": [1,2,3,4,5]}, "expected": 4, "hidden": false}, {"input": {"prices": [7,6,4,3,1]}, "expected": 0, "hidden": false}]'::jsonb,
'{"javascript": "function maxProfit(prices) {\n  // Your code here\n}", "python": "def max_profit(prices):\n  pass", "java": "class Solution {\n  public int maxProfit(int[] prices) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  int maxProfit(vector<int>& prices) {\n    // Your code here\n  }\n};", "c": "int maxProfit(int* prices, int pricesSize) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Bloomberg'], ARRAY['array', 'greedy', 'dynamic-programming'], 63.1);

-- Problem 19: Longest Repeating Character Replacement
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Longest Repeating Character Replacement', 'longest-repeating-character-replacement', 'Medium', 'Sliding Window', 
'You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.',
'[{"input": {"s": "ABAB", "k": 2}, "expected": 4, "hidden": false}, {"input": {"s": "AABABBA", "k": 1}, "expected": 4, "hidden": false}]'::jsonb,
'{"javascript": "function characterReplacement(s, k) {\n  // Your code here\n}", "python": "def character_replacement(s, k):\n  pass", "java": "class Solution {\n  public int characterReplacement(String s, int k) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  int characterReplacement(string s, int k) {\n    // Your code here\n  }\n};", "c": "int characterReplacement(char* s, int k) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta'], ARRAY['string', 'hash-table', 'sliding-window'], 52.4);

-- Problem 20: Permutation in String
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Permutation in String', 'permutation-in-string', 'Medium', 'Sliding Window', 
'Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.',
'[{"input": {"s1": "ab", "s2": "eidbaooo"}, "expected": true, "hidden": false}, {"input": {"s1": "ab", "s2": "eidboaoo"}, "expected": false, "hidden": false}]'::jsonb,
'{"javascript": "function checkInclusion(s1, s2) {\n  // Your code here\n}", "python": "def check_inclusion(s1, s2):\n  pass", "java": "class Solution {\n  public boolean checkInclusion(String s1, String s2) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  bool checkInclusion(string s1, string s2) {\n    // Your code here\n  }\n};", "c": "bool checkInclusion(char* s1, char* s2) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Microsoft', 'Meta'], ARRAY['string', 'hash-table', 'sliding-window'], 44.7);

-- ============================================================================
-- STACK PATTERN (5 Problems: #21-25)
-- ============================================================================

-- Problem 21: Min Stack
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Min Stack', 'min-stack', 'Medium', 'Stack', 
'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
'[{"input": {"operations": ["MinStack","push","push","push","getMin","pop","top","getMin"], "values": [[],[-2],[0],[-3],[],[],[],[]]}, "expected": [null,null,null,null,-3,null,0,-2], "hidden": false}]'::jsonb,
'{"javascript": "class MinStack {\n  constructor() {\n    // Your code here\n  }\n  push(val) {}\n  pop() {}\n  top() {}\n  getMin() {}\n}", "python": "class MinStack:\n  def __init__(self):\n    pass\n  def push(self, val):\n    pass\n  def pop(self):\n    pass\n  def top(self):\n    pass\n  def getMin(self):\n    pass", "java": "class MinStack {\n  public MinStack() {\n    // Your code here\n  }\n  public void push(int val) {}\n  public void pop() {}\n  public int top() {}\n  public int getMin() {}\n}", "cpp": "class MinStack {\npublic:\n  MinStack() {\n    // Your code here\n  }\n  void push(int val) {}\n  void pop() {}\n  int top() {}\n  int getMin() {}\n};", "c": "typedef struct {\n  // Your code here\n} MinStack;\nMinStack* minStackCreate() {}\nvoid minStackPush(MinStack* obj, int val) {}\nvoid minStackPop(MinStack* obj) {}\nint minStackTop(MinStack* obj) {}\nint minStackGetMin(MinStack* obj) {}"}'::jsonb,
ARRAY['Amazon', 'Bloomberg', 'Google'], ARRAY['stack', 'design'], 52.9);

-- Problem 22: Evaluate Reverse Polish Notation
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Evaluate Reverse Polish Notation', 'evaluate-reverse-polish-notation', 'Medium', 'Stack', 
'You are given an array of strings tokens that represents an arithmetic expression in Reverse Polish Notation. Evaluate the expression and return an integer.',
'[{"input": {"tokens": ["2","1","+","3","*"]}, "expected": 9, "hidden": false}, {"input": {"tokens": ["4","13","5","/","+"]}, "expected": 6, "hidden": false}]'::jsonb,
'{"javascript": "function evalRPN(tokens) {\n  // Your code here\n}", "python": "def eval_rpn(tokens):\n  pass", "java": "class Solution {\n  public int evalRPN(String[] tokens) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  int evalRPN(vector<string>& tokens) {\n    // Your code here\n  }\n};", "c": "int evalRPN(char** tokens, int tokensSize) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'LinkedIn'], ARRAY['array', 'math', 'stack'], 46.3);

-- Problem 23: Daily Temperatures
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Daily Temperatures', 'daily-temperatures', 'Medium', 'Stack', 
'Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.',
'[{"input": {"temperatures": [73,74,75,71,69,72,76,73]}, "expected": [1,1,4,2,1,1,0,0], "hidden": false}, {"input": {"temperatures": [30,40,50,60]}, "expected": [1,1,1,0], "hidden": false}]'::jsonb,
'{"javascript": "function dailyTemperatures(temperatures) {\n  // Your code here\n}", "python": "def daily_temperatures(temperatures):\n  pass", "java": "class Solution {\n  public int[] dailyTemperatures(int[] temperatures) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  vector<int> dailyTemperatures(vector<int>& temperatures) {\n    // Your code here\n  }\n};", "c": "int* dailyTemperatures(int* temperatures, int temperaturesSize, int* returnSize) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Google'], ARRAY['array', 'stack', 'monotonic-stack'], 66.2);

-- Problem 24: Generate Parentheses
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Generate Parentheses', 'generate-parentheses', 'Medium', 'Stack', 
'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
'[{"input": {"n": 3}, "expected": ["((()))","(()())","(())()","()(())","()()()"], "hidden": false}, {"input": {"n": 1}, "expected": ["()"], "hidden": false}]'::jsonb,
'{"javascript": "function generateParenthesis(n) {\n  // Your code here\n}", "python": "def generate_parenthesis(n):\n  pass", "java": "class Solution {\n  public List<String> generateParenthesis(int n) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  vector<string> generateParenthesis(int n) {\n    // Your code here\n  }\n};", "c": "char** generateParenthesis(int n, int* returnSize) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Google'], ARRAY['string', 'dynamic-programming', 'backtracking'], 72.1);

-- Problem 25: Largest Rectangle in Histogram
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Largest Rectangle in Histogram', 'largest-rectangle-histogram', 'Hard', 'Stack', 
'Given an array of integers heights representing the histogram bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.',
'[{"input": {"heights": [2,1,5,6,2,3]}, "expected": 10, "hidden": false}, {"input": {"heights": [2,4]}, "expected": 4, "hidden": false}]'::jsonb,
'{"javascript": "function largestRectangleArea(heights) {\n  // Your code here\n}", "python": "def largest_rectangle_area(heights):\n  pass", "java": "class Solution {\n  public int largestRectangleArea(int[] heights) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  int largestRectangleArea(vector<int>& heights) {\n    // Your code here\n  }\n};", "c": "int largestRectangleArea(int* heights, int heightsSize) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Google', 'Meta'], ARRAY['array', 'stack', 'monotonic-stack'], 41.8);

COMMIT;

-- Link new problems to patterns
INSERT INTO problem_patterns (problem_id, pattern_id)
SELECT p.id, pat.id
FROM problems p
JOIN dsa_patterns pat ON pat.slug = 'two-pointers'
WHERE p.slug IN ('two-sum-ii', 'three-sum', 'container-with-most-water', 'valid-palindrome', 'remove-duplicates-sorted-array')
UNION ALL
SELECT p.id, pat.id
FROM problems p
JOIN dsa_patterns pat ON pat.slug = 'sliding-window'
WHERE p.slug IN ('longest-substring-without-repeating', 'minimum-window-substring', 'best-time-buy-sell-stock-ii', 'longest-repeating-character-replacement', 'permutation-in-string')
UNION ALL
SELECT p.id, pat.id
FROM problems p
JOIN dsa_patterns pat ON pat.slug = 'stack'
WHERE p.slug IN ('min-stack', 'evaluate-reverse-polish-notation', 'daily-temperatures', 'generate-parentheses', 'largest-rectangle-histogram');
