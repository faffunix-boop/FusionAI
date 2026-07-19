const logger = require("../utils/logger");

async function formatter(data) {
  logger.info("Formatter", "Formatting response...");

  return data.response;
}

module.exports = formatter;
