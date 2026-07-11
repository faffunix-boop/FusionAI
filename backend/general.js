const askGroq = require("./ai");

async function askGeneral(question, history = []) {
  // Only use Groq for general queries as requested
  return await askGroq(question, history);
}

module.exports = askGeneral;
