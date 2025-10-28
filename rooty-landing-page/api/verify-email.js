const fs = require('fs');
const path = require('path');

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

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ ok: false, error: 'No verification token provided' });
  }

  try {
    // Read tokens
    const tokens = readJSON(TOKENS_FILE, []);
    
    // Find token
    const tokenData = tokens.find(t => t.token === token);

    if (!tokenData) {
      return res.status(400).json({ ok: false, error: 'Invalid verification token' });
    }

    // Check if token expired
    if (Date.now() > tokenData.expiresAt) {
      return res.status(400).json({ ok: false, error: 'Verification token has expired' });
    }

    // Read users
    const users = readJSON(USERS_FILE, []);
    
    // Find and update user
    const userIndex = users.findIndex(u => u.email === tokenData.email);

    if (userIndex === -1) {
      return res.status(400).json({ ok: false, error: 'User not found' });
    }

    // Mark user as verified
    users[userIndex].verified = true;
    users[userIndex].verifiedAt = new Date().toISOString();
    writeJSON(USERS_FILE, users);

    // Remove used token
    const updatedTokens = tokens.filter(t => t.token !== token);
    writeJSON(TOKENS_FILE, updatedTokens);

    return res.status(200).json({
      ok: true,
      message: 'Email verified successfully!'
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
