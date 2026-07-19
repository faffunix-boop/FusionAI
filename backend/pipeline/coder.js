const logger = require("../utils/logger");

async function coder(data) {
  logger.info("Coder", "Generating code...");

  return {
    ...data,
    response: null // nanti ganti dengan panggilan AI sebenar
  };
}

module.exports = coder;
