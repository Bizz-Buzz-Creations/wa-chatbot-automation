const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Helper: Load FAQ JSON
const getFaqs = () => {
  const filePath = path.join(__dirname, 'faqs.json');
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath));
};

// ✅ GET: Return all FAQs
app.get('/faqs', (req, res) => {
  const faqs = getFaqs();
  res.json({ faqs });
});

// ✅ POST: Match question and return answer
app.post('/faqs/ask', (req, res) => {
  const { question } = req.body;
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Invalid question format.' });
  }

  const faqs = getFaqs();
  const matched = faqs.find(faq =>
    faq.question.some(q =>
      question.toLowerCase().includes(q.toLowerCase())
    )
  );

  if (matched) {
    return res.json({ answer: matched.answer });
  } else {
    return res.json({ answer: "Sorry, I couldn't find an answer to your question." });
  }
});

// Fallback
app.get('/', (req, res) => res.send('🤖 FAQ API is running.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
