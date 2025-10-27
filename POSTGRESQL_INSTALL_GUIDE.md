# 🚀 PostgreSQL Installation Guide for Windows

## Current Status
✅ Server is running in **DEMO MODE** at http://localhost:3000  
⚠️  Authentication disabled (no database)

---

## 🎯 Quick Test First!

Before installing PostgreSQL, test these features:

### ✨ Working Features (No Database Required):
1. **Landing Page**: http://localhost:3000
   - Hero section, features showcase
   
2. **Dashboard**: http://localhost:3000/dashboard
   - XP system, streaks, achievements (demo data)
   
3. **Problem Solver**: http://localhost:3000/solve
   - Code editor with Monaco
   - JavaScript execution (client-side)
   - Test cases validation
   - 3 problems available
   
4. **Visual Debugger**: http://localhost:3000/visualize.html
   - Algorithm visualization
   - Two Sum, Bubble Sort, Binary Search, Reverse Array
   - Step-by-step playback

### ❌ Features Requiring Database:
- User signup/login
- Progress tracking
- Submission history
- Real achievements unlock

---

## 📥 PostgreSQL Installation (When Ready)

### Option 1: Official Installer (Recommended)

**Step 1: Download**
```
https://www.postgresql.org/download/windows/
```
- Click "Download the installer"
- Choose latest version (16.x recommended)
- Download the Windows x86-64 installer

**Step 2: Run Installer**
- Double-click the downloaded `.exe` file
- Click "Next" through the wizard

**Step 3: Installation Settings**
- **Components**: Select all (PostgreSQL Server, pgAdmin 4, Command Line Tools)
- **Data Directory**: Use default (`C:\Program Files\PostgreSQL\16\data`)
- **Password**: Set a strong password for `postgres` user
  - ⚠️ **REMEMBER THIS PASSWORD!** You'll need it later
- **Port**: Use default `5432`
- **Locale**: Use default

**Step 4: Complete Installation**
- Click "Next" → "Install"
- Wait 5-10 minutes
- Click "Finish"

**Step 5: Verify Installation**
```powershell
# Check version (restart PowerShell first)
psql --version
# Should show: psql (PostgreSQL) 16.x
```

---

### Option 2: Docker (For Advanced Users)

```powershell
# Install Docker Desktop first: https://www.docker.com/products/docker-desktop

# Run PostgreSQL container
docker run --name light-ai-db `
  -e POSTGRES_PASSWORD=yourpassword `
  -e POSTGRES_DB=light_ai `
  -p 5432:5432 `
  -d postgres:16

# Verify running
docker ps
```

---

## ⚙️ Configure Light AI After Installation

**Step 1: Create Database**
```powershell
# Connect to PostgreSQL
psql -U postgres

# Enter your password when prompted

# Create database
CREATE DATABASE light_ai;

# Verify
\l

# Exit
\q
```

**Step 2: Update .env File**

Open `c:\Users\Bhanu Bisht\OneDrive\Desktop\light-ai\.env` and uncomment these lines:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=light_ai
DB_USER=postgres
DB_PASSWORD=your_actual_password_here

# JWT Configuration
JWT_SECRET=generate_this_using_command_below
JWT_EXPIRES_IN=7d
```

**Step 3: Generate JWT Secret**
```powershell
# Run this in PowerShell to generate random secret
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})

# Copy the output and paste as JWT_SECRET in .env
```

**Step 4: Restart Server**
```powershell
# Stop current server (Ctrl+C)
# Then restart
node server.js

# You should see:
# ✅ Connected to PostgreSQL database
# ✅ Database schema initialized successfully
# 🔐 Auth API: http://localhost:3000/api/auth
```

The server will automatically:
- Create 7 database tables
- Set up indexes
- Initialize schemas

---

## 🧪 Test Authentication After Setup

### Test Signup:
```powershell
$body = @{
    username = "testuser"
    email = "test@example.com"
    password = "Test1234"
    fullName = "Test User"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/signup" -Method POST -Body $body -ContentType "application/json"
```

### Test Login:
```powershell
$body = @{
    email = "test@example.com"
    password = "Test1234"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

### Or Use Browser:
1. Go to http://localhost:3000/signup.html
2. Create account
3. Auto-redirect to dashboard
4. Your progress will be saved!

---

## 🔧 Troubleshooting

### "psql: command not found"
**Solution**: Add PostgreSQL to PATH
```powershell
# Add to System PATH (replace 16 with your version):
C:\Program Files\PostgreSQL\16\bin

# Restart PowerShell
```

### "Connection refused"
**Solution**: Start PostgreSQL service
```powershell
# Check service status
Get-Service -Name postgresql*

# Start service
Start-Service postgresql-x64-16
```

### "Password authentication failed"
**Solution**: Check your password in `.env` matches PostgreSQL password

### Port 5432 already in use
**Solution**: Another database is running
```powershell
# Find what's using port 5432
netstat -ano | findstr :5432

# Stop the process or change DB_PORT in .env
```

---

## 📊 Database Tables (Auto-Created)

When you start the server with database configured, these tables are created:

1. **users** - User accounts (username, email, password_hash)
2. **user_progress** - XP, level, streaks, problems solved
3. **problems** - Coding problems with test cases
4. **submissions** - User submission history
5. **achievements** - Available achievements
6. **user_achievements** - Unlocked achievements
7. **daily_activity** - Daily activity for streaks

---

## 🎯 Recommendation

### For Testing Now:
✅ **Test the application WITHOUT PostgreSQL**
   - All frontend features work
   - Problem solving works
   - Visual debugger works
   - Only missing: User accounts and progress saving

### Install PostgreSQL When:
1. You want to save user progress
2. You want authentication (signup/login)
3. You're ready to deploy to production
4. You want submission history

---

## 📚 Resources

- **PostgreSQL Official**: https://www.postgresql.org/
- **pgAdmin (GUI Tool)**: Installed with PostgreSQL
- **Documentation**: https://www.postgresql.org/docs/
- **Docker PostgreSQL**: https://hub.docker.com/_/postgres

---

## ✅ Current Server Status

```
🚀 Server: http://localhost:3000 (RUNNING)
📊 Dashboard: http://localhost:3000/dashboard
💻 Problem Solver: http://localhost:3000/solve
🎨 Visual Debugger: http://localhost:3000/visualize.html

⚠️  Database: Not connected (DEMO MODE)
✨ All features work except authentication
```

**Next Steps:**
1. ✅ Test the app now → http://localhost:3000
2. ⏭️ Install PostgreSQL when ready (follow this guide)
3. ⚙️ Configure .env with your database credentials
4. 🔄 Restart server to enable authentication

---

**Questions?** Check `DATABASE_SETUP.md` or `PHASE_3A_COMPLETE.md` for more details!
