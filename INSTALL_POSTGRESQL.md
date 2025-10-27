# 🚀 Install PostgreSQL on Windows - Step by Step

## ⚡ Quick Installation (Choose ONE method)

---

## Method 1: Direct Download (Recommended for Beginners) ⭐

### Step 1: Download Installer
**Click this link to download:**
👉 https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

- Select: **PostgreSQL 16.5 Windows x86-64**
- File size: ~250 MB
- Click "Download"

### Step 2: Run the Installer
1. Double-click the downloaded file: `postgresql-16.5-1-windows-x64.exe`
2. Click "Yes" on User Account Control prompt
3. Click "Next" on Welcome screen

### Step 3: Installation Directory
- **Default**: `C:\Program Files\PostgreSQL\16`
- ✅ Keep the default (recommended)
- Click "Next"

### Step 4: Select Components
✅ Check ALL components:
- [x] PostgreSQL Server
- [x] pgAdmin 4 (GUI tool)
- [x] Stack Builder (optional tools)
- [x] Command Line Tools

Click "Next"

### Step 5: Data Directory
- **Default**: `C:\Program Files\PostgreSQL\16\data`
- ✅ Keep the default
- Click "Next"

### Step 6: **IMPORTANT - Set Password**
```
Enter Password: [Type a strong password]
Retype Password: [Same password]
```

⚠️ **REMEMBER THIS PASSWORD!** Write it down:
```
My PostgreSQL Password: ___________________
```

You'll need this for `.env` configuration!

Click "Next"

### Step 7: Port Number
- **Default**: `5432`
- ✅ Keep the default
- Click "Next"

### Step 8: Locale
- **Default**: [Default locale]
- ✅ Keep the default
- Click "Next"

### Step 9: Review and Install
- Review your settings
- Click "Next"
- Wait 5-10 minutes for installation
- ☕ Grab a coffee!

### Step 10: Complete
- **UNCHECK** "Stack Builder" (not needed now)
- Click "Finish"

---

## Method 2: Using Chocolatey (For Advanced Users)

```powershell
# Install Chocolatey first if you don't have it
# Run PowerShell as Administrator

# Install PostgreSQL
choco install postgresql16 --params '/Password:YourPassword'
```

---

## Method 3: Using Docker (Alternative)

```powershell
# Requires Docker Desktop installed
# Download from: https://www.docker.com/products/docker-desktop

# Run PostgreSQL in container
docker run --name light-ai-db `
  -e POSTGRES_PASSWORD=yourpassword `
  -e POSTGRES_DB=light_ai `
  -p 5432:5432 `
  -d postgres:16

# Verify it's running
docker ps
```

---

## ✅ Verify Installation

### Step 1: Restart PowerShell
Close and reopen PowerShell (important for PATH update)

### Step 2: Check Version
```powershell
psql --version
```

**Expected output:**
```
psql (PostgreSQL) 16.5
```

If you see an error, add PostgreSQL to PATH:
```powershell
# Add to System PATH (replace with your version)
$env:Path += ";C:\Program Files\PostgreSQL\16\bin"
```

---

## 🗄️ Create Database

### Step 1: Connect to PostgreSQL
```powershell
# Open PowerShell
psql -U postgres

# Enter the password you set during installation
```

### Step 2: Create Database
```sql
-- Type this in the PostgreSQL prompt
CREATE DATABASE light_ai;

-- Verify it was created
\l

-- You should see 'light_ai' in the list

-- Exit
\q
```

**Alternative using single command:**
```powershell
psql -U postgres -c "CREATE DATABASE light_ai"
```

---

## ⚙️ Configure Light AI

### Step 1: Open .env File
Navigate to: `C:\Users\Bhanu Bisht\OneDrive\Desktop\light-ai\.env`

### Step 2: Update Configuration
**Replace these lines:**

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=light_ai
DB_USER=postgres
DB_PASSWORD=YOUR_PASSWORD_HERE

# JWT Configuration
JWT_SECRET=YOUR_JWT_SECRET_HERE
JWT_EXPIRES_IN=7d
```

**Replace `YOUR_PASSWORD_HERE` with your PostgreSQL password!**

### Step 3: Generate JWT Secret
```powershell
# Run this command to generate a random secret
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

**Copy the output** and paste it as `JWT_SECRET` in `.env`

Example:
```env
JWT_SECRET=k9Lm3Pq7RsTu2Wx5Yz8Ab1Cd4Ef6Gh9J
```

### Step 4: Save the File
- Save `.env`
- Close the file

---

## 🚀 Restart Server

```powershell
# Stop the current server (press Ctrl+C)

# Start again
node server.js
```

**You should see:**
```
✅ Connected to PostgreSQL database
✅ Database schema initialized successfully
🚀 Light AI Server running on http://localhost:3000
🔐 Auth API: http://localhost:3000/api/auth
```

---

## 🧪 Test Authentication

### Browser Test (Easiest):
1. Open http://localhost:3000/signup.html
2. Fill in:
   - Username: `testuser`
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Password: `Test1234`
3. Click "Create Account"
4. Should redirect to dashboard!

### PowerShell Test:
```powershell
$body = @{
    username = "testuser"
    email = "test@example.com"
    password = "Test1234"
    fullName = "Test User"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/signup" -Method POST -Body $body -ContentType "application/json"

Write-Host "Success! Token: $($response.token)"
```

---

## 🔧 Troubleshooting

### Problem: "psql: command not found"
**Solution 1:** Restart PowerShell (PATH needs to refresh)

**Solution 2:** Manually add to PATH
```powershell
# Temporary (current session only)
$env:Path += ";C:\Program Files\PostgreSQL\16\bin"

# Permanent (requires restart)
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\PostgreSQL\16\bin", "Machine")
```

### Problem: "Connection refused"
**Solution:** Start PostgreSQL service
```powershell
# Check service status
Get-Service -Name postgresql*

# Start service
Start-Service postgresql-x64-16
```

### Problem: "Password authentication failed"
**Solution:** Your password in `.env` doesn't match PostgreSQL password
- Double-check `DB_PASSWORD` in `.env`
- Try resetting PostgreSQL password

### Problem: "Port 5432 already in use"
**Solution:** Another service is using that port
```powershell
# Find what's using port 5432
netstat -ano | findstr :5432

# Either stop that service or change DB_PORT in .env to 5433
```

### Problem: Database tables not created
**Solution:** Check server logs
- Look for "Database schema initialized successfully"
- If missing, restart server: `node server.js`

---

## 📊 What Happens After Installation

When you restart the server with database configured:

1. ✅ Server connects to PostgreSQL
2. ✅ **Automatically creates 7 tables:**
   - `users` - User accounts
   - `user_progress` - XP, streaks, levels
   - `problems` - Coding problems
   - `submissions` - Code submissions
   - `achievements` - Available achievements
   - `user_achievements` - User unlocks
   - `daily_activity` - Daily stats
3. ✅ Creates indexes for performance
4. ✅ Ready to accept signups!

---

## 🎯 Next Steps After Installation

1. ✅ **Test Signup**: http://localhost:3000/signup.html
2. ✅ **Test Login**: http://localhost:3000/login.html
3. ✅ **Solve Problems**: Your progress is now saved!
4. ✅ **Check Database**: Open pgAdmin 4 to view data

---

## 📚 Useful Tools

### pgAdmin 4 (Installed with PostgreSQL)
- Visual database management tool
- View tables, run queries
- Open: Start Menu → PostgreSQL 16 → pgAdmin 4

### Connect to Database:
- **Host**: localhost
- **Port**: 5432
- **Database**: light_ai
- **Username**: postgres
- **Password**: [Your password]

---

## 🆘 Still Having Issues?

### Option 1: Use Docker Instead
Easier if you have Docker Desktop:
```powershell
docker run --name light-ai-db -e POSTGRES_PASSWORD=yourpass -e POSTGRES_DB=light_ai -p 5432:5432 -d postgres:16
```

### Option 2: Continue in Demo Mode
- App works fine without database
- Only missing: User accounts, progress saving
- Good for testing/development

---

## 📝 Summary Checklist

- [ ] Downloaded PostgreSQL installer
- [ ] Installed PostgreSQL (remembered password!)
- [ ] Verified with `psql --version`
- [ ] Created `light_ai` database
- [ ] Updated `.env` with password
- [ ] Generated and added JWT_SECRET
- [ ] Restarted server
- [ ] Saw "✅ Database connected" message
- [ ] Tested signup at http://localhost:3000/signup.html
- [ ] Successfully created account!

---

**Installation Time:** ~15 minutes  
**Difficulty:** ⭐⭐☆☆☆ (Easy)

Once installed, you'll have a **production-ready authentication system** with:
- User signup/login
- Progress tracking
- Submission history
- Achievement system

**Good luck! 🚀**
