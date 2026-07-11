const askGroq = require("./groq");

async function askGeneral(question, history = []) {
  // Use Groq for general queries as requested
  return await askGroq(question, {
    model: "llama-3.3-70b-versatile",
    history,
    system: "Kamu adalah Nexa, asisten AI yang bijak dan membantu. Jawab dalam Bahasa Melayu atau Bahasa Indonesia mengikut kesesuaian soalan."
  });
}

module.exports = askGeneral;
