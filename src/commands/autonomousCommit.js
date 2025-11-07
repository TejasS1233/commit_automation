const vscode = require("vscode");
const { getStagedDiff } = require("../services/gitService");
const { generateCommitMessage } = require("../services/aiService");
const { analyzeBugs } = require("../services/bugDetectionService");
const { log, logError } = require("../services/logger");
const { getConfig } = require("../utils/config");

/**
 * Autonomous commit - analyzes code, generates message, and commits automatically
 */
async function autonomousCommit() {
  try {
    log("Starting autonomous commit...");

    const config = getConfig();

    if (!config.autonomous.enabled) {
      const enable = await vscode.window.showWarningMessage(
        "Autonomous committing is disabled. Enable it?",
        "Enable",
        "Cancel"
      );
      if (enable !== "Enable") return;
    }

    const diff = await getStagedDiff();

    if (!diff) {
      vscode.window.showWarningMessage("No staged changes found");
      return;
    }

    // TODO: Implement full autonomous commit logic
    // - Analyze code for bugs (if enabled)
    // - Generate commit message
    // - Show preview with analysis results
    // - Require user confirmation
    // - Execute git commit
    // - Optional: push to remote

    vscode.window.showInformationMessage(
      "Autonomous committing with bug detection coming soon!"
    );
  } catch (error) {
    logError("Failed to perform autonomous commit", error);
    vscode.window.showErrorMessage(
      `Autonomous commit failed: ${error.message}`
    );
  }
}

module.exports = { autonomousCommit };
