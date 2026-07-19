// Validator: check pantas (bukan AI) untuk pastikan jawapan ada code block betul,
// tiada placeholder yang tertinggal, dsb. Kalau gagal, bagi amaran (tak block jawapan).

function validate(answer) {
  const issues = [];

  const hasCodeBlock = /```[\s\S]*```/.test(answer);
  if (!hasCodeBlock) {
    issues.push("Tiada code block dikesan dalam jawapan.");
  }

  const placeholderPatterns = [
    /\bTODO\b/i,
    /\bFIXME\b/i,
    /\.\.\.\s*(\/\/|\#)?\s*(rest of|lanjutan|sambungan)/i,
    /\[INSERT.*?\]/i,
  ];
  for (const pattern of placeholderPatterns) {
    if (pattern.test(answer)) {
      issues.push("Ada placeholder/tanda tak lengkap dikesan (contoh: TODO, FIXME).");
      break;
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

module.exports = validate;
