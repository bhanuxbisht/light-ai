-- Seed 25 more problems (Problems #26-50)
-- Covers: Trees, Graphs, Dynamic Programming, Heap, Linked Lists

BEGIN;

-- ============================================================================
-- BINARY SEARCH PATTERN (4 Problems: #26-29)
-- ============================================================================

-- Problem 26: Search in Rotated Sorted Array
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Search in Rotated Sorted Array', 'search-rotated-sorted-array', 'Medium', 'Binary Search', 
'There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.',
'[{"input": {"nums": [4,5,6,7,0,1,2], "target": 0}, "expected": 4, "hidden": false}, {"input": {"nums": [4,5,6,7,0,1,2], "target": 3}, "expected": -1, "hidden": false}, {"input": {"nums": [1], "target": 0}, "expected": -1, "hidden": false}]'::jsonb,
'{"javascript": "function search(nums, target) {\n  // Your code here\n}", "python": "def search(nums, target):\n  pass", "java": "class Solution {\n  public int search(int[] nums, int target) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  int search(vector<int>& nums, int target) {\n    // Your code here\n  }\n};", "c": "int search(int* nums, int numsSize, int target) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Microsoft'], ARRAY['array', 'binary-search'], 39.1);

-- Problem 27: Find Minimum in Rotated Sorted Array
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Find Minimum in Rotated Sorted Array', 'find-minimum-rotated-sorted-array', 'Medium', 'Binary Search', 
'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array.',
'[{"input": {"nums": [3,4,5,1,2]}, "expected": 1, "hidden": false}, {"input": {"nums": [4,5,6,7,0,1,2]}, "expected": 0, "hidden": false}, {"input": {"nums": [11,13,15,17]}, "expected": 11, "hidden": false}]'::jsonb,
'{"javascript": "function findMin(nums) {\n  // Your code here\n}", "python": "def find_min(nums):\n  pass", "java": "class Solution {\n  public int findMin(int[] nums) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  int findMin(vector<int>& nums) {\n    // Your code here\n  }\n};", "c": "int findMin(int* nums, int numsSize) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Microsoft', 'Bloomberg'], ARRAY['array', 'binary-search'], 49.2);

-- Problem 28: Search a 2D Matrix
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Search a 2D Matrix', 'search-2d-matrix', 'Medium', 'Binary Search', 
'You are given an m x n integer matrix with the following two properties: Each row is sorted in non-decreasing order. The first integer of each row is greater than the last integer of the previous row.',
'[{"input": {"matrix": [[1,3,5,7],[10,11,16,20],[23,30,34,60]], "target": 3}, "expected": true, "hidden": false}, {"input": {"matrix": [[1,3,5,7],[10,11,16,20],[23,30,34,60]], "target": 13}, "expected": false, "hidden": false}]'::jsonb,
'{"javascript": "function searchMatrix(matrix, target) {\n  // Your code here\n}", "python": "def search_matrix(matrix, target):\n  pass", "java": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  bool searchMatrix(vector<vector<int>>& matrix, int target) {\n    // Your code here\n  }\n};", "c": "bool searchMatrix(int** matrix, int matrixSize, int* matrixColSize, int target) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Microsoft'], ARRAY['array', 'binary-search', 'matrix'], 48.6);

-- Problem 29: Koko Eating Bananas
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Koko Eating Bananas', 'koko-eating-bananas', 'Medium', 'Binary Search', 
'Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. Return the minimum integer k such that she can eat all the bananas within h hours.',
'[{"input": {"piles": [3,6,7,11], "h": 8}, "expected": 4, "hidden": false}, {"input": {"piles": [30,11,23,4,20], "h": 5}, "expected": 30, "hidden": false}, {"input": {"piles": [30,11,23,4,20], "h": 6}, "expected": 23, "hidden": false}]'::jsonb,
'{"javascript": "function minEatingSpeed(piles, h) {\n  // Your code here\n}", "python": "def min_eating_speed(piles, h):\n  pass", "java": "class Solution {\n  public int minEatingSpeed(int[] piles, int h) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  int minEatingSpeed(vector<int>& piles, int h) {\n    // Your code here\n  }\n};", "c": "int minEatingSpeed(int* piles, int pilesSize, int h) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Google'], ARRAY['array', 'binary-search'], 55.3);

-- ============================================================================
-- LINKED LIST PATTERN (5 Problems: #30-34)
-- ============================================================================

-- Problem 30: Linked List Cycle
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Linked List Cycle', 'linked-list-cycle', 'Easy', 'Linked List', 
'Given head, the head of a linked list, determine if the linked list has a cycle in it.',
'[{"input": {"head": [3,2,0,-4], "pos": 1}, "expected": true, "hidden": false}, {"input": {"head": [1,2], "pos": 0}, "expected": true, "hidden": false}, {"input": {"head": [1], "pos": -1}, "expected": false, "hidden": false}]'::jsonb,
'{"javascript": "function hasCycle(head) {\n  // Your code here\n}", "python": "def has_cycle(head):\n  pass", "java": "class Solution {\n  public boolean hasCycle(ListNode head) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  bool hasCycle(ListNode *head) {\n    // Your code here\n  }\n};", "c": "bool hasCycle(struct ListNode *head) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Microsoft', 'Meta'], ARRAY['linked-list', 'two-pointers', 'hash-table'], 48.1);

-- Problem 31: Remove Nth Node From End of List
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Remove Nth Node From End of List', 'remove-nth-node-from-end', 'Medium', 'Linked List', 
'Given the head of a linked list, remove the nth node from the end of the list and return its head.',
'[{"input": {"head": [1,2,3,4,5], "n": 2}, "expected": [1,2,3,5], "hidden": false}, {"input": {"head": [1], "n": 1}, "expected": [], "hidden": false}, {"input": {"head": [1,2], "n": 1}, "expected": [1], "hidden": false}]'::jsonb,
'{"javascript": "function removeNthFromEnd(head, n) {\n  // Your code here\n}", "python": "def remove_nth_from_end(head, n):\n  pass", "java": "class Solution {\n  public ListNode removeNthFromEnd(ListNode head, int n) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  ListNode* removeNthFromEnd(ListNode* head, int n) {\n    // Your code here\n  }\n};", "c": "struct ListNode* removeNthFromEnd(struct ListNode* head, int n) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Google'], ARRAY['linked-list', 'two-pointers'], 42.3);

-- Problem 32: Reorder List
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Reorder List', 'reorder-list', 'Medium', 'Linked List', 
'You are given the head of a singly linked-list. The list can be represented as: L0 → L1 → … → Ln - 1 → Ln. Reorder the list to be on the following form: L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …',
'[{"input": {"head": [1,2,3,4]}, "expected": [1,4,2,3], "hidden": false}, {"input": {"head": [1,2,3,4,5]}, "expected": [1,5,2,4,3], "hidden": false}]'::jsonb,
'{"javascript": "function reorderList(head) {\n  // Your code here\n}", "python": "def reorder_list(head):\n  pass", "java": "class Solution {\n  public void reorderList(ListNode head) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  void reorderList(ListNode* head) {\n    // Your code here\n  }\n};", "c": "void reorderList(struct ListNode* head) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Microsoft'], ARRAY['linked-list', 'two-pointers', 'stack'], 54.7);

-- Problem 33: Copy List with Random Pointer
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Copy List with Random Pointer', 'copy-list-random-pointer', 'Medium', 'Linked List', 
'A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null. Construct a deep copy of the list.',
'[{"input": {"head": [[7,null],[13,0],[11,4],[10,2],[1,0]]}, "expected": [[7,null],[13,0],[11,4],[10,2],[1,0]], "hidden": false}]'::jsonb,
'{"javascript": "function copyRandomList(head) {\n  // Your code here\n}", "python": "def copy_random_list(head):\n  pass", "java": "class Solution {\n  public Node copyRandomList(Node head) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  Node* copyRandomList(Node* head) {\n    // Your code here\n  }\n};", "c": "struct Node* copyRandomList(struct Node* head) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Microsoft'], ARRAY['linked-list', 'hash-table'], 51.2);

-- Problem 34: Add Two Numbers
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Add Two Numbers', 'add-two-numbers', 'Medium', 'Linked List', 
'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.',
'[{"input": {"l1": [2,4,3], "l2": [5,6,4]}, "expected": [7,0,8], "hidden": false}, {"input": {"l1": [0], "l2": [0]}, "expected": [0], "hidden": false}, {"input": {"l1": [9,9,9,9,9,9,9], "l2": [9,9,9,9]}, "expected": [8,9,9,9,0,0,0,1], "hidden": false}]'::jsonb,
'{"javascript": "function addTwoNumbers(l1, l2) {\n  // Your code here\n}", "python": "def add_two_numbers(l1, l2):\n  pass", "java": "class Solution {\n  public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n    // Your code here\n  }\n};", "c": "struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Microsoft', 'Apple'], ARRAY['linked-list', 'math', 'recursion'], 41.5);

-- ============================================================================
-- TREES PATTERN (5 Problems: #35-39)
-- ============================================================================

-- Problem 35: Maximum Depth of Binary Tree
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Maximum Depth of Binary Tree', 'maximum-depth-binary-tree', 'Easy', 'Trees', 
'Given the root of a binary tree, return its maximum depth. A binary tree maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
'[{"input": {"root": [3,9,20,null,null,15,7]}, "expected": 3, "hidden": false}, {"input": {"root": [1,null,2]}, "expected": 2, "hidden": false}]'::jsonb,
'{"javascript": "function maxDepth(root) {\n  // Your code here\n}", "python": "def max_depth(root):\n  pass", "java": "class Solution {\n  public int maxDepth(TreeNode root) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  int maxDepth(TreeNode* root) {\n    // Your code here\n  }\n};", "c": "int maxDepth(struct TreeNode* root) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Microsoft', 'LinkedIn'], ARRAY['tree', 'depth-first-search', 'breadth-first-search'], 74.8);

-- Problem 36: Invert Binary Tree
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Invert Binary Tree', 'invert-binary-tree', 'Easy', 'Trees', 
'Given the root of a binary tree, invert the tree, and return its root.',
'[{"input": {"root": [4,2,7,1,3,6,9]}, "expected": [4,7,2,9,6,3,1], "hidden": false}, {"input": {"root": [2,1,3]}, "expected": [2,3,1], "hidden": false}, {"input": {"root": []}, "expected": [], "hidden": false}]'::jsonb,
'{"javascript": "function invertTree(root) {\n  // Your code here\n}", "python": "def invert_tree(root):\n  pass", "java": "class Solution {\n  public TreeNode invertTree(TreeNode root) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  TreeNode* invertTree(TreeNode* root) {\n    // Your code here\n  }\n};", "c": "struct TreeNode* invertTree(struct TreeNode* root) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Google', 'Amazon', 'Meta'], ARRAY['tree', 'depth-first-search', 'breadth-first-search'], 75.2);

-- Problem 37: Validate Binary Search Tree
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Validate Binary Search Tree', 'validate-binary-search-tree', 'Medium', 'Trees', 
'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
'[{"input": {"root": [2,1,3]}, "expected": true, "hidden": false}, {"input": {"root": [5,1,4,null,null,3,6]}, "expected": false, "hidden": false}]'::jsonb,
'{"javascript": "function isValidBST(root) {\n  // Your code here\n}", "python": "def is_valid_bst(root):\n  pass", "java": "class Solution {\n  public boolean isValidBST(TreeNode root) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  bool isValidBST(TreeNode* root) {\n    // Your code here\n  }\n};", "c": "bool isValidBST(struct TreeNode* root) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Microsoft', 'Bloomberg'], ARRAY['tree', 'depth-first-search', 'binary-search-tree'], 32.1);

-- Problem 38: Lowest Common Ancestor of BST
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Lowest Common Ancestor of a Binary Search Tree', 'lowest-common-ancestor-bst', 'Medium', 'Trees', 
'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.',
'[{"input": {"root": [6,2,8,0,4,7,9,null,null,3,5], "p": 2, "q": 8}, "expected": 6, "hidden": false}, {"input": {"root": [6,2,8,0,4,7,9,null,null,3,5], "p": 2, "q": 4}, "expected": 2, "hidden": false}]'::jsonb,
'{"javascript": "function lowestCommonAncestor(root, p, q) {\n  // Your code here\n}", "python": "def lowest_common_ancestor(root, p, q):\n  pass", "java": "class Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    // Your code here\n  }\n};", "c": "struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Microsoft'], ARRAY['tree', 'depth-first-search', 'binary-search-tree'], 62.4);

-- Problem 39: Binary Tree Level Order Traversal
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Binary Tree Level Order Traversal', 'binary-tree-level-order-traversal', 'Medium', 'Trees', 
'Given the root of a binary tree, return the level order traversal of its nodes values. (i.e., from left to right, level by level).',
'[{"input": {"root": [3,9,20,null,null,15,7]}, "expected": [[3],[9,20],[15,7]], "hidden": false}, {"input": {"root": [1]}, "expected": [[1]], "hidden": false}, {"input": {"root": []}, "expected": [], "hidden": false}]'::jsonb,
'{"javascript": "function levelOrder(root) {\n  // Your code here\n}", "python": "def level_order(root):\n  pass", "java": "class Solution {\n  public List<List<Integer>> levelOrder(TreeNode root) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  vector<vector<int>> levelOrder(TreeNode* root) {\n    // Your code here\n  }\n};", "c": "int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Microsoft', 'LinkedIn'], ARRAY['tree', 'breadth-first-search'], 65.7);

-- ============================================================================
-- GRAPHS PATTERN (5 Problems: #40-44)
-- ============================================================================

-- Problem 40: Number of Islands
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Number of Islands', 'number-of-islands', 'Medium', 'Graphs', 
'Given an m x n 2D binary grid which represents a map of 1s (land) and 0s (water), return the number of islands.',
'[{"input": {"grid": [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]}, "expected": 1, "hidden": false}, {"input": {"grid": [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]}, "expected": 3, "hidden": false}]'::jsonb,
'{"javascript": "function numIslands(grid) {\n  // Your code here\n}", "python": "def num_islands(grid):\n  pass", "java": "class Solution {\n  public int numIslands(char[][] grid) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  int numIslands(vector<vector<char>>& grid) {\n    // Your code here\n  }\n};", "c": "int numIslands(char** grid, int gridSize, int* gridColSize) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Google', 'Microsoft'], ARRAY['array', 'depth-first-search', 'breadth-first-search', 'union-find', 'matrix'], 58.3);

-- Problem 41: Clone Graph
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Clone Graph', 'clone-graph', 'Medium', 'Graphs', 
'Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.',
'[{"input": {"adjList": [[2,4],[1,3],[2,4],[1,3]]}, "expected": [[2,4],[1,3],[2,4],[1,3]], "hidden": false}, {"input": {"adjList": [[]]}, "expected": [[]], "hidden": false}, {"input": {"adjList": []}, "expected": [], "hidden": false}]'::jsonb,
'{"javascript": "function cloneGraph(node) {\n  // Your code here\n}", "python": "def clone_graph(node):\n  pass", "java": "class Solution {\n  public Node cloneGraph(Node node) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  Node* cloneGraph(Node* node) {\n    // Your code here\n  }\n};", "c": "struct Node* cloneGraph(struct Node* s) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Google'], ARRAY['hash-table', 'depth-first-search', 'breadth-first-search', 'graph'], 52.9);

-- Problem 42: Course Schedule
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Course Schedule', 'course-schedule', 'Medium', 'Graphs', 
'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses.',
'[{"input": {"numCourses": 2, "prerequisites": [[1,0]]}, "expected": true, "hidden": false}, {"input": {"numCourses": 2, "prerequisites": [[1,0],[0,1]]}, "expected": false, "hidden": false}]'::jsonb,
'{"javascript": "function canFinish(numCourses, prerequisites) {\n  // Your code here\n}", "python": "def can_finish(numCourses, prerequisites):\n  pass", "java": "class Solution {\n  public boolean canFinish(int numCourses, int[][] prerequisites) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n    // Your code here\n  }\n};", "c": "bool canFinish(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Google', 'Microsoft'], ARRAY['depth-first-search', 'breadth-first-search', 'graph', 'topological-sort'], 46.8);

-- Problem 43: Pacific Atlantic Water Flow
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Pacific Atlantic Water Flow', 'pacific-atlantic-water-flow', 'Medium', 'Graphs', 
'There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. Given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c), return a list of grid coordinates where water can flow to both the Pacific and Atlantic oceans.',
'[{"input": {"heights": [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]}, "expected": [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]], "hidden": false}]'::jsonb,
'{"javascript": "function pacificAtlantic(heights) {\n  // Your code here\n}", "python": "def pacific_atlantic(heights):\n  pass", "java": "class Solution {\n  public List<List<Integer>> pacificAtlantic(int[][] heights) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {\n    // Your code here\n  }\n};", "c": "int** pacificAtlantic(int** heights, int heightsSize, int* heightsColSize, int* returnSize, int** returnColumnSizes) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Google', 'Meta'], ARRAY['array', 'depth-first-search', 'breadth-first-search', 'matrix'], 54.1);

-- Problem 44: Graph Valid Tree
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Graph Valid Tree', 'graph-valid-tree', 'Medium', 'Graphs', 
'Given n nodes labeled from 0 to n - 1 and a list of undirected edges, write a function to check whether these edges make up a valid tree.',
'[{"input": {"n": 5, "edges": [[0,1],[0,2],[0,3],[1,4]]}, "expected": true, "hidden": false}, {"input": {"n": 5, "edges": [[0,1],[1,2],[2,3],[1,3],[1,4]]}, "expected": false, "hidden": false}]'::jsonb,
'{"javascript": "function validTree(n, edges) {\n  // Your code here\n}", "python": "def valid_tree(n, edges):\n  pass", "java": "class Solution {\n  public boolean validTree(int n, int[][] edges) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  bool validTree(int n, vector<vector<int>>& edges) {\n    // Your code here\n  }\n};", "c": "bool validTree(int n, int** edges, int edgesSize, int* edgesColSize) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Google'], ARRAY['depth-first-search', 'breadth-first-search', 'union-find', 'graph'], 46.2);

-- ============================================================================
-- DYNAMIC PROGRAMMING PATTERN (3 Problems: #45-47)
-- ============================================================================

-- Problem 45: House Robber
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('House Robber', 'house-robber', 'Medium', 'Dynamic Programming', 
'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected.',
'[{"input": {"nums": [1,2,3,1]}, "expected": 4, "hidden": false}, {"input": {"nums": [2,7,9,3,1]}, "expected": 12, "hidden": false}]'::jsonb,
'{"javascript": "function rob(nums) {\n  // Your code here\n}", "python": "def rob(nums):\n  pass", "java": "class Solution {\n  public int rob(int[] nums) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  int rob(vector<int>& nums) {\n    // Your code here\n  }\n};", "c": "int rob(int* nums, int numsSize) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Google', 'Meta'], ARRAY['array', 'dynamic-programming'], 49.3);

-- Problem 46: Coin Change
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Coin Change', 'coin-change', 'Medium', 'Dynamic Programming', 
'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.',
'[{"input": {"coins": [1,2,5], "amount": 11}, "expected": 3, "hidden": false}, {"input": {"coins": [2], "amount": 3}, "expected": -1, "hidden": false}, {"input": {"coins": [1], "amount": 0}, "expected": 0, "hidden": false}]'::jsonb,
'{"javascript": "function coinChange(coins, amount) {\n  // Your code here\n}", "python": "def coin_change(coins, amount):\n  pass", "java": "class Solution {\n  public int coinChange(int[] coins, int amount) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  int coinChange(vector<int>& coins, int amount) {\n    // Your code here\n  }\n};", "c": "int coinChange(int* coins, int coinsSize, int amount) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Google'], ARRAY['array', 'dynamic-programming', 'breadth-first-search'], 43.2);

-- Problem 47: Longest Increasing Subsequence
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Longest Increasing Subsequence', 'longest-increasing-subsequence', 'Medium', 'Dynamic Programming', 
'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
'[{"input": {"nums": [10,9,2,5,3,7,101,18]}, "expected": 4, "hidden": false}, {"input": {"nums": [0,1,0,3,2,3]}, "expected": 4, "hidden": false}, {"input": {"nums": [7,7,7,7,7,7,7]}, "expected": 1, "hidden": false}]'::jsonb,
'{"javascript": "function lengthOfLIS(nums) {\n  // Your code here\n}", "python": "def length_of_lis(nums):\n  pass", "java": "class Solution {\n  public int lengthOfLIS(int[] nums) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  int lengthOfLIS(vector<int>& nums) {\n    // Your code here\n  }\n};", "c": "int lengthOfLIS(int* nums, int numsSize) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Microsoft', 'Meta'], ARRAY['array', 'binary-search', 'dynamic-programming'], 52.8);

-- ============================================================================
-- HEAP/PRIORITY QUEUE PATTERN (3 Problems: #48-50)
-- ============================================================================

-- Problem 48: Kth Largest Element in Array
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Kth Largest Element in an Array', 'kth-largest-element', 'Medium', 'Heap/Priority Queue', 
'Given an integer array nums and an integer k, return the kth largest element in the array.',
'[{"input": {"nums": [3,2,1,5,6,4], "k": 2}, "expected": 5, "hidden": false}, {"input": {"nums": [3,2,3,1,2,4,5,5,6], "k": 4}, "expected": 4, "hidden": false}]'::jsonb,
'{"javascript": "function findKthLargest(nums, k) {\n  // Your code here\n}", "python": "def find_kth_largest(nums, k):\n  pass", "java": "class Solution {\n  public int findKthLargest(int[] nums, int k) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  int findKthLargest(vector<int>& nums, int k) {\n    // Your code here\n  }\n};", "c": "int findKthLargest(int* nums, int numsSize, int k) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Apple', 'Microsoft'], ARRAY['array', 'divide-and-conquer', 'sorting', 'heap'], 66.4);

-- Problem 49: Top K Frequent Elements
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Top K Frequent Elements', 'top-k-frequent-elements', 'Medium', 'Heap/Priority Queue', 
'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
'[{"input": {"nums": [1,1,1,2,2,3], "k": 2}, "expected": [1,2], "hidden": false}, {"input": {"nums": [1], "k": 1}, "expected": [1], "hidden": false}]'::jsonb,
'{"javascript": "function topKFrequent(nums, k) {\n  // Your code here\n}", "python": "def top_k_frequent(nums, k):\n  pass", "java": "class Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  vector<int> topKFrequent(vector<int>& nums, int k) {\n    // Your code here\n  }\n};", "c": "int* topKFrequent(int* nums, int numsSize, int k, int* returnSize) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Yelp'], ARRAY['array', 'hash-table', 'divide-and-conquer', 'sorting', 'heap'], 64.1);

-- Problem 50: Merge K Sorted Lists
INSERT INTO problems (title, slug, difficulty, category, description, test_cases, starter_code, companies, tags, acceptance_rate) VALUES
('Merge k Sorted Lists', 'merge-k-sorted-lists', 'Hard', 'Heap/Priority Queue', 
'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
'[{"input": {"lists": [[1,4,5],[1,3,4],[2,6]]}, "expected": [1,1,2,3,4,4,5,6], "hidden": false}, {"input": {"lists": []}, "expected": [], "hidden": false}, {"input": {"lists": [[]]}, "expected": [], "hidden": false}]'::jsonb,
'{"javascript": "function mergeKLists(lists) {\n  // Your code here\n}", "python": "def merge_k_lists(lists):\n  pass", "java": "class Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    // Your code here\n  }\n}", "cpp": "class Solution {\npublic:\n  ListNode* mergeKLists(vector<ListNode*>& lists) {\n    // Your code here\n  }\n};", "c": "struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {\n  // Your code here\n}"}'::jsonb,
ARRAY['Amazon', 'Meta', 'Microsoft', 'Google'], ARRAY['linked-list', 'divide-and-conquer', 'heap', 'merge-sort'], 51.6);

COMMIT;

-- Link problems to patterns
INSERT INTO problem_patterns (problem_id, pattern_id)
SELECT p.id, pat.id
FROM problems p
JOIN dsa_patterns pat ON pat.slug = 'binary-search'
WHERE p.slug IN ('search-rotated-sorted-array', 'find-minimum-rotated-sorted-array', 'search-2d-matrix', 'koko-eating-bananas')
UNION ALL
SELECT p.id, pat.id
FROM problems p
JOIN dsa_patterns pat ON pat.slug = 'linked-list'
WHERE p.slug IN ('linked-list-cycle', 'remove-nth-node-from-end', 'reorder-list', 'copy-list-random-pointer', 'add-two-numbers')
UNION ALL
SELECT p.id, pat.id
FROM problems p
JOIN dsa_patterns pat ON pat.slug = 'trees'
WHERE p.slug IN ('maximum-depth-binary-tree', 'invert-binary-tree', 'validate-binary-search-tree', 'lowest-common-ancestor-bst', 'binary-tree-level-order-traversal')
UNION ALL
SELECT p.id, pat.id
FROM problems p
JOIN dsa_patterns pat ON pat.slug = 'graphs'
WHERE p.slug IN ('number-of-islands', 'clone-graph', 'course-schedule', 'pacific-atlantic-water-flow', 'graph-valid-tree')
UNION ALL
SELECT p.id, pat.id
FROM problems p
JOIN dsa_patterns pat ON pat.slug = 'dynamic-programming'
WHERE p.slug IN ('house-robber', 'coin-change', 'longest-increasing-subsequence')
UNION ALL
SELECT p.id, pat.id
FROM problems p
JOIN dsa_patterns pat ON pat.slug = 'heap-priority-queue'
WHERE p.slug IN ('kth-largest-element', 'top-k-frequent-elements', 'merge-k-sorted-lists');
