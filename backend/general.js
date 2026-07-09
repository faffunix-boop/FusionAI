const askGemini = require("./ai");

async function askGeneral(question, history = []) {
  // Only use Gemini for general queries as requested
  return await askGemini(question, history);
}

module.exports = askGeneral;
