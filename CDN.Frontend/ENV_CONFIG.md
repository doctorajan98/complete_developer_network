# Environment Configuration

## Overview

The frontend uses environment variables to configure the API connection and other settings. This allows you to easily switch between development, staging, and production environments.

## Environment Files

### `.env.local` (Active Configuration)

This is your local environment configuration file. It's ignored by git to keep your local settings private.

**Current Configuration:**

```
REACT_APP_API_URL=http://localhost:5238/api/Freelancer
PORT=3000
```

### `.env.example` (Template)

This is a template file showing all available environment variables. Copy this to `.env.local` to get started.

## Available Environment Variables

### `REACT_APP_API_URL`

**Description**: Backend API base URL
**Default**: `http://localhost:5238/api/Freelancer`
**Examples**:

- Development: `http://localhost:5238/api/Freelancer`
- Production: `https://api.yourdomain.com/api/Freelancer`
- Staging: `https://staging-api.yourdomain.com/api/Freelancer`

### `PORT`

**Description**: Port for the React development server
**Default**: `3000`
**Note**: Only affects development mode

## How to Use

### 1. Local Development (Default)

The app will automatically use `http://localhost:5238/api/Freelancer` if no `.env.local` file exists.

### 2. Custom Configuration

1. Copy `.env.example` to `.env.local`:

   ```bash
   copy .env.example .env.local
   ```

2. Edit `.env.local` with your settings:

   ```
   REACT_APP_API_URL=http://your-api-url/api/Freelancer
   PORT=3000
   ```

3. Restart the development server:
   ```bash
   npm start
   ```

### 3. Production Deployment

For production, set the environment variable in your hosting platform:

**Vercel/Netlify:**

- Add `REACT_APP_API_URL` in the environment variables section
- Value: Your production API URL

**Docker:**

```dockerfile
ENV REACT_APP_API_URL=https://api.yourdomain.com/api/Freelancer
```

**Build with custom env:**

```bash
REACT_APP_API_URL=https://api.yourdomain.com/api/Freelancer npm run build
```

## Important Notes

⚠️ **Environment Variable Rules:**

- Must start with `REACT_APP_` to be accessible in React
- Embedded at build time, not runtime
- Changes require server restart in development
- Changes require rebuild for production

🔒 **Security:**

- `.env.local` is in `.gitignore` (not committed to git)
- Don't put sensitive secrets in environment variables (use backend instead)
- API keys should be managed on the backend

## Troubleshooting

### API Not Connecting

1. Check `.env.local` file exists
2. Verify `REACT_APP_API_URL` is correct
3. Restart development server
4. Check browser console for the logged API URL

### Environment Variable Not Loading

1. Ensure variable starts with `REACT_APP_`
2. Restart the development server (environment variables are loaded at startup)
3. Check for typos in variable name

### Production Build Issues

1. Ensure environment variables are set in your hosting platform
2. Rebuild the application after changing environment variables
3. Verify the API URL is accessible from your production environment

## Checking Current Configuration

The API URL is logged to the browser console in development mode:

```
API Base URL: http://localhost:5238/api/Freelancer
```

Open browser DevTools (F12) → Console tab to see the current configuration.

## File Locations

```
CDN.Frontend/
├── .env.local          # Your local config (ignored by git)
├── .env.example        # Template file (committed to git)
├── .gitignore          # Ensures .env.local is not committed
└── src/
    └── services/
        └── api.js      # Uses REACT_APP_API_URL
```

## Quick Reference

| Task                | Command                        |
| ------------------- | ------------------------------ |
| Create local config | `copy .env.example .env.local` |
| Edit config         | Open `.env.local` in editor    |
| View current URL    | Check browser console          |
| Reset to default    | Delete `.env.local`            |
| Apply changes       | Restart: `npm start`           |

---

**Need Help?** Check `src/services/api.js` to see how the API URL is used.
