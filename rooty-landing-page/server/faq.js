const express = require('express');
const cors = require('cors');
const { appendFileSync, existsSync } = require('fs');
const { join } = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for the React app
app.use(cors());
app.use(express.json());

// Create questions.csv if it doesn't exist
const questionsFile = join(__dirname, 'questions.csv');
if (!existsSync(questionsFile)) {
  appendFileSync(questionsFile, 'timestamp,email,question,language\n');
}

// Handle question submissions
app.post('/api/questions', (req, res) => {
  try {
    const { email, question, timestamp, language } = req.body;

    // Basic validation
    if (!email || !question) {
      return res.status(400).json({ error: 'Email and question are required' });
    }

    // Sanitize data for CSV (replace commas and newlines)
    const sanitizedQuestion = question.replace(/[,\n\r]/g, ' ');
    const sanitizedEmail = email.replace(/[,\n\r]/g, ' ');

    // Append to CSV file
    const csvLine = `${timestamp},"${sanitizedEmail}","${sanitizedQuestion}","${language}"\n`;
    appendFileSync(questionsFile, csvLine);

    res.json({ success: true });
  } catch (error) {
    console.error('Error saving question:', error);
    res.status(500).json({ error: 'Failed to save question' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`FAQ server running on port ${port}`);
});