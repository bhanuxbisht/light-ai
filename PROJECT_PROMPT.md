# 🚀 Light AI - Complete Development Prompt

## PROJECT OVERVIEW
Build a **production-ready SaaS platform** for DSA (Data Structures & Algorithms) interview preparation, inspired by Thita.ai. The platform must be **fully functional, bug-free, with complete backend APIs** and modern frontend.

---

## CURRENT PROJECT STATUS (As of Oct 27, 2025)

### ✅ COMPLETED FEATURES:
1. **Landing Page** - Modern, responsive design with Apple-inspired UI
2. **Authentication System**
   - Signup/Login pages with validation
   - JWT tokens (7-day expiry) ✅
   - bcrypt password hashing (10 salt rounds)
   - Protected routes (dashboard, solve, visualize)
   - Auto-redirect to login for unauthenticated users
   - User dropdown with Profile/Progress links
   
3. **Database (PostgreSQL 18.0)**
   - `users` table (id, username, email, password_hash, full_name, created_at)
   - `user_progress` table (user_id, total_xp, problems_solved, current_streak, longest_streak, last_active_date)
   - `submissions` table (user_id, problem_id, code, language, passed, xp_earned, submitted_at)
   - `achievements` table (id, name, description, icon, xp_required)
   - `user_achievements` table (user_id, achievement_id, earned_at)
   - `daily_activity` table (user_id, activity_date, xp_earned, problems_solved)

4. **Progress Tracking Backend (API)**
   - `POST /api/progress/submit` - Submit solution, calculate XP (50 base + 10 speed + 25 first solve)
   - `GET /api/progress/me` - Get user stats, streak, achievements
   - `GET /api/progress/leaderboard` - Global rankings
   - `GET /api/progress/submissions/:problemId` - User's submission history

5. **Dashboard**
   - XP progress display
   - Streak tracking
   - Stats cards (problems solved, level, time spent)
   - Achievements showcase
   - Recent activity timeline
   - Loading states and error handling

6. **Problem Solver**
   - 3 hardcoded problems (Two Sum, Reverse String, Palindrome Check)
   - Monaco code editor (JavaScript only currently)
   - Web Worker for code execution (browser-side)
   - Test case validation
   - XP notifications on solve
   - Submit to backend integration

7. **Algorithm Visualizer**
   - Canvas-based step-by-step visualization
   - 4 algorithms: Two Sum, Bubble Sort, Binary Search, Reverse Array
   - Playback controls (play, pause, next, prev, reset)
   - Speed control slider
   - Variable tracking panel
   - FIXED: All ID mismatches resolved ✅

8. **Global App (app.js)**
   - Authentication middleware
   - fetchWithAuth() helper for API calls
   - showLoading() / hideLoading() spinners
   - toast() notifications
   - User menu dropdown with logout

### 📊 DATABASE STRUCTURE:
- **PostgreSQL 18.0** running on localhost:5432
- Database name: `light_ai`
- Password: `Sakshi@0619`
- 7 tables currently (all auth & progress related)

### 🎨 UI/UX:
- **Design:** Apple-inspired, dark theme, modern cards
- **Colors:** #0071E3 (primary), #30D158 (success), #FF453A (error), gradient background
- **Font:** Inter (Google Fonts)
- **Responsive:** Works on mobile, tablet, desktop

---

## 🎯 WHAT NEEDS TO BE BUILT (Week 1-3)

### WEEK 1: DATABASE & BACKEND (7 days)

#### **Day 1-2: Database Schema**
Create new tables:
1. **`problems` table:**
   - id, title, slug, difficulty (Easy/Medium/Hard)
   - description, constraints, examples (JSON)
   - test_cases (JSON), hints (JSON)
   - starter_code_js, starter_code_python, starter_code_java, starter_code_cpp, starter_code_c
   - company_tags (JSON), acceptance_rate
   - created_at, updated_at

2. **`dsa_patterns` table:**
   - id, name, slug, description, icon (emoji)
   - total_problems, difficulty_level, display_order

3. **`problem_patterns` table (junction):**
   - problem_id, pattern_id

4. **`user_problem_progress` table:**
   - user_id, problem_id, status (not_started/attempted/solved)
   - attempts, first_solved_at, last_attempted_at

5. **`bookmarks` table:**
   - user_id, problem_id, notes, created_at

**Seed Data:**
- 10 DSA patterns: Arrays & Hashing, Two Pointers, Sliding Window, Binary Search, Linked List, Trees, Graphs, Dynamic Programming, Stack, Heap
- 50 problems (5 per pattern): Easy (20), Medium (25), Hard (5)
- Each problem needs:
  * Clear description with examples
  * 10-15 test cases (5 visible, rest hidden)
  * Starter code templates for 5 languages (JS, Python, Java, C++, C)
  * Hints (3 progressive)
  * Company tags (Google, Amazon, Meta, etc.)

#### **Day 3-5: Backend APIs**

1. **Problems API (`routes/problems.js`):**
   - `GET /api/problems` - List with filters (difficulty, pattern, company, status, search)
   - `GET /api/problems/:slug` - Single problem details
   - `POST /api/problems/:slug/submit` - Submit solution (execute code, run tests, calculate XP, save)
   - `GET /api/problems/:slug/submissions` - User's submission history
   - `POST /api/problems/:slug/bookmark` - Toggle bookmark
   - `GET /api/problems/:slug/hints` - Progressive hints
   - `GET /api/problems/daily` - Daily challenge

2. **Patterns API (`routes/patterns.js`):**
   - `GET /api/patterns` - List all patterns with progress
   - `GET /api/patterns/:slug` - Pattern details with problems

3. **Profile API (`routes/profile.js`):**
   - `GET /api/profile/me` - Current user profile & stats
   - `GET /api/profile/:username` - Public profile
   - `PUT /api/profile/me` - Update profile
   - `PUT /api/profile/password` - Change password
   - `GET /api/profile/heatmap` - Activity heatmap (365 days)

4. **Leaderboard API (`routes/leaderboard.js`):**
   - `GET /api/leaderboard?period=week` - Rankings

#### **Day 6-7: Code Execution Service (Docker)**

**Multi-language Code Executor:**
- Docker container with Node.js, Python, Java, C++, C compilers
- Security: No network, read-only filesystem, CPU/memory limits
- Time limit: 3 seconds per test
- Memory limit: 256 MB
- API: `POST /api/execute` with code, language, test cases
- Return: results per test case, execution time, memory used

**Languages to support:**
1. JavaScript (Node.js)
2. Python 3.10+
3. Java 17
4. C++ (g++)
5. C (gcc)

---

### WEEK 2: FRONTEND (7 days)

#### **Day 1-2: Problems List Page**
**File:** `/problems/index.html`

**Features:**
- Grid/list view of all problems
- Filters: Difficulty, Pattern, Company, Status (solved/attempted/unsolved)
- Search by title
- Sort: Difficulty, Acceptance rate, Frequency
- Pagination (20 per page)
- Status icons: ✓ Solved, ⚠ Attempted, Blank = Not started
- Bookmark icon
- Click problem → Go to solve page

**UI:**
```
┌────────────────────────────────────┐
│ Filters      │ Problem List        │
│ ─────────    │ ──────────────      │
│ □ Easy       │ #1 ✓ Two Sum 🟢    │
│ ☑ Medium     │ Arrays • 45% • GOOG │
│ □ Hard       │                     │
│              │ #2 ⚠ Valid Paren 🟡│
│ Pattern:     │ Stack • 88% • Meta  │
│ ☑ Arrays     │                     │
│ □ Two Ptr    │ #3 Longest Sub 🟡  │
└────────────────────────────────────┘
```

#### **Day 3-4: Problem Solve Page**
**File:** `/problems/[slug].html`

**Features:**
- Split panel layout (resizable)
- **Left:** Problem description, examples, constraints, hints, company tags
- **Right:** Monaco editor with language tabs (JS, Python, Java, C++, C)
- Custom input testing
- "Run Code" button (test with custom input)
- "Submit" button (run all test cases)
- Results display: Passed/Failed, execution time, memory used
- XP notification on success
- Editorial solution (after solving)
- Bookmarking
- Auto-save code to localStorage

**UI:**
```
┌─────────────────┬─────────────────┐
│ # Two Sum      │ JavaScript ▼    │
│ 🟢 Easy • Array│ 1  function ... │
│                 │ 2               │
│ Description...  │ 3               │
│ Example 1:      │ 4               │
│ Input: [2,7]    │ 5               │
│ Output: [0,1]   │                 │
│                 │ [▶ Run] [✓ Sub] │
│ [💡 Hint 1]    │ ──────────────  │
│ [🔖 Bookmark]  │ Test Results:   │
│                 │ ✅ Case 1: Pass │
└─────────────────┴─────────────────┘
```

#### **Day 5-7: Enhanced Dashboard**
**File:** `/dashboard.html`

**New Widgets:**
1. **Daily Challenge Card** - Bonus 2x XP
2. **Pattern Progress Grid** - 2x5 grid of pattern cards
3. **Recommended Problems** - Based on weak areas
4. **Recent Activity** - Timeline of last 10 submissions
5. **Weekly XP Graph** - Line chart of XP over time

---

### WEEK 3: PROFILE, TESTING & DEPLOY (7 days)

#### **Day 1-2: User Profile Page**
**File:** `/profile.html`

**Sections:**
1. **Header:** Avatar, username, email, join date
2. **Stats:** Total solved (E/M/H), acceptance rate, rank
3. **Heatmap Calendar:** GitHub-style, 365 days activity
4. **Skills Radar Chart:** 8-axis for pattern proficiency
5. **Submission History:** Table with filter/sort
6. **Achievements Grid:** Earned vs locked badges
7. **Settings Tab:** Change password, email prefs, theme

#### **Day 3-4: Pattern Pages**
**Files:** `/patterns/index.html`, `/patterns/[slug].html`

1. **Index:** Grid of all 10 patterns with progress
2. **Detail:** Pattern guide, code template, list of problems grouped by difficulty

#### **Day 5-7: Testing & Deploy**

**Testing:**
- Test all buttons/links work
- Test all forms validate correctly
- Test authentication flow
- Test code execution for all 5 languages
- Test on mobile, tablet, desktop
- Test in Chrome, Firefox, Safari, Edge
- Check console for errors (should be 0)
- Performance: Page loads < 2 seconds

**Security Audit:**
- SQL injection prevention ✅
- XSS prevention ✅
- CSRF protection ✅
- Rate limiting on login
- Docker container isolation
- Input validation everywhere

**Deploy:**
- Backend: Railway or Render
- Database: Railway Postgres or Supabase
- Frontend: Served from Express static files
- SSL: Let's Encrypt
- Domain: lightai.dev or similar

---

## 📝 THE PERFECT PROMPT TO USE

**Use this prompt when restarting:**

```
I'm building Light AI, a complete SaaS platform for DSA interview preparation. 

CURRENT STATUS:
- ✅ Authentication (JWT, 7-day expiry) working
- ✅ Progress tracking backend working
- ✅ Dashboard showing real data
- ✅ 3 hardcoded problems with browser-side execution
- ✅ Visual debugger working

NEED TO BUILD:
Week 1: Database schema for 50 problems, DSA patterns, bookmarks, user progress. 
Build backend APIs for problems (list, filter, get, submit), patterns, profile, leaderboard.
Docker code execution service supporting JavaScript, Python, Java, C++, C with security.

Week 2: Problems list page with filters/search/pagination. Problem solve page with Monaco editor 
and multi-language support. Enhanced dashboard with daily challenge, pattern grid, recommended problems.

Week 3: User profile page with stats, heatmap, submission history. Pattern pages with guides. 
Complete testing, fix all bugs, security audit, deploy to production.

REQUIREMENTS:
- Multi-language support: JS, Python, Java, C++, C
- Docker code execution with 3s timeout, 256MB memory limit
- Secure (no SQL injection, XSS, CSRF)
- Fast (page loads < 2s)
- Bug-free (test everything)
- Responsive (mobile, tablet, desktop)
- Keep existing UI/UX style (Apple-inspired, dark theme)

PRICING:
- Free: 20 problems, 10 executions/day
- Pro (₹299/mo): All 50 problems, unlimited execution
- Premium (₹599/mo): Pro + AI hints + mock interviews

START WITH: Week 1, Day 1 - Create database schema and seed 10 problems with test cases.
Work step-by-step, test each feature before moving to next. Zero bugs allowed!
```

---

## 🔧 TECHNICAL REQUIREMENTS

### Languages & Tools:
- **Backend:** Node.js 18+, Express.js
- **Database:** PostgreSQL 18.0
- **Authentication:** JWT (jsonwebtoken), bcrypt
- **Code Editor:** Monaco Editor
- **Code Execution:** Docker containers
- **Frontend:** Vanilla JavaScript, HTML, CSS
- **Deployment:** Railway/Render + Vercel/Netlify

### Security:
- Parameterized queries (prevent SQL injection)
- Input sanitization (prevent XSS)
- Rate limiting (5 login attempts per 15 min)
- Docker isolation (no network, read-only FS)
- HTTPS in production
- Environment variables for secrets

### Performance:
- Database indexes on user_id, problem_id, slug
- Redis caching for problem list (future)
- CDN for static assets
- Code minification
- Image optimization

---

## 📁 PROJECT STRUCTURE

```
light-ai/
├── index.html              # Landing page
├── auth/
│   ├── login.html
│   └── signup.html
├── dashboard.html          # Main dashboard
├── problems/
│   ├── index.html          # Problems list
│   └── [slug].html         # Problem solve page (dynamic)
├── patterns/
│   ├── index.html          # All patterns
│   └── [slug].html         # Pattern detail
├── profile.html            # User profile
├── leaderboard.html        # Rankings
├── visualize.html          # Algorithm visualizer
├── app.js                  # Global auth & helpers
├── styles.css              # Global styles
├── server.js               # Express server
├── routes/
│   ├── auth.js             # ✅ EXISTS
│   ├── progress.js         # ✅ EXISTS
│   ├── problems.js         # NEW - Build in Week 1
│   ├── patterns.js         # NEW
│   ├── execute.js          # NEW - Docker executor
│   ├── profile.js          # NEW
│   └── leaderboard.js      # NEW
├── services/
│   ├── codeExecutor.js     # Docker integration
│   └── xpCalculator.js     # XP logic
├── config/
│   └── database.js         # ✅ EXISTS
├── .env                    # Environment variables
├── package.json
└── README.md
```

---

## ✅ SUCCESS CRITERIA

Before considering the project COMPLETE, verify:

1. **Functionality:**
   - [ ] User can signup/login/logout
   - [ ] JWT expires after 7 days
   - [ ] User can browse 50 problems with filters
   - [ ] User can solve problems in 5 languages
   - [ ] Code executes in Docker securely
   - [ ] All test cases run correctly
   - [ ] XP system works (base + bonuses)
   - [ ] Streaks track correctly
   - [ ] Achievements unlock properly
   - [ ] Dashboard shows real data
   - [ ] Profile page displays stats
   - [ ] Leaderboard ranks users
   - [ ] Daily challenge rotates
   - [ ] Bookmarks save/load

2. **Quality:**
   - [ ] Zero console errors
   - [ ] Zero broken links
   - [ ] All forms validate
   - [ ] Mobile responsive
   - [ ] Fast (< 2s loads)
   - [ ] Secure (no vulnerabilities)
   - [ ] Professional UI/UX

3. **Testing:**
   - [ ] Tested on Chrome, Firefox, Safari, Edge
   - [ ] Tested on mobile, tablet, desktop
   - [ ] Security audit passed
   - [ ] Performance benchmarks met

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Environment variables set
- [ ] Database migrated
- [ ] Docker images built
- [ ] SSL certificate configured
- [ ] Domain pointed to server
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] Error logging enabled

---

**READY TO BUILD!** Use this prompt + flowcharts to guide development. Test everything. Zero bugs! 💪
