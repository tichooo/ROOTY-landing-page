# Rooty Landing Page Server

Backend server for email collection, user authentication, and email verification.

## Features

- Email subscription collection
- User registration with email verification
- User login with password hashing
- Email verification system

## 🚀 Deployment on Render.com

### Step 1: Push your code to GitHub

Make sure your server code is in the `server/` directory of your repository.

### Step 2: Create a Render account

1. Go to https://render.com
2. Sign up with GitHub

### Step 3: Create a new Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: rooty-backend
   - **Root Directory**: server
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 4: Add Environment Variables

In the Render dashboard, add these environment variables:
- `EMAIL_USER`: your-email@gmail.com
- `EMAIL_PASS`: your-app-password
- `NODE_ENV`: production

### Step 5: Deploy

Click "Create Web Service". Render will deploy your backend and give you a URL like:
`https://rooty-backend.onrender.com`

### Step 6: Update Frontend

Update your frontend (on Vercel) to use the Render backend URL instead of localhost:4000.

## Local Setup

1. Install dependencies:
```bash
npm install
```

2. Configure email settings:

Create a `.env` file in the server directory with your email credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=4000
```

### Gmail Configuration

If using Gmail:
1. Enable 2-factor authentication on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the App Password as EMAIL_PASS (not your regular password)

## Running Locally

Start the server:
```bash
npm start
```

Server will run on http://localhost:4000

## API Endpoints

### POST /api/subscribe
Subscribe to newsletter
- Body: `{ "email": "user@example.com" }`

### POST /api/auth/register
Register new user
- Body: `{ "email": "user@example.com", "password": "password123" }`
- Sends verification email

### POST /api/auth/login
Login user
- Body: `{ "email": "user@example.com", "password": "password123" }`
- Returns token on success

### GET /api/auth/verify-email
Verify email address
- Query: `?token=verification-token`

## Data Storage

- `subscribers.csv` - Newsletter subscribers
- `users.json` - Registered users with hashed passwords
- `verification_tokens.json` - Email verification tokens (24h expiry)

## Security Notes

- Passwords are hashed using bcrypt
- Verification tokens expire after 24 hours
- Always use environment variables for sensitive data in production
- Consider using a proper database (MongoDB, PostgreSQL) for production

