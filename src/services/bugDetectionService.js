const { getConfig } = require("../utils/config");
const OpenAI = require("openai");
const Anthropic = require("@anthropic-ai/sdk");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

const BUG_DETECTION_PROMPT = `You are an expert code reviewer. Analyze this git diff for potential bugs, security issues, and code quality problems.

Focus on:
- Logic errors and edge cases
- Security vulnerabilities
- Memory leaks or performance issues
- Type errors and null/undefined issues
- Race conditions
- Incorrect error handling

Return a JSON array of issues found. Each issue should have:
- severity: "low", "medium", or "high"
- type: "bug", "security", "performance", or "quality"
- line: approximate line number
- description: clear explanation of the issue
- suggestion: how to fix it

If no issues found, return an empty array [].

Git diff:
{DIFF}`;

async function analyzeBugsWithOpenAI(diff, config) {
  const openai = new OpenAI({ apiKey: config.openai.apiKey });
  const response = await openai.chat.completions.create({
    model: config.openai.model,
    messages: [
      {
        role: "user",
        content: BUG_DETECTION_PROMPT.replace("{DIFF}", diff),
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
  });

  const result = JSON.parse(response.choices[0].message.content);
  return result.issues || [];
}

async function analyzeBugsWithAnthropic(diff, config) {
  const anthropic = new Anthropic({ apiKey: config.anthropic.apiKey });
  const response = await anthropic.messages.create({
    model: config.anthropic.model,
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: BUG_DETECTION_PROMPT.replace("{DIFF}", diff),
      },
    ],
  });

  const result = JSON.parse(response.content[0].text);
  return result.issues || [];
}

async function analyzeBugsWithGemini(diff, config) {
  const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
  const model = genAI.getGenerativeModel({ model: config.gemini.model });
  const result = await model.generateContent(
    BUG_DETECTION_PROMPT.replace("{DIFF}", diff)
  );

  const text = result.response.text();
  const parsed = JSON.parse(text);
  return parsed.issues || [];
}

async function analyzeBugsWithOllama(diff, config) {
  const response = await axios.post(`${config.ollama.baseUrl}/api/generate`, {
    model: config.ollama.model,
    prompt: BUG_DETECTION_PROMPT.replace("{DIFF}", diff),
    stream: false,
    format: "json",
  });

  const result = JSON.parse(response.data.response);
  return result.issues || [];
}

async function analyzeBugs(diff) {
  const config = getConfig();

  if (!config.bugDetection.enabled) {
    return [];
  }

  let issues = [];

  switch (config.provider) {
    case "openai":
      issues = await analyzeBugsWithOpenAI(diff, config);
      break;
    case "anthropic":
      issues = await analyzeBugsWithAnthropic(diff, config);
      break;
    case "gemini":
      issues = await analyzeBugsWithGemini(diff, config);
      break;
    case "ollama":
      issues = await analyzeBugsWithOllama(diff, config);
      break;
    default:
      throw new Error(`Unknown provider: ${config.provider}`);
  }

  // Filter by severity
  const minSeverity = config.bugDetection.severity;
  const severityLevels = { low: 1, medium: 2, high: 3 };
  const minLevel = severityLevels[minSeverity];

  return issues.filter((issue) => severityLevels[issue.severity] >= minLevel);
}

module.exports = {
  analyzeBugs,
};
