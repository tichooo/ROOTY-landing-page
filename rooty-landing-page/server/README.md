# Rooty Landing Page Server

Backend server for email collection, user authentication, and email verification.

## Features

- Email subscription collection
- User registration with email verification
- User login with password hashing
- Email verification system

## Setup

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

### Alternative Email Services

You can also use other email services by modifying the transporter configuration in `index.js`:

**For SendGrid:**
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

**For Outlook:**
```javascript
const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## Running

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

This small Express server accepts POST /api/subscribe with JSON { email } and appends it to `subscribers.csv` (CSV compatible with Excel).

Run locally:

```powershell
cd server
npm install
npm start
```

By default the server runs on port 4000. To make the Create React App dev server forward API requests to it during development, add this to the root `package.json` of the React app:

```json
"proxy": "http://localhost:4000"
```

Or run both servers and send requests directly to http://localhost:4000/api/subscribe from the frontend.

Security note: this is a minimal example; in production you'll want validation, rate-limiting, and persistence that isn't a plain CSV file.
