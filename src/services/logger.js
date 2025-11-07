function log(message) {
  console.log(`[AI Committer] ${message}`);
}

function logError(message, error) {
  console.error(`[AI Committer] ${message}`, error);
}

module.exports = {
  log,
  logError,
};
