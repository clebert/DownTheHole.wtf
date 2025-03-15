import type { ProviderName } from "#constants/provider-names.js";

export const defaultChatModelIds: Record<ProviderName, string> = {
  anthropic: "claude-3-7-sonnet-latest",
  mistral: "pixtral-large-latest",
  ollama: "qwen2.5-coder:32b",
  openai: "gpt-4o",
};

export const defaultProviderName: ProviderName = "anthropic";
