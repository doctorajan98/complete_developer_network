# Database Setup Guide

Complete guide for setting up MySQL database for the CDN application.

---

## Table of Contents

- [Installing MySQL](#installing-mysql)
- [Configuring MySQL](#configuring-mysql)
- [Creating the Database](#creating-the-database)
- [Connecting to the Database](#connecting-to-the-database)
- [Running Migrations](#running-migrations)
- [Database Schema](#database-schema)
- [Troubleshooting](#troubleshooting)

---

## Installing MySQL

### Windows

#### Option 1: MySQL Installer (Recommended)

1. **Download MySQL Installer**

   - Go to https://dev.mysql.com/downloads/installer/
   - Download "Windows (x86, 32-bit), MSI Installer" (larger one)

2. **Run Installer**

   - Choose "Developer Default" setup type
   - Click "Next" and "Execute" to download components

3. **Configure MySQL Server**

   - Type and Networking: Keep defaults (Port 3306)
   - Authentication Method: "Use Strong Password Encryption"
   - Accounts and Roles:
     - Set root password (remember this!)
     - Example: `123456` (for development only)

4. **Complete Installation**

   - Click "Next" and "Finish"
   - MySQL will start automatically

5. **Verify Installation**
   ```bash
   mysql --version
   # Should output: mysql  Ver 8.0.x
   ```

#### Option 2: Chocolatey (Command Line)

```bash
# Install Chocolatey first if you don't have it
# Then install MySQL
choco install mysql

# Start MySQL service
net start MySQL80
```

### macOS

#### Using Homebrew (Recommended)

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install MySQL
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation
mysql_secure_installation
```

#### Using DMG Installer

1. Download from https://dev.mysql.com/downloads/mysql/
2. Open the .dmg file
3. Follow installation wizard
4. Start MySQL from System Preferences

### Linux (Ubuntu/Debian)

```bash
# Update package index
sudo apt update

# Install MySQL Server
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Secure installation
sudo mysql_secure_installation
```

---

## Configuring MySQL

### Setting Root Password

**If you forgot or didn't set a password:**

```bash
# Windows
net stop MySQL80
mysqld --skip-grant-tables

# In another terminal
mysql -u root
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
FLUSH PRIVILEGES;
EXIT;

# Restart MySQL normally
net start MySQL80
```

**macOS/Linux:**

```bash
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
FLUSH PRIVILEGES;
EXIT;
```

### Allow Remote Connections (Optional)

Edit MySQL configuration file:

**Windows:** `C:\ProgramData\MySQL\MySQL Server 8.0\my.ini`
**macOS:** `/usr/local/etc/my.cnf`
**Linux:** `/etc/mysql/mysql.conf.d/mysqld.cnf`

```ini
[mysqld]
bind-address = 0.0.0.0
```

Restart MySQL after changes.

---

## Creating the Database

### Method 1: Command Line

```bash
# Login to MySQL
mysql -u root -p
# Enter your password

# Create database
CREATE DATABASE CDN_Database;

# Verify creation
SHOW DATABASES;

# Select database
USE CDN_Database;

# Show tables (should be empty for now)
SHOW TABLES;

# Exit
EXIT;
```

### Method 2: MySQL Workbench (GUI)

1. **Open MySQL Workbench**
2. **Connect to Local Instance**

   - Click on "Local instance MySQL80"
   - Enter root password

3. **Create Schema**

   - Click the "Create new schema" icon (cylinder with +)
   - Schema Name: `CDN_Database`
   - Charset: `utf8mb4`
   - Collation: `utf8mb4_general_ci`
   - Click "Apply" → "Apply" → "Finish"

4. **Verify**
   - You should see `CDN_Database` in the SCHEMAS panel

### Method 3: Using .NET Migrations (Automatic)

The application will create the database automatically when you run migrations:

```bash
cd CDN.Infrastructure
dotnet ef database update --startup-project ../CDN.Presentation
```

---

## Connecting to the Database

### Connection String Format

```
Server=localhost;Database=CDN_Database;User=root;Password=YOUR_PASSWORD;
```

### Configure Application

Edit `CDN.Presentation/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=CDN_Database;User=root;Password=123456;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

**Security Note:** For production, use environment variables or Azure Key Vault for passwords!

### Testing Connection

**Using .NET:**

```bash
cd CDN.Presentation
dotnet run

# Look for:
# info: Microsoft.EntityFrameworkCore.Database.Command[20101]
# Successfully connected to database
```

**Using MySQL Client:**

```bash
mysql -h localhost -u root -p CDN_Database
# Enter password
# You should see: mysql>
```

**Using MySQL Workbench:**

1. Open MySQL Workbench
2. Click on your connection
3. You should see `CDN_Database` in schemas
4. Right-click → "Set as Default Schema"

---

## Running Migrations

### Initial Setup

```bash
# Navigate to Infrastructure project
cd CDN.Infrastructure

# Create initial migration (if not exists)
dotnet ef migrations add InitialCreate --startup-project ../CDN.Presentation

# Apply migrations to database
dotnet ef database update --startup-project ../CDN.Presentation
```

### What Migrations Do

Migrations will create the following table:

```sql
CREATE TABLE Freelancers (
    UserId INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(20),
    SkillSet LONGTEXT NOT NULL,
    Hobbies LONGTEXT NOT NULL,
    IsArchived TINYINT(1) NOT NULL DEFAULT 0,
    ArchivedAt DATETIME(6) NULL
);
```

### Migration Commands

```bash
# List migrations
dotnet ef migrations list --startup-project ../CDN.Presentation

# Apply all pending migrations
dotnet ef database update --startup-project ../CDN.Presentation

# Rollback to specific migration
dotnet ef database update PreviousMigrationName --startup-project ../CDN.Presentation

# Remove last migration (if not applied)
dotnet ef migrations remove --startup-project ../CDN.Presentation

# Drop database
dotnet ef database drop --startup-project ../CDN.Presentation --force
```

---

## Database Schema

### Freelancers Table

| Column      | Type         | Nullable | Description                 |
| ----------- | ------------ | -------- | --------------------------- |
| UserId      | INT          | NO       | Primary key, auto-increment |
| UserName    | LONGTEXT     | NO       | Unique username             |
| Name        | LONGTEXT     | NO       | Full name                   |
| Email       | VARCHAR(255) | NO       | Email address               |
| PhoneNumber | VARCHAR(20)  | YES      | Phone number                |
| SkillSet    | LONGTEXT     | NO       | JSON array of skills        |
| Hobbies     | LONGTEXT     | NO       | JSON array of hobbies       |
| IsArchived  | TINYINT(1)   | NO       | Archive status (0 or 1)     |
| ArchivedAt  | DATETIME(6)  | YES      | Archive timestamp           |

### Example Data

```sql
INSERT INTO Freelancers (UserName, Name, Email, PhoneNumber, SkillSet, Hobbies, IsArchived)
VALUES (
    'johndoe',
    'John Doe',
    'john@example.com',
    '1234567890',
    '["C#", "React", "SQL"]',
    '["Reading", "Gaming", "Coding"]',
    0
);
```

### Query Examples

```sql
-- Get all active freelancers
SELECT * FROM Freelancers WHERE IsArchived = 0;

-- Search by name
SELECT * FROM Freelancers
WHERE Name LIKE '%John%' AND IsArchived = 0;

-- Get archived freelancers
SELECT * FROM Freelancers WHERE IsArchived = 1;

-- Count total freelancers
SELECT COUNT(*) FROM Freelancers;

-- Get freelancers with specific skill (JSON search)
SELECT * FROM Freelancers
WHERE JSON_CONTAINS(SkillSet, '"C#"') AND IsArchived = 0;
```

---

## Troubleshooting

### Issue: "Access denied for user 'root'@'localhost'"

**Solution:**

```bash
# Reset root password
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';
FLUSH PRIVILEGES;
```

### Issue: "Can't connect to MySQL server"

**Solutions:**

1. **Check if MySQL is running:**

   ```bash
   # Windows
   net start MySQL80

   # macOS
   brew services list

   # Linux
   sudo systemctl status mysql
   ```

2. **Check port 3306:**

   ```bash
   netstat -an | findstr :3306
   ```

3. **Check firewall:**
   - Allow port 3306 through firewall

### Issue: "Database 'CDN_Database' does not exist"

**Solution:**

```bash
mysql -u root -p
CREATE DATABASE CDN_Database;
EXIT;

# Then run migrations
cd CDN.Infrastructure
dotnet ef database update --startup-project ../CDN.Presentation
```

### Issue: "Table 'Freelancers' doesn't exist"

**Solution:**

```bash
# Ensure migrations are applied
cd CDN.Infrastructure
dotnet ef database update --startup-project ../CDN.Presentation
```

### Issue: "No migrations found"

**Solution:**

```bash
# Create initial migration
cd CDN.Infrastructure
dotnet ef migrations add InitialCreate --startup-project ../CDN.Presentation
dotnet ef database update --startup-project ../CDN.Presentation
```

### Issue: "Migration failed" or "Corrupted migration"

**Solution:**

```bash
# Drop and recreate database
cd CDN.Infrastructure
dotnet ef database drop --startup-project ../CDN.Presentation --force
dotnet ef database update --startup-project ../CDN.Presentation
```

---

## Security Best Practices

### For Development

- Use a simple password like `123456`
- Run MySQL on localhost only
- Don't expose port 3306 externally

### For Production

- Use strong passwords (16+ characters)
- Store passwords in environment variables
- Use SSL/TLS for connections
- Regular backups
- Limit user privileges
- Monitor access logs

---

## Useful MySQL Commands

```sql
-- Show all databases
SHOW DATABASES;

-- Use specific database
USE CDN_Database;

-- Show all tables
SHOW TABLES;

-- Describe table structure
DESCRIBE Freelancers;

-- Show table creation SQL
SHOW CREATE TABLE Freelancers;

-- Delete all data (keep structure)
TRUNCATE TABLE Freelancers;

-- Drop table
DROP TABLE Freelancers;

-- Drop database
DROP DATABASE CDN_Database;

-- Show current user
SELECT USER();

-- Show database size
SELECT
    table_schema AS "Database",
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS "Size (MB)"
FROM information_schema.TABLES
WHERE table_schema = "CDN_Database"
GROUP BY table_schema;
```

---

## Additional Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Entity Framework Core Migrations](https://docs.microsoft.com/ef/core/managing-schemas/migrations/)
- [MySQL Workbench Guide](https://dev.mysql.com/doc/workbench/en/)

---

Go back to [README.md](README.md) to continue with the application setup!
