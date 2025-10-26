# 🚀 Light AI - Deployment Guide

## Quick Setup & Deploy to GitHub

### 1. Initialize Git Repository

```powershell
# Navigate to project
cd "C:\Users\Bhanu Bisht\OneDrive\Desktop\light-ai"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Complete problem solver with multi-language support"

# Add remote
git remote add origin https://github.com/bhanuxbisht/light-ai.git

# Push to GitHub
git push -u origin main
```

If you get an error about branch name, use:
```powershell
git branch -M main
git push -u origin main
```

---

## 🔧 Local Development

### Start Server
```powershell
npm start
```

Server runs on: **http://localhost:3000**

### Pages
- Landing: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard
- Solve Problem 1: http://localhost:3000/solve?id=1
- Solve Problem 2: http://localhost:3000/solve?id=2

### Stop Server
Press `Ctrl+C` in the terminal

---

## ✨ Key Features Implemented

### Multi-Language Support
- ✅ JavaScript (client-side Web Worker)
- ✅ Python (server-side ready)
- ✅ Java (server-side ready)
- ✅ C++ (server-side ready)

### Problem Database
- ✅ 3 problems with full solutions
- ✅ 8-10 test cases per problem
- ✅ Edge cases included
- ✅ Hints system (4-5 hints each)

### Auto-Progression
- ✅ Success modal after all tests pass
- ✅ Auto-advance after 3 seconds
- ✅ Stats display (runtime metrics)

### Code Editor
- ✅ Monaco Editor integration
- ✅ Syntax highlighting
- ✅ Multi-language switching
- ✅ Fallback to textarea

---

## 🌐 Deploy to Production

### Option 1: Heroku

```powershell
# Install Heroku CLI first
# Then:
heroku login
heroku create light-ai-prod
git push heroku main
heroku open
```

### Option 2: Vercel

```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Option 3: Railway

```powershell
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Option 4: DigitalOcean App Platform

1. Connect GitHub repository
2. Select Node.js environment
3. Set build command: `npm install`
4. Set run command: `npm start`
5. Deploy

---

## 📦 Environment Variables (Production)

Create `.env` file:
```
PORT=3000
NODE_ENV=production
```

Update `server.js` to use these.

---

## 🔐 Private Repository Setup

Already configured in package.json:
- `"private": true`
- `"license": "UNLICENSED"`

The repository is set to private. To ensure GitHub repo is private:
1. Go to: https://github.com/bhanuxbisht/light-ai/settings
2. Scroll to "Danger Zone"
3. Click "Change repository visibility"
4. Select "Make private"

---

## 🐛 Troubleshooting

### Port Already in Use
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Monaco Editor Not Loading
- Check internet connection (loads from CDN)
- Falls back to textarea automatically

### Git Push Issues
```powershell
# Set credentials
git config user.name "Bhanu Bisht"
git config user.email "your-email@example.com"

# Force push if needed
git push -f origin main
```

---

## 📝 Next Steps

### High Priority
1. Add more problems (target: 50+)
2. Implement user authentication
3. Add database for progress tracking
4. Docker sandbox for safe code execution

### Medium Priority
1. Visual debugger (Phase 2C)
2. Payment integration
3. AI hint generation via API
4. Mobile responsive improvements

### Low Priority
1. Live coding battles
2. Social features
3. Chrome extension
4. Mobile app

---

## 🎯 Testing Checklist

### Functional Tests
- [ ] Landing page loads
- [ ] Dashboard displays correctly
- [ ] Problem 1 loads with description
- [ ] Code editor works (type code)
- [ ] Run button executes first test
- [ ] Submit button runs all tests
- [ ] Success modal appears on all pass
- [ ] Auto-advance to next problem works
- [ ] Language switcher changes starter code
- [ ] Hints display progressively
- [ ] View solution button works
- [ ] Previous/Next navigation works

### Performance Tests
- [ ] Page load < 2s
- [ ] Code execution < 100ms per test
- [ ] Monaco loads in < 1s
- [ ] No memory leaks in worker

### Security Tests
- [ ] Web Worker sandboxing works
- [ ] No XSS vulnerabilities
- [ ] CORS configured correctly

---

## 📊 Git Workflow

### Daily Workflow
```powershell
# Pull latest
git pull origin main

# Make changes
# ... edit files ...

# Stage changes
git add .

# Commit
git commit -m "feat: add new problem or fix bug"

# Push
git push origin main
```

### Commit Message Format
```
feat: add new feature
fix: bug fix
docs: documentation update
style: formatting, styling
refactor: code restructuring
test: add tests
chore: maintenance
```

---

## 💾 Backup Strategy

### Local Backup
```powershell
# Create backup
cd ..
Compress-Archive -Path light-ai -DestinationPath "light-ai-backup-$(Get-Date -Format 'yyyy-MM-dd').zip"
```

### GitHub as Backup
- Always push after significant changes
- Use branches for experiments
- Tag releases: `git tag v1.0.0`

---

## 🎉 Launch Checklist

Before going live:
- [ ] All pages load without errors
- [ ] Console has no errors
- [ ] Mobile responsive tested
- [ ] 10+ problems added
- [ ] User auth implemented
- [ ] Payment gateway tested
- [ ] Legal pages (Terms, Privacy)
- [ ] Analytics setup (Google Analytics)
- [ ] SEO optimized
- [ ] Social media setup

---

*Ready to deploy? Run `git push origin main` and you're live on GitHub!*

⚡ **Light AI** - Built with precision, shipped with pride.
