const vscode = require("vscode");

function getConfig() {
  const config = vscode.workspace.getConfiguration("aiCommitter");
  const provider = config.get("apiProvider", "openai");

  return {
    provider,
    openai: {
      apiKey: config.get("openai.apiKey"),
      model: config.get("openai.model", "gpt-3.5-turbo"),
    },
    anthropic: {
      apiKey: config.get("anthropic.apiKey"),
      model: config.get("anthropic.model", "claude-3-haiku-20240307"),
    },
    gemini: {
      apiKey: config.get("gemini.apiKey"),
      model: config.get("gemini.model", "gemini-pro"),
    },
    ollama: {
      baseUrl: config.get("ollama.baseUrl", "http://localhost:11434"),
      model: config.get("ollama.model", "llama2"),
    },
    bugDetection: {
      enabled: config.get("bugDetection.enabled", true),
      severity: config.get("bugDetection.severity", "medium"),
    },
    autonomous: {
      enabled: config.get("autonomous.enabled", false),
      autoAnalyze: config.get("autonomous.autoAnalyze", true),
    },
  };
}

module.exports = {
  getConfig,
};
