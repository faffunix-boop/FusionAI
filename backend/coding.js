const askOpenRouter = require("./openrouter");

async function askCoding(question, history = []) {
  try {
    // AI pertama: buat draf kod/jawapan
    const draft = await askOpenRouter(question, {
      model: "tencent/hy3:free",
      system: `Anda adalah AI pakar pengaturcaraan (expert programming AI).
Tugas anda adalah menulis kod yang bersih, efisien, dan berfungsi sepenuhnya berdasarkan permintaan pengguna.
Berikan kod serta penjelasan yang ringkas dan padat.`,
      history,
    });

    // AI kedua: Menyemak, membetulkan pepijat (bug), dan menyusun semula format jawapan dalam Markdown yang sangat kemas.
    const refinementPrompt = `Berikut adalah soalan pengguna:
"${question}"

Dan berikut adalah draf jawapan/kod yang dihasilkan:
${draft}

Sila semak draf tersebut. Betulkan sebarang pepijat (bugs) atau ralat sintaks jika ada.
Seterusnya, bentangkan jawapan akhir dalam format Markdown yang sangat kemas, teratur, dan profesional mengikut panduan berikut:
1. Gunakan tajuk (Markdown headers seperti ### atau ####) untuk membahagikan seksyen penjelasan.
2. Gunakan senarai (bullet points atau numbered lists) untuk menerangkan langkah atau ciri-ciri penting.
3. Letakkan SEMUA kod di dalam blok kod Markdown dengan tag bahasa yang betul (contoh: \`\`\`javascript, \`\`\`python, \`\`\`html, \`\`\`css, dsb.) supaya UI dapat memaparkannya dengan cantik menggunakan penyerlah sintaks (syntax highlighter).
4. Pastikan kod tersebut bersih, teratur (proper indentation), dan dilengkapi dengan komen yang ringkas dan membantu.
5. Sediakan penjelasan yang mesra, bijak, dan profesional dalam Bahasa Melayu / Bahasa Indonesia (atau Bahasa Inggeris jika pengguna bertanya dalam Bahasa Inggeris).
6. Jangan hantar teks kod mentah tanpa blok kod triple backticks (\`\`\`).`;

    const refinedAnswer = await askOpenRouter(refinementPrompt, {
      model: "cohere/north-mini-code:free",
      system: "Anda adalah AI penyunting kod dan pakar dokumentasi teknikal yang mahir menulis jawapan Markdown yang sangat kemas, bersih, dan profesional.",
      history: [],
    });

    return refinedAnswer;

  } catch (error) {
    console.error("askCoding error:", error.message);
    throw error;
  }
}

module.exports = askCoding;
