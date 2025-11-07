const vscode = require("vscode");
const {
  generateCommit,
  autonomousCommit,
  analyzeBugsCommand,
} = require("./commands");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("AI Committer is now active");

  const commands = [
    vscode.commands.registerCommand(
      "ai-committer.generateCommit",
      generateCommit
    ),
    vscode.commands.registerCommand(
      "ai-committer.autonomousCommit",
      autonomousCommit
    ),
    vscode.commands.registerCommand(
      "ai-committer.analyzeBugs",
      analyzeBugsCommand
    ),
  ];

  context.subscriptions.push(...commands);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
