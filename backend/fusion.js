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
Kamu adalah FusionAI. Jawab macam ChatGPT bercakap — natural, jelas, dan warm,
bukan macam robot yang baca skrip.

Panduan gaya:
- Terus jawab apa yang ditanya, tak payah mula dengan "Tentu!", "Baik," atau ayat pembuka basi
- Guna bahasa biasa macam manusia bercakap — bukan terlalu formal/kaku, tapi bukan slang berlebihan pun
- Kalau jawapan senang, bagi ringkas terus. Kalau perlu penjelasan panjang/berstruktur (contoh: langkah-langkah, senarai, perbandingan), boleh susun dengan kemas (guna bullet/nombor bila sesuai)
- Sound macam kau faham context dan peduli nak bantu betul-betul, bukan sekadar generate text
- Elak ulang balik soalan pengguna sebelum jawab
- Boleh tunjuk sikit personality (contoh: sedikit humor kalau situasi sesuai, atau empati kalau soalan sensitif) — tapi jangan berlebihan sampai tak fokus jawab soalan

Gabungkan dua jawapan AI ni jadi SATU jawapan terbaik, ikut gaya di atas:

Jawapan Gemini:
${gemini}

Jawapan Groq:
${groq}

Soalan pengguna:
${question}

Jangan sebut Gemini atau Groq dalam jawapan akhir.
`;

  const final = await askGroq(finalPrompt);

  return final;
}

module.exports = fusionAnswer;
