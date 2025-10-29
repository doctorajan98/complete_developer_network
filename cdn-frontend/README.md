# Complete Developer Network - React Frontend

This is the React.js frontend for the Complete Developer Network (CDN) application. It provides a modern, responsive interface for managing freelancer information.

## Features

- **Freelancer Listing**: View all registered freelancers in a clean, card-based layout
- **Search Functionality**: Search freelancers by name, skills, or email
- **Add New Freelancer**: Create new freelancer profiles with skills and hobbies
- **Edit Freelancer**: Update existing freelancer information
- **Delete Freelancer**: Remove freelancer profiles with confirmation dialog
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Material-UI components for a professional look

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Backend API running on `https://localhost:7001`

## Installation

1. Navigate to the frontend directory:

   ```bash
   cd cdn-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
cdn-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── FreelancerList.js      # Main listing component
│   │   ├── AddFreelancer.js       # Add new freelancer form
│   │   └── EditFreelancer.js      # Edit freelancer form
│   ├── services/
│   │   └── api.js                 # API service layer
│   ├── App.js                     # Main app component with routing
│   └── index.js                   # App entry point
└── package.json
```

## API Integration

The frontend communicates with the backend API through the following endpoints:

- `GET /api/Freelancer/ListAll` - Get all freelancers
- `GET /api/Freelancer/Get?userId={id}` - Get freelancer by ID
- `POST /api/Freelancer/Register` - Create new freelancer
- `PUT /api/Freelancer/Update` - Update freelancer
- `DELETE /api/Freelancer/Delete?userId={id}` - Delete freelancer
- `GET /api/Freelancer/Search?searchQuery={query}` - Search freelancers

## Technologies Used

- **React 18** - Frontend framework
- **Material-UI (MUI)** - UI component library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Emotion** - CSS-in-JS styling (used by MUI)

## Features in Detail

### Freelancer Listing

- Displays freelancers in responsive cards
- Shows basic information, skills, and hobbies
- Quick action buttons for edit and delete
- Search functionality with real-time results

### Add/Edit Freelancer

- Form validation for required fields
- Autocomplete for common skills and hobbies
- Chip-based display for skills and hobbies
- Success/error notifications

### Search

- Real-time search across name, email, and skills
- Debounced input for better performance
- Clear search results display

## Development Notes

- The app uses Material-UI's theming system for consistent styling
- All API calls are centralized in the `services/api.js` file
- Error handling is implemented throughout the application
- The app is fully responsive and works on all device sizes

## Troubleshooting

1. **CORS Issues**: Ensure the backend CORS policy allows `http://localhost:3000`
2. **API Connection**: Verify the backend is running on `https://localhost:7001`
3. **Port Conflicts**: If port 3000 is in use, React will automatically suggest an alternative port

## Contributing

1. Follow the existing code style and structure
2. Add appropriate error handling for new features
3. Test all functionality before submitting changes
4. Update this README if adding new features or changing the structure
