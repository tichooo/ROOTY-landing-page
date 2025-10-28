// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 4000;
const CSV_PATH = path.join(__dirname, 'subscribers.csv');
const USERS_PATH = path.join(__dirname, 'users.json');
const VERIFICATION_TOKENS_PATH = path.join(__dirname, 'verification_tokens.json');

app.use(cors());
app.use(bodyParser.json());

// Configure email transporter
// Use SendGrid for production (Render), Gmail for local development
const transporter = nodemailer.createTransport(
  process.env.SENDGRID_API_KEY
    ? {
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY
        }
      }
    : {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || 'your-email@gmail.com',
          pass: process.env.EMAIL_PASS || 'your-app-password'
        }
      }
);

// Helper functions
function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

// Send verification email
async function sendVerificationEmail(email, token) {
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const verificationUrl = `${baseUrl}/verify-email?token=${token}`;
  
  console.log('📧 Tentative d\'envoi d\'email à:', email);
  console.log('🔑 Configuration email:', {
    user: process.env.EMAIL_USER,
    hasPassword: !!process.env.EMAIL_PASS,
    hasSendGrid: !!process.env.SENDGRID_API_KEY
  });
  
  const fromEmail = process.env.SENDGRID_API_KEY 
    ? 'my.rooty.app@gmail.com' // SendGrid verified sender (update after verification)
    : process.env.EMAIL_USER || 'your-email@gmail.com';
  
  const mailOptions = {
    from: fromEmail,
    to: email,
    subject: 'Verify Your Rooty Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Rooty!</h2>
        <p>Thank you for creating an account. Please verify your email address by clicking the button below:</p>
        <a href="${verificationUrl}" 
           style="display: inline-block; padding: 12px 24px; margin: 20px 0; 
                  background-color: #4CAF50; color: white; text-decoration: none; 
                  border-radius: 5px;">
          Verify Email Address
        </a>
        <p>Or copy and paste this link in your browser:</p>
        <p style="color: #666; word-break: break-all;">${verificationUrl}</p>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          This link will expire in 24 hours. If you didn't create this account, please ignore this email.
        </p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email envoyé avec succès:', info.messageId);
    console.log('📨 Réponse:', info.response);
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    console.error('Code d\'erreur:', error.code);
    console.error('Message:', error.message);
    return false;
  }
}

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email' });
  }

  const header = 'email,received_at\n';
  const line = `"${email}","${new Date().toISOString()}"\n`;

  // Ensure CSV exists with header
  if (!fs.existsSync(CSV_PATH)) {
    try {
      fs.writeFileSync(CSV_PATH, header, { encoding: 'utf8' });
    } catch (err) {
      console.error('Failed to create CSV:', err);
      return res.status(500).json({ ok: false, error: 'Server error' });
    }
  }

  // Append line
  fs.appendFile(CSV_PATH, line, (err) => {
    if (err) {
      console.error('Failed to append CSV:', err);
      return res.status(500).json({ ok: false, error: 'Server error' });
    }
    return res.json({ ok: true });
  });
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ ok: false, error: 'Password must be at least 6 characters' });
  }

  // Read existing users
  const users = readJSON(USERS_PATH, []);

  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ ok: false, error: 'Email already registered' });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create verification token
    const verificationToken = uuidv4();
    const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    // Save user
    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      verified: false,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    writeJSON(USERS_PATH, users);

    // Save verification token
    const tokens = readJSON(VERIFICATION_TOKENS_PATH, []);
    tokens.push({
      token: verificationToken,
      email,
      expiry: tokenExpiry
    });
    writeJSON(VERIFICATION_TOKENS_PATH, tokens);

    // Send verification email
    const emailSent = await sendVerificationEmail(email, verificationToken);

    if (!emailSent) {
      console.warn('⚠️ Échec de l\'envoi de l\'email, mais l\'utilisateur a été créé');
      console.log('🔗 Lien de vérification (MODE DEV):', `http://localhost:3000/verify-email?token=${verificationToken}`);
    }

    return res.json({ 
      ok: true, 
      message: 'Account created successfully. Please check your email to verify your account.',
      emailSent,
      // En mode développement, inclure le token si l'email a échoué
      ...((!emailSent && process.env.NODE_ENV !== 'production') && { 
        devToken: verificationToken,
        devLink: `http://localhost:3000/verify-email?token=${verificationToken}`
      })
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ ok: false, error: 'Server error during registration' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email) || !password) {
    return res.status(400).json({ ok: false, error: 'Veuillez remplir tous les champs' });
  }

  const users = readJSON(USERS_PATH, []);
  const user = users.find(u => u.email === email);

  // Si l'utilisateur n'existe pas
  if (!user) {
    return res.status(401).json({ ok: false, error: 'Email inconnu' });
  }

  try {
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Si le mot de passe ne correspond pas
    if (!passwordMatch) {
      return res.status(401).json({ ok: false, error: 'Mot de passe incorrect' });
    }

    // Si l'email n'est pas vérifié
    if (!user.verified) {
      return res.status(403).json({ ok: false, error: 'Veuillez vérifier votre email avant de vous connecter' });
    }

    // Generate simple token (in production, use JWT)
    const token = uuidv4();

    return res.json({ 
      ok: true, 
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ ok: false, error: 'Erreur serveur lors de la connexion' });
  }
});

// Verify email endpoint
app.get('/api/auth/verify-email', (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ ok: false, error: 'Verification token required' });
  }

  const tokens = readJSON(VERIFICATION_TOKENS_PATH, []);
  const tokenData = tokens.find(t => t.token === token);

  if (!tokenData) {
    return res.status(400).json({ ok: false, error: 'Invalid verification token' });
  }

  if (Date.now() > tokenData.expiry) {
    return res.status(400).json({ ok: false, error: 'Verification token expired' });
  }

  // Update user verification status
  const users = readJSON(USERS_PATH, []);
  const user = users.find(u => u.email === tokenData.email);

  if (!user) {
    return res.status(400).json({ ok: false, error: 'User not found' });
  }

  user.verified = true;
  user.verifiedAt = new Date().toISOString();
  writeJSON(USERS_PATH, users);

  // Remove used token
  const updatedTokens = tokens.filter(t => t.token !== token);
  writeJSON(VERIFICATION_TOKENS_PATH, updatedTokens);

  return res.json({ ok: true, message: 'Email verified successfully' });
});

app.listen(PORT, () => {
  console.log(`Email-collector server running on port ${PORT}`);
});
