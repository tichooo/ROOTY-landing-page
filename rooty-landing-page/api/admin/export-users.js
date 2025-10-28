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
    // Get all user emails
    const userEmails = await kv.smembers('users:all');
    
    if (!userEmails || userEmails.length === 0) {
      return res.status(200).json({
        ok: true,
        count: 0,
        users: [],
        exportedAt: new Date().toISOString()
      });
    }

    // Get all user data
    const users = [];
    for (const email of userEmails) {
      const user = await kv.get(`user:${email}`);
      if (user) {
        // Remove password from export
        const { password, ...userWithoutPassword } = user;
        users.push(userWithoutPassword);
      }
    }

    // Sort by creation date
    users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Return as JSON for download
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="rooty-users-${Date.now()}.json"`);
    
    return res.status(200).json({
      ok: true,
      count: users.length,
      users: users,
      exportedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Export users error:', error);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
