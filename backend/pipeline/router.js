// backend/pipeline/router.js

const logger = require("../utils/logger");

async function router(data) {
  logger.info("Router", "Menganalisis permintaan pengguna...");

  const {
    question,
    history = [],
    sendStatus = () => {}
  } = data;

  sendStatus("Router sedang memilih AI...");

  const text = question.toLowerCase();

  const codeKeywords = [
    "code",
    "coding",
    "javascript",
    "js",
    "node",
    "nodejs",
    "html",
    "css",
    "react",
    "vue",
    "python",
    "java",
    "c++",
    "cpp",
    "php",
    "bug",
    "error",
    "fix",
    "repair",
    "debug",
    "api",
    "express",
    "mysql",
    "mongodb",
    "sql",
    "json",
    "github",
    "pipeline",
    "function",
    "class",
    "script"
  ];

  const isCoding = codeKeywords.some(word => text.includes(word));

  const provider = isCoding ? "openrouter" : "groq";

  const model = isCoding
    ? "tencent/hy3:free"
    : "openai/gpt-oss-120b";

  const system = isCoding
    ? [
        "Kamu ialah AI coding Nexa.",
        "Jawab dengan code lengkap.",
        "Jangan ringkaskan code.",
        "Jangan beri cadangan jika pengguna meminta code.",
        "Pastikan code boleh digunakan."
      ].join("\n")
    : [
        "Kamu ialah Nexa.",
        "Jawab dengan jelas.",
        "Gunakan Markdown yang kemas.",
        "Jawab dalam Bahasa Melayu atau Indonesia mengikut konteks."
      ].join("\n");

  logger.success(
    "Router",
    `${provider} | ${model}`
  );

  return {
    ...data,
    task: isCoding ? "code" : "general",
    provider,
    model,
    system,
    question,
    history
  };
}

module.exports = router;
