const askGroq = require("./groq");

async function classifyTask(question, history = []) {
  const recentContext = history
    .slice(-4)
    .map((h) => `${h.role}: ${h.content}`)
    .join("\n");

  const prompt = `Klasifikasikan mesej TERKINI ni ke SATU kategori sahaja: code atau general.

code = soalan pasal programming, code, debug, error, function, script, syntax — ATAU sambungan/susulan dari perbualan tentang code (contoh: "selain itu?", "ada lagi?", "macam mana pulak" selepas topik sebelum ni pasal code).
general = semua yang lain (sembang biasa, nasihat, pengetahuan umum, sejarah, konsep) yang TIDAK berkaitan code.

${recentContext ? `Konteks perbualan sebelum ni:\n${recentContext}\n` : ""}
Mesej TERKINI (klasifikasikan ni): ${question}

Jawab dengan SATU perkataan sahaja: code atau general.`;

  try {
    const result = await askGroq(prompt, { model: "llama-3.3-70b-versatile" });
    const clean = result.trim().toLowerCase();
    if (clean.includes("code")) return "code";
    return "general";
  } catch (e) {
    return "general";
  }
}

module.exports = classifyTask;
