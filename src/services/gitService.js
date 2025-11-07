const { exec } = require("child_process");
const { promisify } = require("util");
const vscode = require("vscode");

const execAsync = promisify(exec);

async function getStagedDiff() {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

  if (!workspaceFolder) {
    throw new Error("No workspace folder found");
  }

  const { stdout } = await execAsync("git diff --staged", {
    cwd: workspaceFolder.uri.fsPath,
  });

  return stdout.trim();
}

module.exports = {
  getStagedDiff,
};
