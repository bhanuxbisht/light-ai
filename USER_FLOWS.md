# 🗺️ Light AI - Complete User Flow Maps

## FLOW 1: User Registration & Onboarding

```
┌─────────────────┐
│  Landing Page   │
│   (index.html)  │
└────────┬────────┘
         │
         ├──> Click "Get Started" ──┐
         │                          │
         └──> Click "Sign In" ───┐  │
                                 │  │
                                 ▼  ▼
                    ┌─────────────────────────┐
                    │    Auth Choice Screen   │
                    │  - Sign In (existing)   │
                    │  - Sign Up (new)        │
                    └────────┬────────────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
    ┌──────────────────┐         ┌──────────────────┐
    │   Login Page     │         │   Signup Page    │
    │  (login.html)    │         │  (signup.html)   │
    │                  │         │                  │
    │  - Email         │         │  - Username      │
    │  - Password      │         │  - Email         │
    │  - Remember Me   │         │  - Password      │
    │  - Forgot Pwd?   │         │  - Confirm Pwd   │
    └────────┬─────────┘         │  - Full Name     │
             │                   └────────┬─────────┘
             │                            │
             │  ✅ Valid Credentials      │  ✅ Valid Data
             │                            │
             │  POST /api/auth/login      │  POST /api/auth/signup
             │                            │
             └────────────┬───────────────┘
                          │
                          ▼
                ┌──────────────────┐
                │  JWT Token       │
                │  Saved in        │
                │  localStorage    │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │   Dashboard      │
                │  (dashboard.html)│
                │                  │
                │  Welcome Screen! │
                │  First-time tips │
                └──────────────────┘
```

---

## FLOW 2: Browse & Filter Problems

```
┌─────────────────┐
│   Dashboard     │
└────────┬────────┘
         │
         ├──> Click "Browse Problems" ──> /problems
         │
         └──> Click Pattern Card ──> /patterns/:slug
                                         │
                                         └──> Shows filtered problems
         
┌─────────────────────────────────────┐
│       Problems List Page            │
│       (/problems/index.html)        │
└────────┬────────────────────────────┘
         │
         │  GET /api/problems?
         │       difficulty=easy&
         │       pattern=arrays&
         │       status=unsolved&
         │       company=google&
         │       search=two+sum
         │
         ▼
┌─────────────────────────────────────┐
│         Filters Panel               │
│  ┌─────────────────────────────┐   │
│  │ 🔍 Search: "two sum"         │   │
│  ├─────────────────────────────┤   │
│  │ Difficulty:                  │   │
│  │  □ Easy                      │   │
│  │  ☑ Medium                    │   │
│  │  □ Hard                      │   │
│  ├─────────────────────────────┤   │
│  │ Pattern:                     │   │
│  │  ☑ Arrays & Hashing          │   │
│  │  □ Two Pointers              │   │
│  │  □ Sliding Window            │   │
│  ├─────────────────────────────┤   │
│  │ Status:                      │   │
│  │  ○ All                       │   │
│  │  ○ Solved                    │   │
│  │  ● Unsolved                  │   │
│  │  ○ Attempted                 │   │
│  ├─────────────────────────────┤   │
│  │ Companies:                   │   │
│  │  ☑ Google                    │   │
│  │  ☑ Amazon                    │   │
│  │  □ Microsoft                 │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│      Problems Grid/List             │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ #1  ✓ Two Sum            🟢 ┃  │
│  ┃     Arrays • 45% • Google   ┃  │
│  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫  │
│  ┃ #2  ⚠ Valid Parentheses  🟡 ┃  │
│  ┃     Stack • 88% • Meta      ┃  │
│  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫  │
│  ┃ #3    Longest Substring   🟡 ┃  │
│  ┃     Sliding • 32% • Amazon  ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                     │
│  ✓ = Solved                        │
│  ⚠ = Attempted                     │
│  [blank] = Not attempted           │
│  🟢 = Easy, 🟡 = Medium, 🔴 = Hard │
└─────────────────────────────────────┘
         │
         │  Click on any problem
         ▼
    /problems/:slug
```

---

## FLOW 3: Solve a Problem (Complete Journey)

```
┌─────────────────────────────────────┐
│   Problem Page                      │
│   (/problems/two-sum.html)          │
└────────┬────────────────────────────┘
         │
         │  GET /api/problems/two-sum
         │
         ▼
┌─────────────────────────────────────┐
│      Page Layout (Split View)       │
│  ┌──────────────┬─────────────────┐ │
│  │ Description  │  Code Editor    │ │
│  │    Panel     │     Panel       │ │
│  └──────────────┴─────────────────┘ │
└─────────────────────────────────────┘

LEFT PANEL (Description):
┌─────────────────────────────────────┐
│  # Two Sum                          │
│  🟢 Easy  •  Arrays & Hashing       │
│  ─────────────────────────────────  │
│                                     │
│  Given an array of integers nums... │
│                                     │
│  Example 1:                         │
│  Input: nums = [2,7,11,15], target=9│
│  Output: [0,1]                      │
│  Explanation: nums[0] + nums[1] = 9 │
│                                     │
│  Constraints:                       │
│  • 2 <= nums.length <= 10^4         │
│  • -10^9 <= nums[i] <= 10^9         │
│                                     │
│  [💡 Show Hint 1]                   │
│  [🔖 Bookmark] [👍 123] [👎 5]     │
│                                     │
│  Companies: Google, Amazon, Meta    │
└─────────────────────────────────────┘

RIGHT PANEL (Code Editor):
┌─────────────────────────────────────┐
│  Language: [JavaScript ▼] [⚙️]     │
│  ─────────────────────────────────  │
│  1  function twoSum(nums, target) { │
│  2    // Your code here              │
│  3                                   │
│  4  }                                │
│  5                                   │
│  ─────────────────────────────────  │
│  ┌─────────────────────────────┐   │
│  │ 📝 Custom Input (Optional)  │   │
│  │ nums: [2,7,11,15]           │   │
│  │ target: 9                   │   │
│  └─────────────────────────────┘   │
│                                     │
│  [▶️ Run Code]  [✅ Submit]         │
└─────────────────────────────────────┘

USER ACTIONS:
         │
         ├──> Click "Show Hint 1" ──> Reveal progressive hint
         │
         ├──> Click "Run Code" ────┐
         │                          │
         └──> Click "Submit" ───────┼──> Same flow
                                    │
                                    ▼
                        ┌────────────────────┐
                        │  POST /api/execute │
                        │  {                 │
                        │    code: "...",    │
                        │    language: "js", │
                        │    problemId: 1,   │
                        │    testCases: [...] │
                        │  }                 │
                        └──────────┬─────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
          ┌──────────────────┐         ┌──────────────────┐
          │  Run Code Only   │         │  Submit Solution │
          │  (Custom Input)  │         │  (All Test Cases)│
          └────────┬─────────┘         └────────┬─────────┘
                   │                            │
                   ▼                            ▼
          ┌──────────────────┐         ┌──────────────────┐
          │  Show Results    │         │  Show Results +  │
          │  in Modal        │         │  Save Submission │
          │                  │         │                  │
          │  ✅ Passed       │         │  POST            │
          │  Time: 45ms      │         │  /api/problems/  │
          │  Memory: 128KB   │         │  :slug/submit    │
          └──────────────────┘         └────────┬─────────┘
                                                 │
                                    ┌────────────┴────────────┐
                                    │                         │
                                    ▼                         ▼
                          ┌──────────────────┐    ┌──────────────────┐
                          │  ✅ Accepted!    │    │  ❌ Wrong Answer │
                          │                  │    │                  │
                          │  +50 XP          │    │  Test Case 3/10  │
                          │  +10 Speed Bonus │    │  Expected: [0,1] │
                          │  +25 First Solve │    │  Got: [1,0]      │
                          │  ────────────    │    │                  │
                          │  Total: 85 XP    │    │  [Try Again]     │
                          │                  │    │  [View Editorial] │
                          │  [View Editorial]│    └──────────────────┘
                          │  [Next Problem]  │
                          └──────────────────┘
                                    │
                                    │  Update user_progress
                                    │  Update submissions
                                    │  Check achievements
                                    │  Update daily_activity
                                    │
                                    ▼
                          ┌──────────────────┐
                          │  Achievement     │
                          │  Unlocked! 🎉    │
                          │                  │
                          │  🎯 First Blood  │
                          │  Solved your     │
                          │  first problem!  │
                          └──────────────────┘
```

---

## FLOW 4: Dashboard Interactions

```
┌─────────────────────────────────────┐
│          Dashboard Home             │
└────────┬────────────────────────────┘
         │
         │  GET /api/progress/me
         │  GET /api/problems/daily-challenge
         │  GET /api/problems/recommended
         │
         ▼
┌─────────────────────────────────────┐
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃   👋 Welcome back, Bhanu!   ┃  │
│  ┃   Level 5 • 2,450 XP        ┃  │
│  ┃   ████████░░ 89% to Lvl 6   ┃  │
│  ┃   🔥 Streak: 12 days        ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📊 Your Progress            │   │
│  │ ─────────────────────────── │   │
│  │ Easy:    45/100 ████░░░     │   │
│  │ Medium:  23/150 ██░░░░░     │   │
│  │ Hard:     5/80  █░░░░░░     │   │
│  │                             │   │
│  │ Solved this week: 8 (+25%)  │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🎯 Today's Challenge        │   │
│  │ ─────────────────────────── │   │
│  │ Longest Substring Without   │   │
│  │ Repeating Characters        │   │
│  │                             │   │
│  │ 🟡 Medium • Sliding Window  │   │
│  │ 💰 Bonus: 100 XP (2x)       │   │
│  │                             │   │
│  │ [Start Challenge]           │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📚 Pattern Mastery          │   │
│  │ ─────────────────────────── │   │
│  │ ┌─────┬─────┬─────┬─────┐  │   │
│  │ │✅📊│⚠️🔄│  🪟│  🔍│  │   │
│  │ │Array│2Ptr │Slide│BinSr│  │   │
│  │ │15/15│8/12 │3/10 │0/10 │  │   │
│  │ └─────┴─────┴─────┴─────┘  │   │
│  │ ┌─────┬─────┬─────┬─────┐  │   │
│  │ │  🔗│  🌳│  📈│  💎│  │   │
│  │ │ List│Tree │Graph│  DP │  │   │
│  │ │2/12 │0/15 │0/12 │0/10 │  │   │
│  │ └─────┴─────┴─────┴─────┘  │   │
│  │                             │   │
│  │ [View All Patterns]         │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 💡 Recommended For You      │   │
│  │ ─────────────────────────── │   │
│  │ 1. Valid Parentheses        │   │
│  │    🟢 Easy • Stack           │   │
│  │ 2. Merge Two Sorted Lists   │   │
│  │    🟢 Easy • Linked List     │   │
│  │ 3. Maximum Subarray         │   │
│  │    🟡 Medium • Kadane's      │   │
│  │                             │   │
│  │ Based on your weak areas    │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🏆 Recent Achievements      │   │
│  │ ─────────────────────────── │   │
│  │ 🎯 First Blood              │   │
│  │ 🔥 Week Warrior (7 days)    │   │
│  │ ⚡ Speed Demon              │   │
│  │                             │   │
│  │ [View All 12 Achievements]  │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📈 Recent Activity          │   │
│  │ ─────────────────────────── │   │
│  │ ✅ Two Sum • 2 hours ago     │   │
│  │ ⚠️ Add Binary • 5 hours ago  │   │
│  │ ✅ Valid Paren • Yesterday   │   │
│  │                             │   │
│  │ [View Full History]         │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘

USER CLICKS:
  │
  ├──> "Start Challenge" ──> /problems/:slug (daily challenge)
  │
  ├──> Pattern Card ──> /patterns/:slug (filtered problems)
  │
  ├──> "View All Patterns" ──> /patterns
  │
  ├──> Recommended Problem ──> /problems/:slug
  │
  ├──> "View All Achievements" ──> /profile#achievements
  │
  └──> "View Full History" ──> /history
```

---

## FLOW 5: Pattern Learning Path

```
┌─────────────────────────────────────┐
│       Patterns Page                 │
│       (/patterns/index.html)        │
└────────┬────────────────────────────┘
         │
         │  GET /api/patterns
         │
         ▼
┌─────────────────────────────────────┐
│  All DSA Patterns (Grid View)      │
│                                     │
│  ┌────────────┬────────────┐       │
│  │📊 Arrays   │🔄 Two      │       │
│  │& Hashing   │  Pointers  │       │
│  │            │            │       │
│  │████████░░  │██████░░░░  │       │
│  │15/15 ✅    │8/12 ⚠️     │       │
│  │Easy 🟢     │Medium 🟡   │       │
│  └────────────┴────────────┘       │
│  ┌────────────┬────────────┐       │
│  │🪟 Sliding  │🔍 Binary   │       │
│  │   Window   │   Search   │       │
│  │            │            │       │
│  │███░░░░░░░  │░░░░░░░░░░  │       │
│  │3/10 📝     │0/10 🔒     │       │
│  │Medium 🟡   │Medium 🟡   │       │
│  └────────────┴────────────┘       │
│                                     │
│  Progress: 26/102 problems (25%)   │
└─────────────────────────────────────┘
         │
         │  Click on a pattern card
         ▼
┌─────────────────────────────────────┐
│   Pattern Detail Page               │
│   (/patterns/arrays-hashing.html)   │
└────────┬────────────────────────────┘
         │
         │  GET /api/patterns/arrays-hashing
         │
         ▼
┌─────────────────────────────────────┐
│  📊 Arrays & Hashing                │
│  ─────────────────────────────────  │
│                                     │
│  Progress: 15/15 ✅ COMPLETED!      │
│  Average Difficulty: Easy           │
│  Est. Time: 8-10 hours              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📖 What is this pattern?    │   │
│  │                             │   │
│  │ Arrays are fundamental data │   │
│  │ structures that store...    │   │
│  │                             │   │
│  │ Hash tables provide O(1)... │   │
│  │                             │   │
│  │ [Read Full Guide]           │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🎯 When to use this pattern │   │
│  │                             │   │
│  │ ✓ Need fast lookups         │   │
│  │ ✓ Find duplicates           │   │
│  │ ✓ Count frequencies         │   │
│  │ ✓ Group data                │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 💻 Code Template            │   │
│  │                             │   │
│  │ ```javascript               │   │
│  │ function pattern(arr) {     │   │
│  │   const map = new Map();    │   │
│  │   // ... template code      │   │
│  │ }                           │   │
│  │ ```                         │   │
│  └─────────────────────────────┘   │
│                                     │
│  Problems in this pattern:          │
│  ────────────────────────────────   │
│                                     │
│  🟢 EASY (5 problems)               │
│  ┌─────────────────────────────┐   │
│  │ ✅ 1. Two Sum               │   │
│  │ ✅ 2. Contains Duplicate    │   │
│  │ ✅ 3. Valid Anagram         │   │
│  │ ✅ 4. Group Anagrams        │   │
│  │ ✅ 5. Top K Frequent        │   │
│  └─────────────────────────────┘   │
│                                     │
│  🟡 MEDIUM (7 problems)             │
│  ┌─────────────────────────────┐   │
│  │ ✅ 6. Product Except Self   │   │
│  │ ✅ 7. Valid Sudoku          │   │
│  │ ✅ 8. Encode/Decode Strings │   │
│  │ ✅ 9. Longest Consecutive   │   │
│  │ ✅ 10. 3Sum                 │   │
│  │ ✅ 11. Container With Water │   │
│  │ ✅ 12. Trapping Rain Water  │   │
│  └─────────────────────────────┘   │
│                                     │
│  🔴 HARD (3 problems)               │
│  ┌─────────────────────────────┐   │
│  │ ✅ 13. Sliding Window Max   │   │
│  │ ✅ 14. Median Data Stream   │   │
│  │ ✅ 15. First Missing +ve    │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Next Pattern: Two Pointers →]    │
└─────────────────────────────────────┘
```

---

## FLOW 6: User Profile & Analytics

```
┌─────────────────────────────────────┐
│         User Profile                │
│       (/profile.html)               │
└────────┬────────────────────────────┘
         │
         │  GET /api/profile/me
         │  GET /api/submissions?userId=me
         │
         ▼
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐   │
│  │  👤 [Avatar]   Bhanu Bisht  │   │
│  │     @bhanux                 │   │
│  │     bhanu@test.com          │   │
│  │                             │   │
│  │  Joined: Jan 2025           │   │
│  │  Last Active: 2 hours ago   │   │
│  │                             │   │
│  │  [Edit Profile]             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📊 Statistics               │   │
│  │ ─────────────────────────── │   │
│  │ Total Solved:    73         │   │
│  │ Easy:            45 (62%)   │   │
│  │ Medium:          23 (31%)   │   │
│  │ Hard:             5 (7%)    │   │
│  │                             │   │
│  │ Acceptance Rate: 68%        │   │
│  │ Total XP:        2,450      │   │
│  │ Level:           5          │   │
│  │ Global Rank:     #1,234     │   │
│  │                             │   │
│  │ Strongest Patterns:         │   │
│  │ 1. Arrays & Hashing (100%)  │   │
│  │ 2. Two Pointers (67%)       │   │
│  │ 3. Sliding Window (30%)     │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📅 Activity Heatmap         │   │
│  │ ─────────────────────────── │   │
│  │   M T W T F S S             │   │
│  │ ┌ □□■□■■■ ┐  73 problems    │   │
│  │ │ □■□■□□□ │  in last year   │   │
│  │ │ ■■■■■□□ │                 │   │
│  │ │ □□■■■■■ │  Longest        │   │
│  │ │ ■□□□■■□ │  streak: 18 days│   │
│  │ │ □■■■■□□ │                 │   │
│  │ └─────────┘  Current: 12    │   │
│  │                             │   │
│  │ ■ = 3+ problems   □ = 0     │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🎯 Skills Radar             │   │
│  │ ─────────────────────────── │   │
│  │        Arrays               │   │
│  │          /\                 │   │
│  │         /  \                │   │
│  │  DP ---/----\--- Trees      │   │
│  │       /      \              │   │
│  │      /        \             │   │
│  │ Graphs ------  2Ptr         │   │
│  │      \        /             │   │
│  │       \      /              │   │
│  │  Stack \    / Sliding       │   │
│  │         \  /                │   │
│  │          \/                 │   │
│  │         Heap                │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📝 Submission History       │   │
│  │ ─────────────────────────── │   │
│  │ Filter: [All▼] [JS▼] [⚙️]  │   │
│  │                             │   │
│  │ Problem          Status  💡  │   │
│  │ ──────────────────────────  │   │
│  │ Two Sum          ✅ AC   👁️ │   │
│  │ JS • 2h ago • 45ms          │   │
│  │                             │   │
│  │ Add Binary       ⚠️ WA   👁️ │   │
│  │ Python • 5h ago • TLE       │   │
│  │                             │   │
│  │ Valid Paren      ✅ AC   👁️ │   │
│  │ JS • Yesterday • 32ms       │   │
│  │                             │   │
│  │ [Load More...]              │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🏆 Achievements (12/50)     │   │
│  │ ─────────────────────────── │   │
│  │ ┌────┬────┬────┬────┬────┐  │   │
│  │ │ 🎯 │ 🔥 │ ⚡ │ 💯 │ 🎓 │  │   │
│  │ │ ✓  │ ✓  │ ✓  │ ✗  │ ✗  │  │   │
│  │ └────┴────┴────┴────┴────┘  │   │
│  │                             │   │
│  │ [View All Achievements]     │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ⚙️ Settings                 │   │
│  │ ─────────────────────────── │   │
│  │ • Account Settings          │   │
│  │ • Change Password           │   │
│  │ • Email Preferences         │   │
│  │ • Theme & Editor            │   │
│  │ • Privacy                   │   │
│  │ • Delete Account            │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## FLOW 7: Leaderboard & Competition

```
┌─────────────────────────────────────┐
│        Leaderboard Page             │
│      (/leaderboard.html)            │
└────────┬────────────────────────────┘
         │
         │  GET /api/leaderboard?
         │       period=week&
         │       limit=100
         │
         ▼
┌─────────────────────────────────────┐
│  🏆 Global Leaderboard              │
│                                     │
│  Filter: ○ Today  ● Week  ○ All   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Rank  User        XP    Lvl │   │
│  │ ─────────────────────────── │   │
│  │  🥇   Sarah K    8,450   17 │   │
│  │  🥈   Alex M     7,230   15 │   │
│  │  🥉   Jordan P   6,890   14 │   │
│  │  4    Emma W     5,120   11 │   │
│  │  5    Chris L    4,890   10 │   │
│  │  ...                        │   │
│  │  1234 You (↑ 50) 2,450    5 │   │
│  │  ...                        │   │
│  └─────────────────────────────┘   │
│                                     │
│  Your Stats This Week:              │
│  • Rank: #1,234 (↑ 50 places)      │
│  • XP Gained: +350                  │
│  • Problems Solved: 8               │
│  • You're ahead of 67% of users!    │
└─────────────────────────────────────┘
```

---

## FLOW 8: Mobile Navigation

```
Mobile View (< 768px):
┌─────────────────┐
│  ☰  Light AI  🔔│  <- Top Bar
├─────────────────┤
│                 │
│   Page Content  │
│                 │
│                 │
│                 │
├─────────────────┤
│ 🏠  📚  🎯  👤 │  <- Bottom Nav
└─────────────────┘

Bottom Navigation Tabs:
🏠 Home      -> /dashboard
📚 Problems  -> /problems
🎯 Patterns  -> /patterns
👤 Profile   -> /profile

Hamburger Menu (☰):
┌─────────────────┐
│ 👤 Bhanu Bisht  │
│    @bhanux      │
├─────────────────┤
│ 🏠 Dashboard    │
│ 📚 Problems     │
│ 🎯 Patterns     │
│ 🔍 Visualizer   │
│ 📊 Leaderboard  │
│ 📈 History      │
│ 👤 Profile      │
│ ⚙️ Settings     │
│ 🚪 Logout       │
└─────────────────┘
```

---

## SUMMARY: Key User Journeys

### 1. **New User Onboarding**
Landing → Signup → Welcome Dashboard → Browse Problems → Solve First → Earn Achievement

### 2. **Daily Practice**
Login → Dashboard → See Daily Challenge → Solve → Submit → Earn XP → Check Progress

### 3. **Pattern Learning**
Dashboard → Patterns → Select Pattern → Read Guide → Solve Easy → Medium → Hard

### 4. **Problem Discovery**
Problems List → Filter by Company → Find Problem → Solve → Submit → Check Solution

### 5. **Progress Tracking**
Dashboard → View Stats → See Heatmap → Check Achievements → Compare Leaderboard

### 6. **Profile Management**
Profile → View Stats → Edit Info → Change Password → Customize Editor

---

**Next Steps:**
1. ✅ Review these flows - Confirm logic makes sense
2. 🛠️ Start building database schema
3. 🎨 Implement UI components
4. 🔌 Connect frontend to backend APIs
5. 🧪 Test every flow thoroughly

Ready to start? 💪
