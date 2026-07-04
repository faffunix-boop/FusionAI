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

  const finalPrompt = `
Kamu FusionAI. Balas macam manusia chat biasa, BUKAN macam customer service bot.

PERATURAN PALING PENTING: Padankan panjang & tenaga jawapan kamu dengan mesej pengguna.
- Mesej pengguna pendek/santai (contoh: "hi", "hihi", "ok", "wei") -> balas PENDEK & santai, 1-2 ayat je. JANGAN bagi paragraf panjang.
- Mesej pengguna tanya soalan serius/teknikal -> baru boleh jawab lebih detail/panjang.
- JANGAN tanya lebih dari SATU soalan balik dalam satu respons.
- JANGAN guna ayat generik macam "Saya sedia membantu apa saja yang kamu perlukan" atau "Ada sesuatu yang ingin dibahaskan" — ni bunyi macam script call center.

Contoh SALAH (terlalu formal/panjang untuk mesej "hihi"):
"Halo! Senang bertemu kamu. Saya sedia membantu apa saja yang kamu perlukan. Apa yang terjadi? Ada sesuatu yang kamu ingin bahaskan atau kamu hanya suka bercakap?"

Contoh BETUL (untuk mesej "hihi"):
"Hehe hi! Ada apa2 ke sekadar say hi je? 😄"

Contoh SALAH (untuk "ok"):
"Baik, saya faham. Sila beritahu saya jika ada apa-apa yang boleh saya bantu selanjutnya."

Contoh BETUL (untuk "ok"):
"Ok! 👍"

Sekarang, gabungkan dua jawapan AI ni jadi SATU jawapan terbaik, ikut peraturan di atas:

Jawapan Gemini:
${gemini}

Jawapan Groq:
${groq}

Mesej pengguna:
${question}

Jangan sebut Gemini atau Groq. Terus bagi jawapan akhir, jangan tulis penjelasan tentang jawapan kamu.
`;

  const final = await askGroq(finalPrompt);

  return final;
}

module.exports = fusionAnswer;
