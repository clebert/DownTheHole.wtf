import { createAnthropic } from "@ai-sdk/anthropic";
import { createMistral } from "@ai-sdk/mistral";
import { createOpenAI } from "@ai-sdk/openai";
import { type ReadonlySignal, useComputed } from "@preact/signals";
import type { LanguageModelV1 } from "ai";
import { useContext } from "preact/hooks";
import { Settings } from "../contexts/settings.js";

export function useChatModel(): ReadonlySignal<LanguageModelV1> {
  const settings = useContext(Settings.Context);

  return useComputed(() => {
    const chatModelId = settings.$chatModelId.value;

    switch (settings.$providerName.value) {
      case "anthropic": {
        const headers = { "anthropic-dangerous-direct-browser-access": "true" };

        return createAnthropic({ apiKey: settings.$apiKey.value, headers })(chatModelId);
      }
      case "mistral":
        return createMistral({ apiKey: settings.$apiKey.value })(chatModelId);
      case "ollama":
        return createOpenAI({ apiKey: "", baseURL: "http://localhost:11434/v1" })(chatModelId);
      case "openai":
        return createOpenAI({ apiKey: settings.$apiKey.value, compatibility: "strict" })(
          chatModelId,
        );
    }
  });
}
