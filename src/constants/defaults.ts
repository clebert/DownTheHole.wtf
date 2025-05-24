import type { ProviderName } from "#constants/provider-names.js";

export const defaultChatModelIds: Record<ProviderName, string> = {
  anthropic: "claude-4-sonnet-20250514",
  mistral: "pixtral-large-latest",
  ollama: "qwen2.5-coder:32b",
  openai: "gpt-4o",
};

export const defaultProviderName: ProviderName = "anthropic";
