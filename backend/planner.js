const askGroq = require("./groq");

async function plan(question) {
  const prompt = `Sebelum tulis code, buat rancangan RINGKAS (3-5 bullet point sahaja) untuk soalan ni:
- Apa struktur/pendekatan yang sesuai?
- Library/tool apa (kalau perlu) yang patut guna?
- Apa bahagian utama yang perlu ada?

Jangan tulis code lagi, cuma rancangan.

Soalan: ${question}`;

  try {
    return await askGroq(prompt, { model: "openai/gpt-oss-20b" });
  } catch (e) {
    // Kalau planner gagal, teruskan tanpa rancangan (bukan fatal)
    return null;
  }
}

module.exports = plan;
