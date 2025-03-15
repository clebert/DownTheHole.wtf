export type ProviderName = (typeof providerNames)[number];

export const providerNames = ["anthropic", "mistral", "ollama", "openai"] as const;
