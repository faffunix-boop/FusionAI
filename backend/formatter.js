// Formatter: kemaskan jawapan akhir sebelum hantar ke pengguna —
// buang whitespace berlebihan, pastikan code fence ada language tag.

function format(answer) {
  let out = answer.trim();

  // Buang lebih dari 2 baris kosong berturut-turut
  out = out.replace(/\n{3,}/g, "\n\n");

  // Kalau code fence tiada language tag (```\n bukan ```js\n), cuba anggar "text"
  out = out.replace(/```\n/g, "```text\n");

  return out;
}

module.exports = format;
