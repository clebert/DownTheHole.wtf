import { createAnthropic } from "@ai-sdk/anthropic";
import { createMistral } from "@ai-sdk/mistral";
import { createOpenAI } from "@ai-sdk/openai";
import { type ReadonlySignal, useComputed } from "@preact/signals";
import type { LanguageModelV1 } from "ai";
import { apiKeySelector } from "../signals/api-key-selector.js";
import { chatModelIdSelector } from "../signals/chat-model-id-selector.js";
import { $providerName } from "../signals/provider-name.js";

export function useChatModel(): ReadonlySignal<LanguageModelV1> {
  return useComputed(() => {
    const apiKey = apiKeySelector.$output.value;
    const chatModelId = chatModelIdSelector.$output.value;

    switch ($providerName.value) {
      case "anthropic":
        return createAnthropic({
          apiKey,
          headers: { "anthropic-dangerous-direct-browser-access": "true" },
        })(chatModelId);
      case "mistral":
        return createMistral({ apiKey })(chatModelId);
      case "ollama":
        return createOpenAI({ apiKey: "", baseURL: "http://localhost:11434/v1" })(chatModelId);
      case "openai":
        return createOpenAI({ apiKey, compatibility: "strict" })(chatModelId);
    }
  });
}
