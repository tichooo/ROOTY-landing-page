const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// Helper to read/write JSON files (will be replaced by a real DB later)
const USERS_FILE = path.join('/tmp', 'users.json');
const TOKENS_FILE = path.join('/tmp', 'verification_tokens.json');

function readJSON(filePath, defaultValue = []) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
  }
  return defaultValue;
}

function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
  }
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Call Google Apps Script to send email
async function sendVerificationEmail(email, token) {
  const verificationUrl = `${process.env.VERCEL_URL || 'http://localhost:3000'}/verify-email?token=${token}`;
  
  try {
    const response = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Verify Your Rooty Account',
        verificationUrl: verificationUrl
      })
    });
    
    const result = await response.json();
    console.log('📧 Email sent via Google Apps Script:', result);
    return result.success;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Validation
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ ok: false, error: 'Password must be at least 6 characters' });
  }

  try {
    // Read existing users
    const users = readJSON(USERS_FILE, []);

    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ ok: false, error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      verified: false,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeJSON(USERS_FILE, users);

    // Create verification token
    const token = uuidv4();
    const tokens = readJSON(TOKENS_FILE, []);
    tokens.push({
      token,
      email,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });
    writeJSON(TOKENS_FILE, tokens);

    // Send verification email via Google Apps Script
    const emailSent = await sendVerificationEmail(email, token);

    if (emailSent) {
      return res.status(200).json({
        ok: true,
        message: 'Account created! Please check your email to verify your account.'
      });
    } else {
      return res.status(200).json({
        ok: true,
        message: 'Account created, but there was an issue sending the verification email. Please try again later.'
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
