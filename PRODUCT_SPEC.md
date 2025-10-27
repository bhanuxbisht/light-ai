# 🚀 Light AI - Complete Product Specification
## MVP: DSA Practice Platform (Inspired by Thita.ai)

**Version:** 1.0  
**Date:** October 27, 2025  
**Status:** Production-Ready Roadmap  
**Goal:** Build a complete, bug-free, secure SaaS platform for DSA interview preparation

---

## 📊 THITA.AI ANALYSIS SUMMARY

### Core Features Analyzed:
1. **90+ DSA Pattern Mastery** - Structured learning with patterns
2. **AI Mock Interviews** - Adaptive interview practice
3. **AI Code Practice** - Real-time code feedback
4. **Learning Paths** - Structured curriculum
5. **Resume Analyzer** - ATS optimization
6. **Progress Analytics** - Comprehensive tracking
7. **History Timeline** - Activity tracking

### Pricing Model:
- **Free Tier:** Limited access (3 AI interviews/month, basic DSA)
- **Pro ($400/month):** 15 interviews, 50 code sessions, full DSA
- **Elite ($800/month):** 30 interviews, 150 sessions, all tracks

### Key UI/UX Patterns:
- Clean, modern dashboard with cards
- Sidebar navigation with icons
- Progress tracking with visual indicators
- Pattern-based problem organization
- Real-time code editor
- Instant feedback system

---

## 🎯 LIGHT AI MVP - DSA FOCUS

### Phase 1: Core DSA Practice Platform (2-3 weeks)

#### 1.1 Problem Management System
**Database Schema:**
```sql
-- Problems Table
CREATE TABLE problems (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  difficulty VARCHAR(20) NOT NULL, -- Easy, Medium, Hard
  pattern VARCHAR(100) NOT NULL, -- Array, String, Two Pointers, etc.
  description TEXT NOT NULL,
  constraints TEXT,
  examples JSON, -- Array of {input, output, explanation}
  hints JSON, -- Array of hint strings
  test_cases JSON, -- Array of test cases
  solution_template JSON, -- {javascript: "", python: "", java: ""}
  company_tags JSON, -- ["Google", "Amazon", etc.]
  acceptance_rate DECIMAL(5,2),
  likes INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0,
  video_url VARCHAR(500),
  article_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DSA Patterns Table
CREATE TABLE dsa_patterns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50), -- Emoji or icon name
  difficulty_level INTEGER, -- 1-5
  total_problems INTEGER DEFAULT 0,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Problem-Pattern Mapping (Many-to-Many)
CREATE TABLE problem_patterns (
  problem_id INTEGER REFERENCES problems(id),
  pattern_id INTEGER REFERENCES dsa_patterns(id),
  PRIMARY KEY (problem_id, pattern_id)
);

-- User Problem Progress
CREATE TABLE user_problem_progress (
  user_id INTEGER REFERENCES users(id),
  problem_id INTEGER REFERENCES problems(id),
  status VARCHAR(20), -- not_started, attempted, solved
  attempts INTEGER DEFAULT 0,
  last_submission_id INTEGER,
  first_solved_at TIMESTAMP,
  last_attempted_at TIMESTAMP,
  PRIMARY KEY (user_id, problem_id)
);

-- Bookmarks
CREATE TABLE bookmarks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  problem_id INTEGER REFERENCES problems(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, problem_id)
);

-- Update submissions table
ALTER TABLE submissions ADD COLUMN execution_time INTEGER; -- in ms
ALTER TABLE submissions ADD COLUMN memory_used INTEGER; -- in KB
ALTER TABLE submissions ADD COLUMN test_cases_passed INTEGER;
ALTER TABLE submissions ADD COLUMN total_test_cases INTEGER;
```

**API Endpoints:**
```
GET    /api/problems                    - List all problems with filters
GET    /api/problems/:slug              - Get single problem details
POST   /api/problems/:slug/submit       - Submit solution
GET    /api/problems/:slug/submissions  - Get user's submissions
POST   /api/problems/:slug/bookmark     - Toggle bookmark
GET    /api/problems/:slug/hints        - Get hints progressively
GET    /api/patterns                    - List all patterns
GET    /api/patterns/:slug              - Get pattern with problems
GET    /api/problems/:slug/discussion   - Get discussion threads (Phase 2)
```

**Problem List Page Features:**
- Filter by: Difficulty, Pattern, Company, Status (Solved/Attempted/Not Started)
- Sort by: Difficulty, Acceptance Rate, Frequency
- Search by title/tags
- Show: Problem number, Title, Difficulty badge, Acceptance %, Companies
- Status indicators: ✓ Solved, ⚠ Attempted, 🔖 Bookmarked

#### 1.2 Enhanced Code Editor & Execution
**Features:**
- Monaco Editor with themes (VS Code Dark, Light)
- Multi-language support: JavaScript, Python, Java, C++
- Real-time syntax validation
- Code templates for each language
- Custom input testing
- Run Code vs Submit
- Test case results display
- Execution time & memory stats
- Solution comparison (after solving)

**Backend: Docker Code Execution Service**
```javascript
// routes/execute.js
POST /api/execute
{
  "code": "function twoSum(nums, target) {...}",
  "language": "javascript",
  "problemId": 1,
  "testCases": [...],
  "timeLimit": 3000, // ms
  "memoryLimit": 256 // MB
}

Response:
{
  "success": true,
  "results": [
    {
      "input": "[2,7,11,15], 9",
      "expected": "[0,1]",
      "actual": "[0,1]",
      "passed": true,
      "executionTime": 45,
      "memoryUsed": 128
    }
  ],
  "totalPassed": 10,
  "totalTests": 10,
  "overallStatus": "accepted"
}
```

#### 1.3 Pattern-Based Learning System
**DSA Patterns to Include (Priority Order):**
1. Arrays & Hashing (15 problems)
2. Two Pointers (12 problems)
3. Sliding Window (10 problems)
4. Binary Search (10 problems)
5. Linked List (12 problems)
6. Trees (15 problems)
7. Graphs (12 problems)
8. Dynamic Programming - Basic (10 problems)
9. Stack (8 problems)
10. Heap/Priority Queue (8 problems)

**Pattern Page Features:**
- Pattern description & when to use
- Visual diagram of the pattern
- Step-by-step explanation
- Code template for the pattern
- List of problems (Easy → Medium → Hard)
- Progress bar (X/Y problems solved)
- Estimated time to complete

#### 1.4 Enhanced Dashboard
**Widgets:**
1. **Progress Overview**
   - Total problems solved (Easy/Medium/Hard breakdown)
   - Current streak & longest streak
   - XP and Level with progress bar
   - Weekly XP graph

2. **Pattern Progress Grid**
   - Visual grid of all patterns
   - Each pattern shows: Icon, Name, X/Y solved, Progress %
   - Color coding: Gray (not started), Yellow (in progress), Green (completed)

3. **Recent Activity Timeline**
   - Last 10 submissions with problem, status, time
   - Group by date

4. **Recommended Problems**
   - AI-suggested based on:
     * Weak patterns (low solve rate)
     * Similar to recently solved
     * Trending in interviews

5. **Daily Challenge Card**
   - One problem per day (rotates midnight)
   - Bonus XP for solving (2x)
   - Special badge for 7-day daily challenge streak

6. **Achievement Showcase**
   - Display earned badges
   - Progress on locked achievements

#### 1.5 User Profile Page
**URL:** `/profile` or `/profile/:username`

**Sections:**
1. **Header**
   - Avatar (upload or default)
   - Username, Full Name, Email
   - Join date, Last active
   - Edit Profile button

2. **Statistics Card**
   - Total problems solved (Easy/Medium/Hard)
   - Acceptance rate
   - Total submissions
   - Ranking (among all users)
   - Strongest patterns (top 3)

3. **Heatmap Calendar**
   - GitHub-style contribution graph
   - Shows daily activity for past year
   - Color intensity = problems solved that day
   - Hover shows date + count

4. **Skills Radar Chart**
   - Visual representation of pattern mastery
   - 8-axis radar showing proficiency in each category

5. **Submission History**
   - Filterable list of all submissions
   - Columns: Problem, Language, Status, Time, Memory, Date
   - Click to view code

6. **Achievements & Badges**
   - Grid of earned badges with unlock dates
   - Locked badges show requirements

7. **Settings Tab**
   - Account settings
   - Change password
   - Email preferences
   - Theme selection
   - Code editor preferences
   - Delete account

---

## 🏗️ TECHNICAL ARCHITECTURE

### Frontend Structure:
```
/
├── index.html              # Landing page
├── auth/
│   ├── login.html
│   └── signup.html
├── dashboard.html          # Main dashboard
├── problems/
│   ├── index.html          # Problems list
│   └── [slug].html         # Individual problem (solve page)
├── patterns/
│   ├── index.html          # All patterns
│   └── [slug].html         # Pattern detail page
├── profile.html            # User profile
├── leaderboard.html        # Global rankings
├── visualize.html          # Algorithm visualizer (existing)
└── history.html            # Activity timeline
```

### Backend Structure:
```
server.js
routes/
├── auth.js                 # ✅ EXISTS
├── progress.js             # ✅ EXISTS
├── problems.js             # NEW - CRUD problems
├── patterns.js             # NEW - Pattern management
├── submissions.js          # NEW - Enhanced submissions
├── execute.js              # NEW - Docker code execution
├── leaderboard.js          # NEW - Rankings
└── profile.js              # NEW - User profiles
services/
├── codeExecutor.js         # NEW - Docker integration
├── xpCalculator.js         # ENHANCE - More rules
└── achievementChecker.js   # ENHANCE - More badges
```

### Database Schema Complete:
- ✅ users
- ✅ user_progress
- ✅ submissions
- ✅ achievements
- ✅ user_achievements
- ✅ daily_activity
- 🆕 problems
- 🆕 dsa_patterns
- 🆕 problem_patterns
- 🆕 user_problem_progress
- 🆕 bookmarks
- 🆕 test_cases
- 🆕 discussions (Phase 2)
- 🆕 comments (Phase 2)

---

## 🎨 UI/UX REQUIREMENTS

### Design System:
- **Color Palette:**
  - Primary: #0071E3 (Apple Blue)
  - Success: #30D158 (Green)
  - Warning: #FBBF24 (Yellow)
  - Error: #FF453A (Red)
  - Background: #000000 → #1a1a1c gradient
  - Cards: rgba(255,255,255,0.05) with border rgba(255,255,255,0.1)

- **Typography:**
  - Font: Inter (Google Fonts)
  - Headings: 600-800 weight
  - Body: 400-500 weight
  - Code: Fira Code or Monaco

- **Components:**
  - Rounded corners: 12px (cards), 8px (buttons)
  - Shadows: Subtle glows for focus/hover
  - Transitions: 0.2s ease for all interactions
  - Loading states: Skeleton screens, not spinners

### Responsive Design:
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly (44px min touch target)

---

## 🔒 SECURITY REQUIREMENTS

### Authentication:
- ✅ JWT with 7-day expiry
- ✅ bcrypt password hashing (salt rounds: 10)
- 🆕 Rate limiting on login (5 attempts per 15 min)
- 🆕 Email verification (send verification link)
- 🆕 Password reset flow (forgot password)
- 🆕 Session management (logout all devices)

### Authorization:
- Protected routes check JWT on every request
- User can only access own data (except public profiles)
- Admin role for problem management (future)

### Input Validation:
- Server-side validation for all inputs
- Sanitize user content (XSS prevention)
- SQL injection prevention (parameterized queries)
- File upload validation (avatar images)

### Code Execution:
- Docker containers with resource limits
- Sandboxed environment (no network, no file system)
- Timeout enforcement (3 sec default)
- Memory limits (256 MB default)
- Rate limiting (10 executions per minute)

---

## ⚡ PERFORMANCE REQUIREMENTS

### Page Load Times:
- Landing page: < 1.5s
- Dashboard: < 2s
- Problem page: < 2s
- Code execution: < 5s

### Database:
- Indexes on: user_id, problem_id, pattern_id, slug
- Connection pooling (max 20 connections)
- Query optimization (no N+1 queries)

### Caching:
- Problem data: Redis cache (1 hour TTL)
- User progress: Cache on client (sync on submit)
- Leaderboard: Cache (5 min TTL)

### CDN:
- Static assets served from CDN
- Image optimization (WebP format)
- Minified CSS/JS

---

## 🧪 TESTING REQUIREMENTS

### Unit Tests:
- All API endpoints (Jest + Supertest)
- XP calculation logic
- Achievement checking logic
- Code execution service

### Integration Tests:
- Complete user flows:
  1. Signup → Login → Dashboard
  2. Browse problems → Solve → Submit
  3. Track progress → Earn achievements

### Manual Testing Checklist:
- [ ] All buttons work
- [ ] All forms validate correctly
- [ ] All links go to correct pages
- [ ] Mobile responsive works
- [ ] Authentication flow secure
- [ ] Code execution safe
- [ ] No console errors
- [ ] No memory leaks

---

## 📈 ANALYTICS & MONITORING

### Track:
- User signups per day
- Problems solved per day
- Most popular problems
- Average solve time per problem
- User retention (7-day, 30-day)
- API response times
- Error rates

### Tools:
- PostgreSQL built-in analytics
- Custom admin dashboard (Phase 2)
- Error logging (Winston)

---

## 🚢 DEPLOYMENT STRATEGY

### Development:
- Local: localhost:3000
- Database: PostgreSQL 18 local

### Staging:
- Railway/Render free tier
- Test with real users (beta)

### Production:
- **Backend:** Railway/Render/DigitalOcean
- **Database:** Railway Postgres or Supabase
- **CDN:** Cloudflare
- **Docker:** Docker Hub for code execution images
- **Domain:** Custom domain (lightai.dev)
- **SSL:** Let's Encrypt (auto-renew)
- **Monitoring:** UptimeRobot

### Environment Variables:
```
# Production
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://...
JWT_SECRET=<strong-random-key>
REDIS_URL=redis://...
DOCKER_REGISTRY=hub.docker.com/lightai
EMAIL_API_KEY=<sendgrid-key>
CLOUDINARY_URL=<for-images>
```

---

## 📅 DEVELOPMENT TIMELINE (MVP)

### Week 1: Database & API Foundation
**Days 1-2:** Database Schema
- Create all new tables
- Write migration scripts
- Seed 50 problems (10 patterns × 5 problems)
- Create indexes

**Days 3-5:** API Development
- Problems API (CRUD, filters, search)
- Patterns API
- Enhanced submissions API
- Profile API
- Leaderboard API

**Days 6-7:** Code Execution Service
- Docker setup
- Multi-language support
- Test case runner
- Security hardening

### Week 2: Frontend Development
**Days 1-2:** Problems List Page
- Grid/list view toggle
- Filters & sorting
- Search functionality
- Status indicators
- Pagination

**Days 3-4:** Problem Solve Page
- Monaco editor integration
- Multi-language tabs
- Test case UI
- Run vs Submit
- Results display
- Hints system

**Days 5-7:** Dashboard Enhancements
- Pattern progress grid
- Activity timeline
- Daily challenge
- Recommended problems
- XP graph

### Week 3: Profile & Polish
**Days 1-2:** User Profile Page
- Stats display
- Heatmap calendar
- Submission history
- Settings panel

**Days 3-4:** Pattern Pages
- Pattern description
- Problem list per pattern
- Progress tracking

**Days 5-7:** Testing & Bug Fixes
- Manual testing all features
- Fix all bugs
- Security audit
- Performance optimization
- Documentation

---

## 🎯 SUCCESS CRITERIA

### Must Have (MVP):
- [ ] 50+ problems across 10 patterns
- [ ] Problems list with working filters
- [ ] Code editor with 3+ languages
- [ ] Code execution with Docker
- [ ] Test cases passing/failing
- [ ] Progress tracking working
- [ ] Dashboard shows real data
- [ ] Pattern-based organization
- [ ] User profile with stats
- [ ] Authentication 100% secure
- [ ] No bugs or errors
- [ ] Mobile responsive
- [ ] Fast performance (< 2s loads)

### Nice to Have (Post-MVP):
- AI hints (GPT-4 integration)
- Video explanations
- Discussion forums
- Mock interviews
- Company-specific prep
- Team features
- Premium subscriptions

---

## 💰 MONETIZATION STRATEGY (Future)

### Free Tier:
- 20 problems unlocked
- Basic patterns only
- Limited code execution (10/day)
- Community support

### Pro Tier ($9/month):
- All problems unlocked
- Unlimited code execution
- Priority support
- No ads
- Detailed analytics

### Premium Tier ($19/month):
- Pro + AI hints
- Video explanations
- Mock interviews
- Resume review
- Interview prep guides

---

## 🎓 PROBLEM CONTENT STRATEGY

### Sources:
1. LeetCode-inspired (public domain problems)
2. GeeksforGeeks patterns
3. Original problems by you
4. Company interview questions (anonymized)

### Structure:
Each problem must have:
- Clear title
- Difficulty level
- Pattern tags
- Problem statement (concise)
- 2-3 examples with explanations
- Constraints
- 3 hints (progressive difficulty)
- Starter code templates (3 languages)
- 10-15 test cases (5 visible, rest hidden)
- Editorial solution (after solving)
- Time & space complexity
- Company tags (where asked)

---

## 📝 NEXT STEPS

1. **Review this specification** - Confirm you agree with the approach
2. **I'll create a visual flowchart** - Complete user journeys
3. **Start Week 1 development** - Database schema first
4. **Daily progress reviews** - Ensure quality at every step
5. **Deploy to staging** - Test with real users
6. **Launch MVP** - Go live! 🚀

---

**Questions for you:**
1. Is 50 problems enough for MVP, or do you want more?
2. Do you want AI features in MVP, or save for v2?
3. Should I proceed with this plan?

Let me know and I'll start building immediately! 💪
