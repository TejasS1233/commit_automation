# AI Committer

Stop writing commit messages. Let AI do it for you.

AI-powered commit message generator and code analyzer for VS Code. Automatically generates conventional commit messages, detects bugs, and enables autonomous committing with safety checks.

## Why AI Committer?

Writing commit messages is tedious. Everyone hates it. AI Committer solves this by:

- **Instant Commit Messages**: Click once, get a perfect conventional commit message
- **Bug Detection**: AI analyzes your code for potential issues before you commit
- **Multi-Provider Support**: Use OpenAI, Anthropic, Gemini, or run locally with Ollama
- **Autonomous Mode**: Let AI handle commits automatically (with your approval)

## Quick Start

1. Install the extension from VS Code Marketplace
2. Open Settings (`Ctrl+,`) → Search "AI Committer"
3. Choose your AI provider
4. Add your API key (or use Ollama locally)
5. Stage some changes in Git
6. Click the ✨ sparkle icon in the Source Control panel

Done! Your commit message is generated instantly.

## Usage

### Generate Commit Messages

1. Make changes to your code
2. Stage files in Git (`git add` or use VS Code UI)
3. Click the sparkle (✨) icon in the Source Control panel
4. AI generates your commit message
5. Review and commit

### Analyze Code for Bugs (Coming Soon)

1. Stage your changes
2. Run command: `AI Committer: Analyze Code for Bugs`
3. View detected issues with severity levels
4. Fix issues before committing

### Autonomous Committing (Coming Soon)

1. Enable in settings: `aiCommitter.autonomous.enabled`
2. Stage your changes
3. Run command: `AI Committer: Autonomous Commit with Analysis`
4. AI analyzes code, generates message, shows preview
5. Confirm to commit

## Supported AI Providers

### OpenAI

Best for: High-quality commit messages, detailed bug analysis

- Models: gpt-3.5-turbo, gpt-4, gpt-4o
- Requires: OpenAI API key

### Anthropic Claude

Best for: Thorough code analysis, security-focused reviews

- Models: claude-3-haiku, claude-3-sonnet, claude-3-opus
- Requires: Anthropic API key

### Google Gemini

Best for: Fast responses, good balance of quality and speed

- Models: gemini-pro, gemini-ultra
- Requires: Google AI API key

### Ollama (Local)

Best for: Privacy, no API costs, offline usage

- Models: llama2, llama3, mistral, codellama, deepseek-coder
- Requires: Ollama installed locally
- Setup: Install from [ollama.ai](https://ollama.ai)

## Configuration

All settings are available in VS Code Settings (`Ctrl+,`) → Search "AI Committer"

### Provider Settings

| Setting                        | Description           | Default                   |
| ------------------------------ | --------------------- | ------------------------- |
| `aiCommitter.apiProvider`      | AI provider to use    | `openai`                  |
| `aiCommitter.openai.apiKey`    | OpenAI API key        | -                         |
| `aiCommitter.openai.model`     | OpenAI model          | `gpt-3.5-turbo`           |
| `aiCommitter.anthropic.apiKey` | Anthropic API key     | -                         |
| `aiCommitter.anthropic.model`  | Claude model          | `claude-3-haiku-20240307` |
| `aiCommitter.gemini.apiKey`    | Google Gemini API key | -                         |
| `aiCommitter.gemini.model`     | Gemini model          | `gemini-pro`              |
| `aiCommitter.ollama.baseUrl`   | Ollama server URL     | `http://localhost:11434`  |
| `aiCommitter.ollama.model`     | Ollama model          | `llama2`                  |

### Bug Detection Settings (Coming Soon)

| Setting                             | Description                | Default  |
| ----------------------------------- | -------------------------- | -------- |
| `aiCommitter.bugDetection.enabled`  | Enable AI bug detection    | `true`   |
| `aiCommitter.bugDetection.severity` | Minimum severity to report | `medium` |

### Autonomous Commit Settings (Coming Soon)

| Setting                              | Description                  | Default |
| ------------------------------------ | ---------------------------- | ------- |
| `aiCommitter.autonomous.enabled`     | Enable autonomous committing | `false` |
| `aiCommitter.autonomous.autoAnalyze` | Auto-analyze before commits  | `true`  |

## Commands

Access via Command Palette (`Ctrl+Shift+P`):

- `AI Committer: Generate AI Commit Message` - Generate commit message for staged changes
- `AI Committer: Analyze Code for Bugs` - Analyze staged code for potential issues (Coming Soon)
- `AI Committer: Autonomous Commit with Analysis` - Auto-commit with bug analysis (Coming Soon)

## Roadmap

- [x] Multi-provider AI support (OpenAI, Anthropic, Gemini, Ollama)
- [x] Manual commit message generation
- [x] One-click Git panel integration
- [ ] AI-powered bug detection
- [ ] Pre-commit code analysis
- [ ] Autonomous committing with safety checks
- [ ] Commit history analysis
- [ ] Custom commit templates
- [ ] Team-wide commit style configuration
- [ ] Integration with CI/CD pipelines

## Requirements

- VS Code 1.80.0 or higher
- API key for your chosen provider (or Ollama for local models)
- Git repository

## Contributing

Contributions welcome! Please open an issue or PR on GitHub.
