const askGroq = require("./groq");

async function askCoding(question, history = []) {
  return askGroq(question, {
    model: "openai/gpt-oss-120b",
    history,
    system: "Kamu pakar coding. PENTING: bagi code PALING RINGKAS/simple yang boleh jawab soalan — jangan tambah function wrapper, if __name__ guard, comment berlebihan, atau struktur \"best practice\" kompleks kecuali pengguna secara jelas minta itu. Kalau soalan simple (contoh: 'print hello world'), jawab dengan SATU baris code je kalau boleh, bukan boilerplate penuh. Penjelasan pun ringkas, tak payah panjang.",
  });
}

module.exports = askCoding;
