# 🚀 Quick Start Guide - Light AI Development

**Last Updated:** October 27, 2025

---

## 📁 Project Structure

```
light-ai/                        (7 files - Clean & Organized)
│
├── 🎨 Frontend Files
│   ├── index.html               (8.3 KB) - Landing page
│   ├── styles.css              (18.5 KB) - Apple-inspired design system
│   └── app.js                   (5.8 KB) - Interactive behaviors
│
├── 📋 Configuration
│   └── package.json            (311 B) - Project metadata
│
└── 📖 Documentation
    ├── README.md                (2.9 KB) - Project overview
    ├── PROJECT_STATUS.md       (13.4 KB) - Complete roadmap & progress
    ├── CLEANUP_SUMMARY.md       (8.0 KB) - Transformation details
    └── QUICKSTART.md            (This file)
```

**Total Project Size:** ~57 KB *(incredibly lightweight)*

---

## ⚡ Instant Setup (< 30 seconds)

### Option 1: Direct Browser Open
```powershell
# Windows
cd "C:\Users\Bhanu Bisht\OneDrive\Desktop\light-ai"
start index.html

# Mac/Linux
cd ~/Desktop/light-ai
open index.html
```

### Option 2: Local Development Server
```powershell
# Python 3
python -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server -p 8000

# Visit: http://localhost:8000
```

**No build tools. No npm install. No webpack. Just code.**

---

## 🎯 Development Workflow

### 1. Edit Files
```powershell
# Open in VS Code
code .

# Or your preferred editor
notepad index.html
notepad styles.css
notepad app.js
```

### 2. Refresh Browser
- Save changes
- Hit `Ctrl+R` (Windows) or `Cmd+R` (Mac)
- See updates instantly

### 3. Check Console
- Open DevTools: `F12` or `Ctrl+Shift+I`
- Console shows performance metrics
- Look for errors (should be zero)

---

## 🏗️ Current Phase: MVP Dashboard

### What to Build Next

#### Priority 1: Dashboard Layout (2-3 days)
**File:** Create `dashboard.html`

Structure:
```html
<div class="dashboard">
  <aside class="sidebar">
    <!-- Navigation -->
  </aside>
  <main class="dashboard-main">
    <!-- XP bar, stats, problem list -->
  </main>
</div>
```

**Key Components:**
- [ ] Sidebar with pattern categories
- [ ] XP progress bar with level
- [ ] Daily streak calendar
- [ ] Problem list table
- [ ] Achievement showcase

#### Priority 2: Problem Solving Interface (3-4 days)
**File:** Create `solve.html`

Structure:
```html
<div class="solve-layout">
  <div class="problem-panel">
    <!-- Problem statement, examples -->
  </div>
  <div class="code-editor">
    <!-- Monaco editor integration -->
  </div>
  <div class="ai-hints-panel">
    <!-- Collapsible hint system -->
  </div>
</div>
```

**Key Features:**
- [ ] Monaco editor (VS Code)
- [ ] Multi-language support
- [ ] Test case runner
- [ ] AI hint button
- [ ] Timer & submission

#### Priority 3: Visual Debugger (5-7 days)
**File:** Create `debugger.html`

Structure:
```html
<div class="debugger">
  <canvas id="visualization"></canvas>
  <div class="controls">
    <!-- Play, pause, step, rewind -->
  </div>
  <div class="state-panel">
    <!-- Variables, call stack -->
  </div>
</div>
```

**Key Features:**
- [ ] Canvas-based rendering
- [ ] Array/tree/graph visualization
- [ ] Playback controls
- [ ] Export as GIF

---

## 🎨 Design System Reference

### Colors
```css
--primary: #0071E3       /* Apple blue */
--secondary: #00D4FF     /* Cyan accent */
--bg: #000000            /* Deep black */
--surface: #1C1C1E       /* Elevated surface */
--text: #FFFFFF          /* Primary text */
--text-secondary: #B0B0B5 /* Secondary text */
```

### Typography
```css
font-family: -apple-system, 'SF Pro Display', 'Inter', sans-serif;
letter-spacing: -0.01em to -0.03em (tighter = larger text)
font-weight: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
```

### Spacing Scale
```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 80px, 120px
Use multiples of 4 for consistency
```

### Border Radius
```css
--radius-sm: 8px      /* Small elements */
--radius-md: 12px     /* Cards */
--radius-lg: 16px     /* Panels */
--radius-xl: 28px     /* Large cards */
Buttons: 980px        /* Pill-shaped */
```

### Shadows
```css
--shadow-sm: 0 2px 8px rgba(0,0,0,0.12)
--shadow-md: 0 8px 24px rgba(0,0,0,0.16)
--shadow-lg: 0 16px 48px rgba(0,0,0,0.20)
--shadow-glow: 0 0 40px rgba(0,113,227,0.3)
```

### Animations
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-smooth: 300ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1)

/* Always use cubic-bezier for premium feel */
```

---

## 🧪 Testing Checklist

### Before Committing Changes

#### Visual Check
- [ ] Looks good on 1920x1080 (desktop)
- [ ] Looks good on 1366x768 (laptop)
- [ ] Looks good on 768px (tablet)
- [ ] Looks good on 375px (mobile)

#### Performance
- [ ] No layout shifts (CLS = 0)
- [ ] Animations run at 60fps
- [ ] Page loads under 2 seconds
- [ ] Images optimized (if any added)

#### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Alt text on images
- [ ] Color contrast ratio > 4.5:1

#### Cross-Browser
- [ ] Chrome (primary)
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## 🐛 Common Issues & Fixes

### Issue 1: Animations Stuttering
**Cause:** Too many elements animating at once  
**Fix:** Use `will-change: transform` sparingly, remove after animation

### Issue 2: Backdrop-filter Not Working
**Cause:** Browser doesn't support it  
**Fix:** Already have fallback in CSS (`background: var(--blur-bg)`)

### Issue 3: Layout Breaking on Mobile
**Cause:** Forgot to test responsive breakpoints  
**Fix:** Check media queries at 768px, 480px

### Issue 4: Console Errors
**Cause:** JavaScript trying to access elements that don't exist  
**Fix:** Add null checks: `if (element) { ... }`

---

## 📦 Future Dependencies (Phase 3)

When we move to React + backend, we'll need:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "@monaco-editor/react": "^4.5.0",
    "d3": "^7.8.0",
    "framer-motion": "^10.12.0"
  }
}
```

**But not yet!** Keep it simple for MVP.

---

## 🚀 Deployment (When Ready)

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Custom domain
vercel --prod --alias lightai.dev
```

### Option 2: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Production
netlify deploy --prod
```

### Option 3: GitHub Pages
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/light-ai.git
git push -u origin main

# Enable Pages in repo settings
```

---

## 📊 Performance Targets

### Lighthouse Scores (Minimum)
- **Performance:** 95+
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100

### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 1.5s
- **FID (First Input Delay):** < 50ms
- **CLS (Cumulative Layout Shift):** < 0.05

### File Sizes
- HTML: < 20 KB
- CSS: < 50 KB
- JS: < 100 KB (before dashboard)
- Total: < 200 KB (gzipped)

---

## 🎯 Development Priorities

### This Week
1. ✅ Landing page polish (DONE)
2. 🔄 Dashboard layout structure
3. 🔄 XP system UI
4. 🔄 Problem list table

### Next Week
1. Monaco editor integration
2. Test case runner
3. AI hint panel mockup
4. Timer component

### Month 1 Goal
**Launch MVP beta** with:
- Working dashboard
- 50 curated problems
- Basic code editor
- Manual test cases (no backend yet)

---

## 💡 Pro Tips

### 1. Keep It Simple
Don't add complexity until you need it. Pure HTML/CSS/JS is fine for MVP.

### 2. Measure Everything
Use `performance.now()` to track slow operations. Aim for < 16ms per frame.

### 3. Mobile First
Design for 375px width first, then scale up. Easier than scaling down.

### 4. Git Commit Often
```bash
git commit -m "feat: add XP progress bar"
git commit -m "fix: mobile nav overflow"
git commit -m "style: improve button hover states"
```

### 5. Document as You Go
If you create a new component, add a comment explaining how it works.

---

## 📞 Need Help?

### Resources
- **CSS Reference:** [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **JavaScript:** [JavaScript.info](https://javascript.info/)
- **Design Inspiration:** [Dribbble](https://dribbble.com/tags/dashboard)
- **Icons:** [Emoji](https://emojipedia.org/) (we're using emoji for now)

### Debugging Steps
1. Open DevTools Console (F12)
2. Check for errors (red messages)
3. Use `console.log()` to inspect values
4. Check CSS in Elements tab
5. Test in incognito (clear cache issues)

---

## 🎉 You're Ready!

**Current Status:** Landing page complete, ready for dashboard development.

**Next Command:**
```powershell
# Open project
cd "C:\Users\Bhanu Bisht\OneDrive\Desktop\light-ai"
code .

# Start coding the dashboard!
```

---

*"Keep it simple. Keep it fast. Keep it premium."*

⚡ **Light AI** - Built with precision, shipped with pride.
