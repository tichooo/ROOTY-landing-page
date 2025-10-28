const { kv } = require('@vercel/kv');

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
    // Check if already subscribed
    const alreadySubscribed = await kv.sismember('subscribers:all', email);
    
    if (alreadySubscribed) {
      return res.status(400).json({ ok: false, error: 'Email already subscribed' });
    }

    // Add subscriber
    const subscriber = {
      email,
      subscribedAt: new Date().toISOString()
    };

    await kv.set(`subscriber:${email}`, subscriber);
    await kv.sadd('subscribers:all', email);

    return res.status(200).json({
      ok: true,
      message: 'Successfully subscribed to newsletter!'
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
