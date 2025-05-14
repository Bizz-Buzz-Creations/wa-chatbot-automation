const natural = require('natural');
const { JaroWinklerDistance } = natural;
const THRESHOLD = 0.85;

function matchFAQ(userInput, faqs) {
  let bestScore = 0;
  let bestAnswer = null;

  for (const faq of faqs) {
    const score = JaroWinklerDistance(userInput.toLowerCase(), faq.question.toLowerCase());
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = faq.answer;
    }
  }

  return bestScore > THRESHOLD ? bestAnswer : null;
}

module.exports = { matchFAQ };
