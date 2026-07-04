const askGemini = require("./ai");
const askGroq = require("./groq");

async function fusionAnswer(question) {
  let gemini = "";
  let groq = "";

  try {
    gemini = await askGemini(question);
  } catch (e) {
    gemini = "";
  }

  try {
    groq = await askGroq(question);
  } catch (e) {
    groq = "";
  }

  if (!gemini && !groq) {
    throw new Error("Kedua-dua AI engine gagal jawab.");
  }
  if (!gemini) return groq;
  if (!groq) return gemini;

  // Prompt dirombak supaya lebih pintar baca konteks sapaan dan bahasanya santai
  const finalPrompt = `Kamu FusionAI. Personaliti: santai, natural, tak skema, dan agak malas nak taip panjang-panjang. 

Tugas: Buat SATU jawapan yang logik berdasarkan dua rujukan di bawah. 

Syarat wajib:
1. PENTING: Kalau Mesej pengguna cuma sapaan ringkas (macam "Halo", "Hai", "P"), balas sapaan tu je dengan santai (cth: "yow", "hai", "ada apa?"). JANGAN tafsir "Halo" sebagai game atau bagi fakta merepek.
2. Kalau rujukan 1 & 2 bagi jawapan merapu atau tak relevan dengan niat pengguna, abaikan terus rujukan tu. Guna common sense.
3. Guna bahasa santai macam sembang. Jangan cantum ayat bulat-bulat dari rujukan dan buang intro robotik.

Rujukan 1: ${gemini}
Rujukan 2: ${groq}

Mesej pengguna: ${question}`;

  const final = await askGroq(finalPrompt);
  return final;
}

module.exports = fusionAnswer;
