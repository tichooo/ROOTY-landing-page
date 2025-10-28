const { kv } = require('@vercel/kv');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    // Get all subscriber emails
    const subscriberEmails = await kv.smembers('subscribers:all');
    
    if (!subscriberEmails || subscriberEmails.length === 0) {
      return res.status(200).json({
        ok: true,
        count: 0,
        subscribers: [],
        exportedAt: new Date().toISOString()
      });
    }

    // Get all subscriber data
    const subscribers = [];
    for (const email of subscriberEmails) {
      const subscriber = await kv.get(`subscriber:${email}`);
      if (subscriber) {
        subscribers.push(subscriber);
      }
    }

    // Sort by subscription date
    subscribers.sort((a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt));

    // Return as JSON for download
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="rooty-subscribers-${Date.now()}.json"`);
    
    return res.status(200).json({
      ok: true,
      count: subscribers.length,
      subscribers: subscribers,
      exportedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Export subscribers error:', error);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
