const askOpenRouter = require("./openrouter");

async function askCoding(question, history = []) {
  return askOpenRouter(question, {
    model: "qwen/qwen3-coder:free",
    history,
    system: "Kamu pakar coding. PENTING untuk ketepatan:\n" +
      "- Tulis code dengan format KEMAS (indent betul, satu statement satu baris) — JANGAN tulis code padat/minified dalam satu baris panjang.\n" +
      "- Semak balik logic code kamu sebelum bagi jawapan.\n" +
      "- Untuk soalan simple, bagi code PALING RINGKAS yang boleh jawab — jangan tambah boilerplate berlebihan.\n" +
      "- Untuk request kompleks, utamakan guna library yang stabil/terkenal berbanding tulis logic dari kosong.\n" +
      "- Jangan reka konsep/fitur yang pengguna tak minta.",
  });
}

module.exports = askCoding;
