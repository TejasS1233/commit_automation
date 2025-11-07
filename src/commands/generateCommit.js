const vscode = require("vscode");
const { getStagedDiff } = require("../services/gitService");
const { generateCommitMessage } = require("../services/aiService");
const { log, logError } = require("../services/logger");

async function generateCommit() {
  try {
    log("Generating commit message...");

    const diff = await getStagedDiff();

    if (!diff) {
      vscode.window.showWarningMessage("No staged changes found");
      return;
    }

    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Generating commit message...",
        cancellable: false,
      },
      async () => {
        const message = await generateCommitMessage(diff);

        const gitExtension =
          vscode.extensions.getExtension("vscode.git").exports;
        const git = gitExtension.getAPI(1);

        if (git.repositories.length > 0) {
          git.repositories[0].inputBox.value = message;
          vscode.window.showInformationMessage("Commit message generated!");
        }
      }
    );
  } catch (error) {
    logError("Failed to generate commit message", error);
    vscode.window.showErrorMessage(
      `Failed to generate commit: ${error.message}`
    );
  }
}

module.exports = { generateCommit };
