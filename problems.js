// Light AI - Problem Database
// Copyright © 2025 Bhanu Bisht. All rights reserved.

const PROBLEMS = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "easy",
    category: "Array",
    tags: ["Array", "Hash Table"],
    companies: ["Google", "Amazon", "Apple", "Microsoft"],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10⁴",
      "-10⁹ <= nums[i] <= 10⁹",
      "-10⁹ <= target <= 10⁹",
      "Only one valid answer exists."
    ],
    testCases: [
      { input: { nums: [2,7,11,15], target: 9 }, expected: [0,1] },
      { input: { nums: [3,2,4], target: 6 }, expected: [1,2] },
      { input: { nums: [3,3], target: 6 }, expected: [0,1] },
      { input: { nums: [-1,-2,-3,-4,-5], target: -8 }, expected: [2,4] },
      { input: { nums: [0,4,3,0], target: 0 }, expected: [0,3] },
      { input: { nums: [-3,4,3,90], target: 0 }, expected: [0,2] },
      { input: { nums: [1,2,3,4,5,6,7,8,9], target: 17 }, expected: [7,8] },
      { input: { nums: [230,863,916,585,981,404,316,785,88,12,70,435,384,778,887,755,740,337,86,92], target: 1546 }, expected: [3,4] }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your solution here
    
}`,
      python: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Write your solution here
    pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
    }
};`
    },
    hints: [
      "A brute force approach would be O(n²). Can you do better?",
      "Think about using a hash table to store values you've seen.",
      "For each number, check if (target - number) exists in your hash table.",
      "Time complexity: O(n), Space complexity: O(n)"
    ],
    solution: {
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
      python: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[0];
}`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}`
    }
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "easy",
    category: "Stack",
    tags: ["String", "Stack"],
    companies: ["Meta", "Amazon", "Microsoft", "Bloomberg"],
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      }
    ],
    constraints: [
      "1 <= s.length <= 10⁴",
      "s consists of parentheses only '()[]{}'."
    ],
    testCases: [
      { input: { s: "()" }, expected: true },
      { input: { s: "()[]{}" }, expected: true },
      { input: { s: "(]" }, expected: false },
      { input: { s: "([)]" }, expected: false },
      { input: { s: "{[]}" }, expected: true },
      { input: { s: "" }, expected: true },
      { input: { s: "(((" }, expected: false },
      { input: { s: ")))" }, expected: false },
      { input: { s: "{[()()]}" }, expected: true },
      { input: { s: "{[(])}" }, expected: false }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Write your solution here
    
}`,
      python: `def isValid(s):
    """
    :type s: str
    :rtype: bool
    """
    # Write your solution here
    pass`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Write your solution here
        
    }
};`
    },
    hints: [
      "Use a stack data structure to keep track of opening brackets.",
      "When you encounter a closing bracket, check if it matches the most recent opening bracket.",
      "If the stack is empty at the end, all brackets were matched.",
      "Time complexity: O(n), Space complexity: O(n)"
    ]
  },
  {
    id: 3,
    title: "Merge Two Sorted Lists",
    difficulty: "easy",
    category: "Linked List",
    tags: ["Linked List", "Recursion"],
    companies: ["Amazon", "Apple", "Microsoft", "Adobe"],
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]"
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]"
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]"
      }
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    testCases: [
      { input: { list1: [1,2,4], list2: [1,3,4] }, expected: [1,1,2,3,4,4] },
      { input: { list1: [], list2: [] }, expected: [] },
      { input: { list1: [], list2: [0] }, expected: [0] },
      { input: { list1: [5], list2: [1,2,4] }, expected: [1,2,4,5] },
      { input: { list1: [1,3,5,7], list2: [2,4,6,8] }, expected: [1,2,3,4,5,6,7,8] }
    ],
    starterCode: {
      javascript: `/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
    // Write your solution here
    
}`,
      python: `def mergeTwoLists(list1, list2):
    """
    :type list1: Optional[ListNode]
    :type list2: Optional[ListNode]
    :rtype: Optional[ListNode]
    """
    # Write your solution here
    pass`,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Write your solution here
        
    }
};`
    },
    hints: [
      "You can solve this iteratively or recursively.",
      "Use a dummy node to simplify edge cases.",
      "Compare the values of the current nodes and add the smaller one to your result.",
      "Time complexity: O(n+m), Space complexity: O(1) for iterative, O(n+m) for recursive"
    ]
  }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PROBLEMS;
}
