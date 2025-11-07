const OpenAI = require("openai");
const Anthropic = require("@anthropic-ai/sdk");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
const { getConfig } = require("../utils/config");

const PROMPT = `You are an expert developer. Read this git diff and write a perfect, one-line Conventional Commit message.

Rules:
- Use conventional commit format (feat:, fix:, docs:, etc.)
- Keep it under 72 characters
- Be specific and descriptive
- Use present tense

Git diff:
{DIFF}`;

async function generateWithOpenAI(diff, config) {
  if (!config.openai.apiKey) {
    throw new Error(
      "OpenAI API key not configured. Please set aiCommitter.openai.apiKey in settings."
    );
  }

  const openai = new OpenAI({ apiKey: config.openai.apiKey });
  const response = await openai.chat.completions.create({
    model: config.openai.model,
    messages: [{ role: "user", content: PROMPT.replace("{DIFF}", diff) }],
    max_tokens: 100,
    temperature: 0.7,
  });

  return response.choices[0].message.content.trim();
}

async function generateWithAnthropic(diff, config) {
  if (!config.anthropic.apiKey) {
    throw new Error(
      "Anthropic API key not configured. Please set aiCommitter.anthropic.apiKey in settings."
    );
  }

  const anthropic = new Anthropic({ apiKey: config.anthropic.apiKey });
  const response = await anthropic.messages.create({
    model: config.anthropic.model,
    max_tokens: 100,
    messages: [{ role: "user", content: PROMPT.replace("{DIFF}", diff) }],
  });

  return response.content[0].text.trim();
}

async function generateWithGemini(diff, config) {
  if (!config.gemini.apiKey) {
    throw new Error(
      "Gemini API key not configured. Please set aiCommitter.gemini.apiKey in settings."
    );
  }

  const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
  const model = genAI.getGenerativeModel({ model: config.gemini.model });
  const result = await model.generateContent(PROMPT.replace("{DIFF}", diff));

  return result.response.text().trim();
}

async function generateWithOllama(diff, config) {
  const response = await axios.post(`${config.ollama.baseUrl}/api/generate`, {
    model: config.ollama.model,
    prompt: PROMPT.replace("{DIFF}", diff),
    stream: false,
  });

  return response.data.response.trim();
}

async function generateCommitMessage(diff) {
  const config = getConfig();

  switch (config.provider) {
    case "openai":
      return await generateWithOpenAI(diff, config);
    case "anthropic":
      return await generateWithAnthropic(diff, config);
    case "gemini":
      return await generateWithGemini(diff, config);
    case "ollama":
      return await generateWithOllama(diff, config);
    default:
      throw new Error(`Unknown provider: ${config.provider}`);
  }
}

module.exports = {
  generateCommitMessage,
};
