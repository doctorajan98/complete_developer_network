# Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites Check

```bash
# Check if you have everything installed
node --version    # Should be v18+
dotnet --version  # Should be 8.0+
mysql --version   # Should be 8.0+
```

If anything is missing, see [Full Installation Guide](README.md#prerequisites).

---

## Step 1: MySQL Setup (2 minutes)

### Create Database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE CDN_Database;
EXIT;
```

### Configure Connection

Edit `CDN.Presentation/appsettings.json`:

```json
"DefaultConnection": "Server=localhost;Database=CDN_Database;User=root;Password=YOUR_PASSWORD;"
```

**Replace `YOUR_PASSWORD` with your MySQL root password!**

---

## Step 2: Backend Setup (1 minute)

```bash
# From project root
dotnet restore

# Apply database migrations
cd CDN.Infrastructure
dotnet ef database update --startup-project ../CDN.Presentation

# Start backend
cd ../CDN.Presentation
dotnet run
```

**Verify:** Open http://localhost:5238/swagger

---

## Step 3: Frontend Setup (2 minutes)

```bash
# From project root (new terminal)
cd CDN.Frontend

# Install dependencies
npm install

# Start frontend
npm start
```

**Verify:** Browser should auto-open to http://localhost:3000

---

## You're Done!

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5238
- **Swagger Docs:** http://localhost:5238/swagger

---

## Quick Start with Batch File (Windows)

```bash
# From project root
start-cdn-app.bat
```

This automatically starts both backend and frontend!

---

## Test the Application

1. Open http://localhost:3000
2. Click **"Add Freelancer"** button
3. Fill in the form:
   - Username: `johndoe`
   - Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `1234567890`
   - Skills: Add a few skills
   - Hobbies: Add a few hobbies
4. Click **"Add Freelancer"**
5. You should see the new freelancer in the list!

---

## Common Issues

### "Unable to connect to MySQL"

```bash
# Check if MySQL is running
net start MySQL80   # Windows
brew services list  # macOS
```

### "Port already in use"

```bash
# Kill process on port
taskkill /F /IM dotnet.exe  # Backend
taskkill /F /IM node.exe    # Frontend
```

### "react-scripts not found"

```bash
cd CDN.Frontend
npm install
```

---

## Need More Help?

See the [Full README](README.md) for:

- Detailed installation steps
- Complete troubleshooting guide
- API documentation
- Project structure
- Configuration options

---
