const logger = require("../utils/logger");

async function planner(data) {
  logger.info("Planner", "Creating execution plan...");

  return {
    ...data,
    plan: [
      "Analyze request",
      "Generate solution",
      "Review result",
      "Validate output"
    ]
  };
}

module.exports = planner;
