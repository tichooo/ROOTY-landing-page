const fs = require('fs');
const path = require('path');

const SUBSCRIBERS_FILE = path.join('/tmp', 'subscribers.json');

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

  const { email } = req.body;

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address' });
  }

  try {
    // Read existing subscribers
    const subscribers = readJSON(SUBSCRIBERS_FILE, []);

    // Check if already subscribed
    if (subscribers.find(s => s.email === email)) {
      return res.status(400).json({ ok: false, error: 'Email already subscribed' });
    }

    // Add new subscriber
    subscribers.push({
      email,
      subscribedAt: new Date().toISOString()
    });

    writeJSON(SUBSCRIBERS_FILE, subscribers);

    return res.status(200).json({
      ok: true,
      message: 'Successfully subscribed to newsletter!'
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
