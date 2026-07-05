const askGroq = require("./groq");

async function classifyTask(question) {
  const prompt = `Klasifikasikan mesej ni ke SATU kategori sahaja: code, websearch, atau general.

code = soalan pasal programming, code, debug, error, function, script.
websearch = perlukan maklumat terkini/semasa (berita, harga, cuaca, siapa juara, apa yang baru berlaku, "sekarang", "terkini").
general = semua yang lain (sembang biasa, nasihat, pengetahuan umum yang tak berubah, sejarah, konsep).

Jawab dengan SATU perkataan sahaja: code, websearch, atau general.

Mesej: ${question}`;

  try {
    const result = await askGroq(prompt, { model: "openai/gpt-oss-20b" });
    const clean = result.trim().toLowerCase();
    if (clean.includes("code")) return "code";
    if (clean.includes("websearch") || clean.includes("web search") || clean.includes("web_search")) return "websearch";
    return "general";
  } catch (e) {
    return "general";
  }
}

module.exports = classifyTask;
