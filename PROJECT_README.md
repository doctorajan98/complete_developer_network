# Complete Developer Network (CDN)

A full-stack application built with Clean Architecture principles, featuring a .NET Core Web API backend and a React.js frontend for managing freelancer information.

## 🏗️ Architecture Overview

This project follows Clean Architecture principles with clear separation of concerns:

- **CDN.Core**: Domain entities, interfaces, and application services
- **CDN.Infrastructure**: Data access layer with Entity Framework Core
- **CDN.Presentation**: Web API controllers and configuration
- **cdn-frontend**: React.js frontend application

## 🚀 Quick Start

### Option 1: Use the Startup Script (Windows)

1. Double-click `start-cdn-app.bat`
2. Wait for both applications to start
3. Access the frontend at `http://localhost:3000`

### Option 2: Manual Setup

#### Backend Setup

```bash
cd CDN.Presentation
dotnet restore
dotnet run
```

#### Frontend Setup

```bash
cd cdn-frontend
npm install
npm start
```

## 📋 Features

### Backend API Features

- ✅ Clean Architecture implementation
- ✅ Entity Framework Core with MySQL
- ✅ Swagger/OpenAPI documentation
- ✅ CORS configuration for frontend
- ✅ Comprehensive CRUD operations
- ✅ Search functionality

### Frontend Features

- ✅ Modern React.js with Material-UI
- ✅ Responsive design for all devices
- ✅ Real-time search functionality
- ✅ Add/Edit/Delete freelancer operations
- ✅ Form validation and error handling
- ✅ Professional UI/UX design

## 🛠️ Technology Stack

### Backend

- **.NET 8** - Core framework
- **Entity Framework Core** - ORM
- **MySQL** - Database
- **Swagger/OpenAPI** - API documentation
- **Clean Architecture** - Project structure

### Frontend

- **React 18** - Frontend framework
- **Material-UI (MUI)** - UI components
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Emotion** - CSS-in-JS styling

## 📁 Project Structure

```
complete_developer_network/
├── CDN.Core/                    # Core business logic
│   ├── Application/            # Application services & DTOs
│   └── Domain/                 # Domain entities & interfaces
├── CDN.Infrastructure/         # Data access layer
│   ├── Data/                   # DbContext
│   ├── Migrations/             # EF Core migrations
│   └── Repositories/           # Repository implementations
├── CDN.Presentation/           # Web API layer
│   ├── Controllers/            # API controllers
│   └── Program.cs              # Application configuration
├── cdn-frontend/               # React frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── services/           # API service layer
│   │   └── App.js              # Main app component
│   └── package.json            # Frontend dependencies
├── CDN.sln                     # Solution file
└── start-cdn-app.bat           # Startup script
```

## 🔧 API Endpoints

| Method | Endpoint                                     | Description           |
| ------ | -------------------------------------------- | --------------------- |
| GET    | `/api/Freelancer/ListAll`                    | Get all freelancers   |
| GET    | `/api/Freelancer/Get?userId={id}`            | Get freelancer by ID  |
| POST   | `/api/Freelancer/Register`                   | Create new freelancer |
| PUT    | `/api/Freelancer/Update`                     | Update freelancer     |
| DELETE | `/api/Freelancer/Delete?userId={id}`         | Delete freelancer     |
| GET    | `/api/Freelancer/Search?searchQuery={query}` | Search freelancers    |

## 📊 Data Model

### Freelancer Entity

```csharp
public class Freelancer
{
    public int UserId { get; set; }
    public string UserName { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string? PhoneNumber { get; set; }
    public List<string> SkillSet { get; set; }
    public List<string> Hobbies { get; set; }
}
```

## 🎨 Frontend Components

### FreelancerList

- Displays all freelancers in responsive cards
- Search functionality with real-time results
- Quick action buttons for edit/delete operations

### AddFreelancer

- Form for creating new freelancer profiles
- Autocomplete for skills and hobbies
- Form validation and error handling

### EditFreelancer

- Pre-populated form for updating freelancer information
- Same features as AddFreelancer component
- Maintains existing data integrity

## 🔒 Security & Configuration

### CORS Configuration

The backend is configured to allow requests from the React frontend:

```csharp
policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
```

### Database Configuration

Update the connection string in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=CDNDb;Uid=root;Pwd=yourpassword;"
  }
}
```

## 🚀 Deployment

### Backend Deployment

1. Update connection string for production database
2. Run `dotnet publish -c Release`
3. Deploy to your hosting platform

### Frontend Deployment

1. Update API base URL in `src/services/api.js`
2. Run `npm run build`
3. Deploy the `build` folder to your hosting platform

## 🧪 Testing

### Backend Testing

```bash
cd CDN.Presentation
dotnet test
```

### Frontend Testing

```bash
cd cdn-frontend
npm test
```

## 📝 Development Guidelines

### Code Style

- Follow C# naming conventions for backend
- Use ESLint configuration for frontend
- Maintain consistent indentation and formatting

### Git Workflow

- Use feature branches for new development
- Write descriptive commit messages
- Keep commits focused and atomic

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS policy includes frontend URL
2. **Database Connection**: Verify MySQL is running and connection string is correct
3. **Port Conflicts**: Check if ports 3000 and 7001 are available
4. **Node Modules**: Run `npm install` if frontend dependencies are missing

### Getting Help

- Check the individual README files in each project folder
- Review the API documentation at `http://localhost:5238/swagger`
- Check console logs for detailed error messages

## 🎯 Future Enhancements

- [ ] Authentication and authorization
- [ ] File upload for freelancer profiles
- [ ] Advanced filtering and sorting
- [ ] Export functionality (PDF, Excel)
- [ ] Real-time notifications
- [ ] Mobile app development
- [ ] Unit and integration tests
- [ ] CI/CD pipeline setup
