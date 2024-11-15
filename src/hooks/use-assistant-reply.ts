import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { batch, useComputed, useSignalEffect } from "@preact/signals";
import { streamText } from "ai";
import { useContext } from "preact/hooks";
import { Ai } from "../contexts/ai.js";
import { Chat } from "../contexts/chat.js";

export function useAssistantReply(): void {
  const ai = useContext(Ai.Context);

  const $chatModel = useComputed(() => {
    switch (ai.$providerName.value) {
      case "anthropic":
        return createAnthropic({
          apiKey: ai.$apiKey.value,
          headers: { "anthropic-dangerous-direct-browser-access": "true" },
        })(ai.$chatModelId.value);
      case "ollama":
        return createOpenAI({ apiKey: "ollama", baseURL: "http://localhost:11434/v1" })(
          ai.$chatModelId.value,
        );
      case "openai":
        return createOpenAI({ apiKey: ai.$apiKey.value, compatibility: "strict" })(
          ai.$chatModelId.value,
        );
    }
  });

  const chat = useContext(Chat.Context);

  useSignalEffect(() => {
    const messages = chat.$messages.value;
    const lastMessage = messages[messages.length - 1];

    if (lastMessage?.role !== "assistant" || lastMessage.$finished.value) {
      return;
    }

    lastMessage.$content.value = "";

    const otherMessages = messages.slice(0, -1);
    const abortController = new AbortController();

    streamText({
      model: $chatModel.value,
      messages: otherMessages.map(({ role, $content }) => ({ role, content: $content.peek() })),
      abortSignal: abortController.signal,
    })
      .then(async ({ textStream }) => {
        for await (const textPart of textStream) {
          if (!abortController.signal.aborted) {
            lastMessage.$content.value += textPart;
          }
        }

        lastMessage.$finished.value = true;
      })
      .catch((error: unknown) => {
        if (!abortController.signal.aborted) {
          batch(() => {
            lastMessage.$content.value =
              error instanceof Error ? error.message : "Oops, something went wrong.";

            lastMessage.$finished.value = true;
          });
        }
      });

    return () => abortController.abort();
  });
}
