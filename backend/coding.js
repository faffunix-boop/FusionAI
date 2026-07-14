const askOpenRouter = require("./openrouter");
const askGroq = require("./groq");

async function askCoding(question, history = []) {
  try {
    // AI pertama buat code
    const draft = await askOpenRouter(question, {
      model: "tencent/hy3:free",
      history,
    });

    // AI kedua semak + baiki
    const review = await askGroq(
`SYSTEM:
Kamu adalah AI Code Fixer.

TUGAS:
Baiki code yang diberikan.

RULES:
1. Cari semua bug dan error.
2. Perbaiki code tersebut.
3. Pulangkan CODE PENUH yang sudah diperbaiki.
4. Jangan beri penerangan.
5. Jangan beri komen tentang perubahan.
6. Jangan tulis analisis.
7. Jangan tulis "ini code yang diperbaiki".
8. Jangan gunakan markdown.
9. Output hanya code sahaja.
10. Jangan ubah fungsi asal. Hanya ubah jika ada bukti bug.

Jika code sudah betul, pulangkan code asal.

INPUT CODE:
${draft}`,
      {
        model: "qwen/qwen3.6-27b",
        history: []
      }
    );

    return review;

  } catch (error) {
    console.error("askCoding error:", error.message);
    throw error;
  }
}

module.exports = askCoding;
