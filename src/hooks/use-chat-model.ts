import { createAnthropic } from "@ai-sdk/anthropic";
import { createMistral } from "@ai-sdk/mistral";
import { createOpenAI } from "@ai-sdk/openai";
import { type ReadonlySignal, useComputed } from "@preact/signals";
import type { LanguageModelV1 } from "ai";
import { useContext } from "preact/hooks";
import { AppState } from "#contexts/app-state.js";

const anthropicHeaders = { "anthropic-dangerous-direct-browser-access": "true" };

export function useChatModel(): ReadonlySignal<LanguageModelV1> {
  const { $apiKey, $chatModelId, $providerName } = useContext(AppState);

  return useComputed(() => {
    const apiKey = $apiKey.value;
    const chatModelId = $chatModelId.value;

    switch ($providerName.value) {
      case "anthropic":
        return createAnthropic({ apiKey, headers: anthropicHeaders })(chatModelId);
      case "mistral":
        return createMistral({ apiKey })(chatModelId);
      case "ollama":
        return createOpenAI({ apiKey, baseURL: "http://localhost:11434/v1" })(chatModelId);
      case "openai":
        return createOpenAI({ apiKey, compatibility: "strict" })(chatModelId);
    }
  });
}
