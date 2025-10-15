const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const CSV_PATH = path.join(__dirname, 'subscribers.csv');

app.use(cors());
app.use(bodyParser.json());

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

app.listen(PORT, () => {
  console.log(`Email-collector server running on port ${PORT}`);
});
