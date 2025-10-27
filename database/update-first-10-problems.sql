-- Update existing 10 problems to add Java, C++, C starter code
-- Problems: Two Sum, Valid Parentheses, Merge Two Sorted Lists, Binary Search, Maximum Subarray,
-- Contains Duplicate, Best Time to Buy and Sell Stock, Valid Anagram, Reverse Linked List, Climbing Stairs

BEGIN;

-- Update Two Sum
UPDATE problems SET starter_code = '{
  "javascript": "function twoSum(nums, target) {\n  // Your code here\n}",
  "python": "def two_sum(nums, target):\n  pass",
  "java": "class Solution {\n  public int[] twoSum(int[] nums, int target) {\n    // Your code here\n  }\n}",
  "cpp": "class Solution {\npublic:\n  vector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n  }\n};",
  "c": "int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n  // Your code here\n}"
}'::jsonb WHERE slug = 'two-sum';

-- Update Valid Parentheses
UPDATE problems SET starter_code = '{
  "javascript": "function isValid(s) {\n  // Your code here\n}",
  "python": "def is_valid(s):\n  pass",
  "java": "class Solution {\n  public boolean isValid(String s) {\n    // Your code here\n  }\n}",
  "cpp": "class Solution {\npublic:\n  bool isValid(string s) {\n    // Your code here\n  }\n};",
  "c": "bool isValid(char* s) {\n  // Your code here\n}"
}'::jsonb WHERE slug = 'valid-parentheses';

-- Update Merge Two Sorted Lists
UPDATE problems SET starter_code = '{
  "javascript": "function mergeTwoLists(list1, list2) {\n  // Your code here\n}",
  "python": "def merge_two_lists(list1, list2):\n  pass",
  "java": "class Solution {\n  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    // Your code here\n  }\n}",
  "cpp": "class Solution {\npublic:\n  ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n    // Your code here\n  }\n};",
  "c": "struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {\n  // Your code here\n}"
}'::jsonb WHERE slug = 'merge-two-sorted-lists';

-- Update Binary Search
UPDATE problems SET starter_code = '{
  "javascript": "function search(nums, target) {\n  // Your code here\n}",
  "python": "def search(nums, target):\n  pass",
  "java": "class Solution {\n  public int search(int[] nums, int target) {\n    // Your code here\n  }\n}",
  "cpp": "class Solution {\npublic:\n  int search(vector<int>& nums, int target) {\n    // Your code here\n  }\n};",
  "c": "int search(int* nums, int numsSize, int target) {\n  // Your code here\n}"
}'::jsonb WHERE slug = 'binary-search';

-- Update Maximum Subarray
UPDATE problems SET starter_code = '{
  "javascript": "function maxSubArray(nums) {\n  // Your code here\n}",
  "python": "def max_sub_array(nums):\n  pass",
  "java": "class Solution {\n  public int maxSubArray(int[] nums) {\n    // Your code here\n  }\n}",
  "cpp": "class Solution {\npublic:\n  int maxSubArray(vector<int>& nums) {\n    // Your code here\n  }\n};",
  "c": "int maxSubArray(int* nums, int numsSize) {\n  // Your code here\n}"
}'::jsonb WHERE slug = 'maximum-subarray';

-- Update Contains Duplicate
UPDATE problems SET starter_code = '{
  "javascript": "function containsDuplicate(nums) {\n  // Your code here\n}",
  "python": "def contains_duplicate(nums):\n  pass",
  "java": "class Solution {\n  public boolean containsDuplicate(int[] nums) {\n    // Your code here\n  }\n}",
  "cpp": "class Solution {\npublic:\n  bool containsDuplicate(vector<int>& nums) {\n    // Your code here\n  }\n};",
  "c": "bool containsDuplicate(int* nums, int numsSize) {\n  // Your code here\n}"
}'::jsonb WHERE slug = 'contains-duplicate';

-- Update Best Time to Buy and Sell Stock
UPDATE problems SET starter_code = '{
  "javascript": "function maxProfit(prices) {\n  // Your code here\n}",
  "python": "def max_profit(prices):\n  pass",
  "java": "class Solution {\n  public int maxProfit(int[] prices) {\n    // Your code here\n  }\n}",
  "cpp": "class Solution {\npublic:\n  int maxProfit(vector<int>& prices) {\n    // Your code here\n  }\n};",
  "c": "int maxProfit(int* prices, int pricesSize) {\n  // Your code here\n}"
}'::jsonb WHERE slug = 'best-time-buy-sell-stock';

-- Update Valid Anagram
UPDATE problems SET starter_code = '{
  "javascript": "function isAnagram(s, t) {\n  // Your code here\n}",
  "python": "def is_anagram(s, t):\n  pass",
  "java": "class Solution {\n  public boolean isAnagram(String s, String t) {\n    // Your code here\n  }\n}",
  "cpp": "class Solution {\npublic:\n  bool isAnagram(string s, string t) {\n    // Your code here\n  }\n};",
  "c": "bool isAnagram(char* s, char* t) {\n  // Your code here\n}"
}'::jsonb WHERE slug = 'valid-anagram';

-- Update Reverse Linked List
UPDATE problems SET starter_code = '{
  "javascript": "function reverseList(head) {\n  // Your code here\n}",
  "python": "def reverse_list(head):\n  pass",
  "java": "class Solution {\n  public ListNode reverseList(ListNode head) {\n    // Your code here\n  }\n}",
  "cpp": "class Solution {\npublic:\n  ListNode* reverseList(ListNode* head) {\n    // Your code here\n  }\n};",
  "c": "struct ListNode* reverseList(struct ListNode* head) {\n  // Your code here\n}"
}'::jsonb WHERE slug = 'reverse-linked-list';

-- Update Climbing Stairs
UPDATE problems SET starter_code = '{
  "javascript": "function climbStairs(n) {\n  // Your code here\n}",
  "python": "def climb_stairs(n):\n  pass",
  "java": "class Solution {\n  public int climbStairs(int n) {\n    // Your code here\n  }\n}",
  "cpp": "class Solution {\npublic:\n  int climbStairs(int n) {\n    // Your code here\n  }\n};",
  "c": "int climbStairs(int n) {\n  // Your code here\n}"
}'::jsonb WHERE slug = 'climbing-stairs';

COMMIT;
