const logger = require("../utils/logger");

const router = require("./router");
const planner = require("./planner");
const coder = require("./coder");
const reviewer = require("./reviewer");
const validator = require("./validator");
const formatter = require("./formatter");

async function runPipeline(data) {
  logger.start();

  try {

    data = await router(data);

    data = await planner(data);

    data = await coder(data);

    data = await reviewer(data);

    data = await validator(data);

    if (!data.valid) {
      throw new Error(
        data.validation.join("\n") || "Validation failed."
      );
    }

    const output = await formatter(data);

    logger.success("Pipeline", "Pipeline selesai.");

    logger.finish();

    return output;

  } catch (err) {

    logger.error("Pipeline", err);

    throw err;

  }
}

module.exports = {
  runPipeline
};
