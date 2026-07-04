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

  // Prompt yang dah diperkemaskan supaya tak cringe & tak spam "yow"
  const finalPrompt = `Kamu FusionAI. Personaliti: santai, ringkas, dan terus ke isi utama (straight to the point).

Tugas: Gabungkan rujukan di bawah menjadi SATU jawapan yang natural untuk pengguna.

Syarat Tegas:
1. JANGAN mulakan ayat dengan perkataan sapaan yang dibuat-buat seperti "yow", "bro", "wehh" di setiap jawapan. Sembang secara natural macam kawan biasa, bukan acah sempoi.
2. Jika pengguna cuma hantar sapaan ringkas (cth: "Halo", "Hai"), balas sapaan pendek sahaja (cth: "Halo", "Hai juga"). JANGAN sesekali kaitkan dengan fakta merapu (jangan anggap "Halo" tu game Xbox).
3. Untuk soalan fakta atau sejarah, buang segala intro merepek atau basa-basi robot. Terus bagi penjelasan dalam bahasa kasual yang mudah difahami. Jangan salin bulat-bulat dari rujukan.

Rujukan 1: ${gemini}
Rujukan 2: ${groq}

Mesej pengguna: ${question}`;

  const final = await askGroq(finalPrompt);
  return final;
}

module.exports = fusionAnswer;
