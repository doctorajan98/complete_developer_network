# Complete Developer Network (CDN)

A full-stack web application for managing freelancer profiles with ASP.NET Core backend and React frontend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [1. MySQL Database Setup](#1-mysql-database-setup)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

---

## Features

- **CRUD Operations** - Create, Read, Update, Delete freelancer profiles
- **Search Functionality** - Search by name, username, or email
- **Archive System** - Archive/unarchive freelancers (soft delete)
- **Modern UI** - Material-UI components with responsive design
- **Data Validation** - Input validation on both frontend and backend
- **Database Integration** - MySQL with Entity Framework Core
- **RESTful API** - Clean Architecture with Swagger documentation

---

## Tech Stack

**Backend:**

- ASP.NET Core 8.0
- Entity Framework Core 8.0
- MySQL 8.0
- Swagger/OpenAPI

**Frontend:**

- React 18
- Material-UI (MUI)
- Axios
- React Router

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **.NET 8 SDK** - [Download](https://dotnet.microsoft.com/download)
- **MySQL Server 8.0+** - [Download](https://dev.mysql.com/downloads/mysql/)
- **Git** - [Download](https://git-scm.com/)

### Verify Installation

```bash
# Check Node.js
node --version

# Check .NET
dotnet --version

# Check MySQL
mysql --version
```

---

## Installation

### 1. MySQL Database Setup

#### Step 1: Install MySQL

**Windows:**

1. Download MySQL Installer from [mysql.com](https://dev.mysql.com/downloads/installer/)
2. Run the installer and select "Developer Default"
3. Follow the installation wizard
4. Set root password (e.g., `123456`)
5. Complete the installation

**macOS (using Homebrew):**

```bash
brew install mysql
brew services start mysql
```

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

#### Step 2: Create Database

**Option A: Using MySQL Workbench (GUI)**

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Click "Create new schema" button
4. Name it `CDN_Database`
5. Click "Apply"

**Option B: Using Command Line**

```bash
# Login to MySQL
mysql -u root -p

# Enter your password, then create database
CREATE DATABASE CDN_Database;
SHOW DATABASES;
EXIT;
```

#### Step 3: Configure Connection String

Edit `CDN.Presentation/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=CDN_Database;User=root;Password=YOUR_PASSWORD;"
  }
}
```

**Important:** Replace `YOUR_PASSWORD` with your actual MySQL root password.

#### Step 4: Test Connection

```bash
# Test MySQL connection
mysql -u root -p -e "SHOW DATABASES;"
```

---

### 2. Backend Setup

#### Step 1: Clone Repository

```bash
git clone <repository-url>
cd complete_developer_network
```

#### Step 2: Restore Dependencies

```bash
# Restore .NET packages
dotnet restore
```

#### Step 3: Run Database Migrations

```bash
# Navigate to Infrastructure project
cd CDN.Infrastructure

# Apply migrations to create database tables
dotnet ef database update --startup-project ../CDN.Presentation

# You should see:
# - Creating table Freelancers
# - Adding columns: UserId, UserName, Name, Email, etc.
```

#### Step 4: Verify Backend Build

```bash
# Build the solution
cd ..
dotnet build

# Should complete without errors
```

---

### 3. Frontend Setup

#### Step 1: Navigate to Frontend Directory

```bash
cd CDN.Frontend
```

#### Step 2: Install Dependencies

```bash
npm install

# This will install:
# - React
# - Material-UI
# - Axios
# - React Router
# - Other dependencies
```

#### Step 3: Configure Environment (Optional)

If you need to change the API URL, create/edit `.env.local`:

```bash
# Copy example file
copy .env.example .env.local

# Edit .env.local if needed
REACT_APP_API_URL=http://localhost:5238/api/Freelancer
PORT=3000
```

---

## Running the Project

### Option 1: Quick Start (Batch File)

**Windows:**

```bash
# From project root directory
start-cdn-app.bat
```

This will:

1. Start the backend API on port 5238
2. Wait 5 seconds
3. Start the frontend on port 3000

### Option 2: Manual Start (Recommended for Development)

**Terminal 1 - Backend:**

```bash
cd CDN.Presentation
dotnet run

# Should see:
# Now listening on: http://localhost:5238
```

**Terminal 2 - Frontend:**

```bash
cd CDN.Frontend
npm start

# Should automatically open http://localhost:3000
```

### Verify Everything is Running

1. **Backend API:** http://localhost:5238/swagger
2. **Frontend:** http://localhost:3000
3. **Database:** Check MySQL Workbench or run `mysql -u root -p`

---

## Project Structure

```
complete_developer_network/
│
├── CDN.Core/                    # Domain & Application Layer
│   ├── Domain/
│   │   ├── Entities/           # Domain models (Freelancer)
│   │   └── Interfaces/         # Repository interfaces
│   └── Application/
│       ├── DTOs/               # Data Transfer Objects
│       ├── Interfaces/         # Service interfaces
│       └── Services/           # Business logic
│
├── CDN.Infrastructure/          # Data Access Layer
│   ├── Data/
│   │   └── CDNDbContext.cs    # EF Core DbContext
│   ├── Repositories/           # Repository implementations
│   └── Migrations/             # Database migrations
│
├── CDN.Presentation/           # API Layer
│   ├── Controllers/           # API Controllers
│   ├── Program.cs             # Application entry point
│   └── appsettings.json       # Configuration
│
├── CDN.Frontend/               # React Frontend
│   ├── public/                # Static files
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── services/          # API service
│   │   └── App.js            # Main app component
│   ├── .env.local            # Environment config
│   └── package.json          # Dependencies
│
├── CDN.sln                     # Solution file
├── start-cdn-app.bat          # Quick start script
└── README.md                  # This file
```

---

## API Documentation

### Base URL

```
http://localhost:5238/api/Freelancer
```

### Endpoints

| Method   | Endpoint                      | Description                              |
| -------- | ----------------------------- | ---------------------------------------- |
| `GET`    | `/ListAll`                    | Get all active freelancers               |
| `GET`    | `/ListAllIncludingArchived`   | Get all freelancers (including archived) |
| `GET`    | `/Get?userId={id}`            | Get freelancer by ID                     |
| `GET`    | `/Search?searchQuery={query}` | Search freelancers                       |
| `POST`   | `/Register`                   | Create new freelancer                    |
| `PUT`    | `/Update`                     | Update freelancer                        |
| `DELETE` | `/Delete?userId={id}`         | Delete freelancer                        |
| `POST`   | `/Archive?userId={id}`        | Archive freelancer                       |
| `POST`   | `/Unarchive?userId={id}`      | Unarchive freelancer                     |

### Swagger UI

Interactive API documentation available at:

```
http://localhost:5238/swagger
```

---

## Configuration

### Backend Configuration

**Database Connection** (`appsettings.json`):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=CDN_Database;User=root;Password=123456;"
  }
}
```

**CORS Settings** (`Program.cs`):

```csharp
// Allows requests from React frontend
policy.WithOrigins("http://localhost:3000")
```

### Frontend Configuration

**API URL** (`.env.local`):

```
REACT_APP_API_URL=http://localhost:5238/api/Freelancer
PORT=3000
```

See [ENV_CONFIG.md](CDN.Frontend/ENV_CONFIG.md) for detailed environment configuration.

---

## Troubleshooting

### Database Connection Issues

**Problem:** "Unable to connect to MySQL server"

**Solutions:**

1. Verify MySQL is running:

   ```bash
   # Windows
   net start MySQL80

   # macOS
   brew services list

   # Linux
   sudo systemctl status mysql
   ```

2. Check connection string in `appsettings.json`
3. Verify MySQL credentials:
   ```bash
   mysql -u root -p
   ```

### Migration Issues

**Problem:** "Cannot connect to database"

**Solution:**

```bash
# Drop and recreate database
cd CDN.Infrastructure
dotnet ef database drop --startup-project ../CDN.Presentation --force
dotnet ef database update --startup-project ../CDN.Presentation
```

### Port Already in Use

**Problem:** "Address already in use"

**Solutions:**

```bash
# Kill process on port 5238 (Backend)
netstat -ano | findstr :5238
taskkill /F /PID <PID>

# Kill process on port 3000 (Frontend)
netstat -ano | findstr :3000
taskkill /F /PID <PID>
```

### Frontend Not Loading

**Problem:** "react-scripts not found"

**Solution:**

```bash
cd CDN.Frontend
rm -rf node_modules
npm install
npm start
```

### CORS Errors

**Problem:** "CORS policy blocked"

**Solution:**

- Ensure backend is running on port 5238
- Check `Program.cs` CORS configuration
- Verify frontend URL in CORS policy

---

## Common Tasks

### Reset Database

```bash
cd CDN.Infrastructure
dotnet ef database drop --startup-project ../CDN.Presentation --force
dotnet ef database update --startup-project ../CDN.Presentation
```

### Create New Migration

```bash
cd CDN.Infrastructure
dotnet ef migrations add MigrationName --startup-project ../CDN.Presentation
dotnet ef database update --startup-project ../CDN.Presentation
```

### Update Dependencies

```bash
# Backend
dotnet restore

# Frontend
cd CDN.Frontend
npm update
```

### Build for Production

```bash
# Backend
dotnet publish -c Release

# Frontend
cd CDN.Frontend
npm run build
```

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## Support

For issues and questions:

- Check [Troubleshooting](#troubleshooting) section
- Review [ENV_CONFIG.md](CDN.Frontend/ENV_CONFIG.md) for frontend config
- Open an issue on GitHub

---

## Quick Start Checklist

- [ ] MySQL installed and running
- [ ] Database `CDN_Database` created
- [ ] Connection string configured in `appsettings.json`
- [ ] .NET dependencies restored (`dotnet restore`)
- [ ] Migrations applied (`dotnet ef database update`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend running on port 5238
- [ ] Frontend running on port 3000
- [ ] Can access Swagger UI
- [ ] Can access React app

---
