const askGemini = require("./ai");
const askGroq = require("./groq");

async function askGeneral(question, history = []) {
  try {
    return await askGemini(question, history);
  } catch (e) {
    // Fallback SAHAJA kalau Gemini down — bukan fusion, satu AI je jawab
    return await askGroq(question, { history });
  }
}

module.exports = askGeneral;
