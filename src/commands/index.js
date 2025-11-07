const { generateCommit } = require("./generateCommit");
const { autonomousCommit } = require("./autonomousCommit");
const { analyzeBugsCommand } = require("./analyzeBugs");

module.exports = {
  generateCommit,
  autonomousCommit,
  analyzeBugsCommand,
};
