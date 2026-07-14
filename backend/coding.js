const askOpenRouter = require("./openrouter");
const askGroq = require("./groq");

async function askCoding(question, history = []) {
  try {
    const draft = await askOpenRouter(question, {
      model: "tencent/hy3:free",
      history,
    });

    const fixedCode = await askGroq(
`You are a bug fixing AI.

Your ONLY job:
Fix real bugs in the code.

STRICT RULES:
- Do NOT rewrite the code.
- Do NOT refactor.
- Do NOT optimize.
- Do NOT redesign.
- Do NOT add features.
- Do NOT remove features.
- Keep the same structure.
- Make the smallest possible fix.
- Change code only if a real bug exists.
- If there is no bug, return the original code.

OUTPUT:
- Return ONLY the complete code.
- No explanation.
- No analysis.
- No markdown.
- No comments.

CODE:
${draft}`,
      {
        model: "qwen/qwen3.6-27b",
        history: []
      }
    );

    return fixedCode;

  } catch (error) {
    console.error("askCoding error:", error.message);
    throw error;
  }
}

module.exports = askCoding;
