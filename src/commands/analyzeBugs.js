const vscode = require("vscode");
const { getStagedDiff } = require("../services/gitService");
const { analyzeBugs } = require("../services/bugDetectionService");
const { log, logError } = require("../services/logger");

/**
 * Analyze staged changes for potential bugs
 */
async function analyzeBugsCommand() {
  try {
    log("Analyzing code for bugs...");

    const diff = await getStagedDiff();

    if (!diff) {
      vscode.window.showWarningMessage("No staged changes found");
      return;
    }

    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Analyzing code for bugs...",
        cancellable: false,
      },
      async () => {
        const issues = await analyzeBugs(diff);

        if (issues.length === 0) {
          vscode.window.showInformationMessage(
            "✓ No bugs detected in staged changes"
          );
        } else {
          const message = `Found ${issues.length} potential issue(s)`;
          vscode.window
            .showWarningMessage(message, "View Details")
            .then((selection) => {
              if (selection === "View Details") {
                // TODO: Show detailed bug report in webview or output channel
                log(`Bug analysis results: ${JSON.stringify(issues, null, 2)}`);
              }
            });
        }
      }
    );
  } catch (error) {
    logError("Failed to analyze bugs", error);
    vscode.window.showErrorMessage(`Bug analysis failed: ${error.message}`);
  }
}

module.exports = { analyzeBugsCommand };
