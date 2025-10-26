# PostgreSQL Database Setup Guide

## 🗄️ Database Information

**Light AI** uses **PostgreSQL** as the production database for:
- User authentication and profiles
- Progress tracking (XP, streaks, achievements)
- Problem database with test cases
- Submission history and analytics

---

## 📊 Database Schema

### Tables Created:

1. **users** - User accounts with authentication
   - `id`, `username`, `email`, `password_hash`, `full_name`, `avatar_url`
   - `created_at`, `last_login`, `is_active`

2. **user_progress** - User statistics and progress
   - `user_id`, `total_xp`, `current_level`, `problems_solved`
   - `current_streak`, `longest_streak`, `total_time_spent`

3. **problems** - Coding problems (migrated from problems.js)
   - `id`, `title`, `slug`, `difficulty`, `category`, `description`
   - `test_cases` (JSONB), `starter_code` (JSONB), `hints`, `solution`

4. **submissions** - User code submissions
   - `user_id`, `problem_id`, `language`, `code`, `status`
   - `runtime`, `test_results` (JSONB), `xp_earned`

5. **achievements** - Available achievements
   - `name`, `description`, `icon`, `requirement` (JSONB), `xp_reward`

6. **user_achievements** - Unlocked achievements (join table)
   - `user_id`, `achievement_id`, `unlocked_at`

7. **daily_activity** - Daily activity tracking for streaks
   - `user_id`, `activity_date`, `problems_solved`, `xp_earned`

---

## 🚀 Quick Setup (Windows)

### Option 1: PostgreSQL Installer (Recommended)

1. **Download PostgreSQL**
   ```
   https://www.postgresql.org/download/windows/
   ```
   - Download the latest version (16.x recommended)
   - Run the installer

2. **Installation Settings**
   - Port: `5432` (default)
   - Password: Set a strong password for `postgres` user
   - Remember this password!

3. **Verify Installation**
   ```powershell
   psql --version
   ```

4. **Create Database**
   ```powershell
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE light_ai;
   
   # Exit
   \q
   ```

### Option 2: Docker (Alternative)

```powershell
docker run --name light-ai-db -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=light_ai -p 5432:5432 -d postgres:16
```

---

## ⚙️ Configuration

1. **Copy environment template**
   ```powershell
   copy .env.example .env
   ```

2. **Edit `.env` file** with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=light_ai
   DB_USER=postgres
   DB_PASSWORD=your_actual_password
   
   JWT_SECRET=generate_random_string_here
   JWT_EXPIRES_IN=7d
   ```

3. **Generate JWT Secret** (run in PowerShell):
   ```powershell
   -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
   ```

---

## 🎯 Starting the Server

The server will automatically:
1. Connect to PostgreSQL
2. Create all tables if they don't exist
3. Create indexes for performance
4. Start accepting requests

```powershell
node server.js
```

Expected output:
```
✅ Connected to PostgreSQL database
✅ Database schema initialized successfully
🚀 Light AI Server running on http://localhost:3000
🔐 Auth API: http://localhost:3000/api/auth
```

---

## 🔐 Authentication API Endpoints

### 1. **Signup** - Register new user
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "fullName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. **Login** - Authenticate user
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "john_doe",
    "progress": {
      "xp": 1500,
      "level": 5,
      "problemsSolved": 30,
      "currentStreak": 7
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. **Get Profile** - Get current user
```http
GET /api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN
```

### 4. **Update Profile** - Update user info
```http
PUT /api/auth/profile
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "fullName": "John Updated",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

### 5. **Logout**
```http
POST /api/auth/logout
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🧪 Testing the API

### Using PowerShell (Invoke-RestMethod):

**Signup:**
```powershell
$body = @{
    username = "testuser"
    email = "test@example.com"
    password = "Test1234"
    fullName = "Test User"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/signup" -Method POST -Body $body -ContentType "application/json"
```

**Login:**
```powershell
$body = @{
    email = "test@example.com"
    password = "Test1234"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
$token = $response.token
```

**Get Profile:**
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/me" -Method GET -Headers $headers
```

---

## 📝 Next Steps

After setting up authentication, you can:
1. ✅ Test signup/login from frontend
2. ✅ Migrate problems from `problems.js` to PostgreSQL
3. ✅ Implement progress tracking API (Phase 3B)
4. ✅ Build submission history system
5. ✅ Add achievements tracking

---

## 🔧 Troubleshooting

### Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution:** Make sure PostgreSQL is running
```powershell
# Check if PostgreSQL service is running
Get-Service -Name postgresql*

# Start if not running
Start-Service postgresql-x64-16
```

### Authentication Error
```
Error: password authentication failed
```
**Solution:** Check your `.env` file has correct `DB_PASSWORD`

### Database Doesn't Exist
```
Error: database "light_ai" does not exist
```
**Solution:** Create it manually
```powershell
psql -U postgres -c "CREATE DATABASE light_ai;"
```

---

## 📚 Documentation

- PostgreSQL Docs: https://www.postgresql.org/docs/
- JWT.io: https://jwt.io/
- Bcrypt: https://github.com/kelektiv/node.bcrypt.js

---

**Database Type:** PostgreSQL 16.x (Relational Database)  
**ORM:** Raw SQL with `pg` driver (native PostgreSQL client)  
**Authentication:** JWT (JSON Web Tokens) with bcryptjs hashing
