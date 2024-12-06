import { createAnthropic } from "@ai-sdk/anthropic";
import { createMistral } from "@ai-sdk/mistral";
import { createOpenAI } from "@ai-sdk/openai";
import { type ReadonlySignal, useComputed } from "@preact/signals";
import type { LanguageModelV1 } from "ai";
import { useContext } from "preact/hooks";
import { Ai } from "../contexts/ai.js";

export function useChatModel(): ReadonlySignal<LanguageModelV1> {
  const ai = useContext(Ai.Context);

  return useComputed(() => {
    const chatModelId = ai.$chatModelId.value;

    switch (ai.$providerName.value) {
      case "anthropic": {
        const headers = { "anthropic-dangerous-direct-browser-access": "true" };

        return createAnthropic({ apiKey: ai.$apiKey.value, headers })(chatModelId);
      }
      case "mistral":
        return createMistral({ apiKey: ai.$apiKey.value })(chatModelId);
      case "ollama":
        return createOpenAI({ apiKey: "", baseURL: "http://localhost:11434/v1" })(chatModelId);
      case "openai":
        return createOpenAI({ apiKey: ai.$apiKey.value, compatibility: "strict" })(chatModelId);
    }
  });
}
