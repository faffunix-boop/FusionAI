const askOpenRouter = require("./openrouter");
const askGroq = require("./groq");

async function askCoding(question, history = []) {
  try {
    // AI 1: Buat code
    const draft = await askOpenRouter(question, {
      model: "tencent/hy3:free",
      history,
    });

    // AI 2: DeepSeek-R1 review & baiki
    const reviewed = await askGroq(`
Kamu adalah AI Code Reviewer.

Semak code ini:
- Cari semua bug.
- Baiki syntax error.
- Baiki logic error.
- Tingkatkan kualiti code jika perlu.
- Pulangkan HANYA keseluruhan code yang sudah diperbaiki.
- Jangan beri penjelasan.

CODE:
${draft}
`, {
      model: "deepseek-r1-distill-qwen-32b",
      history,
    });

    return reviewed;

  } catch (error) {
    console.error("askCoding error:", error);
    throw error;
  }
}

module.exports = askCoding;
