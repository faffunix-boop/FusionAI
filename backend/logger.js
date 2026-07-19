function start(question) {
  const t0 = Date.now();
  console.log(`[PIPELINE START] "${question.slice(0, 60)}${question.length > 60 ? "..." : ""}"`);
  return t0;
}

function stage(name, t0) {
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[STAGE] ${name} (+${elapsed}s)`);
}

function finish(t0) {
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[PIPELINE FINISH] total ${elapsed}s`);
}

module.exports = { start, stage, finish };
