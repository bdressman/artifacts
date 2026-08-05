import logger from "./logger.js";

// Mainly used for quick and easy verification of log file creation and messages.
// Not extensive testing.

logger.info("Game Information");
logger.warn("Expected game state");
logger.fail("Unexpected failure");
logger.halt("Pack your bags");