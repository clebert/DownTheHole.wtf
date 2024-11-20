import { createAnthropic } from "@ai-sdk/anthropic";
import { createMistral } from "@ai-sdk/mistral";
import { createOpenAI } from "@ai-sdk/openai";
import { useComputed, useSignalEffect } from "@preact/signals";
import { type CoreMessage, type UserContent, streamText } from "ai";
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
      case "mistral":
        return createMistral({ apiKey: ai.$apiKey.value })(ai.$chatModelId.value);
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
    const lastMessage = chat.$messages.value[chat.$messages.value.length - 1];

    if (lastMessage?.role !== "assistant" || lastMessage.$finished.value) {
      return;
    }

    lastMessage.$content.value = "";

    const messages = chat.$messages.value
      .slice(0, -1)
      .map(({ role, $content }, index): CoreMessage => {
        if (role === "assistant") {
          return { role, content: $content.peek() };
        }

        const content: UserContent = [{ type: "text", text: $content.peek() }];

        if (index === 0) {
          for (const image of chat.$images.peek()) {
            content.push({ type: "image", image });
          }
        }

        return { role, content };
      });

    const abortController = new AbortController();

    const { textStream } = streamText({
      model: $chatModel.value,
      messages,
      abortSignal: abortController.signal,
    });

    Promise.resolve()
      .then(async () => {
        for await (const textPart of textStream) {
          if (abortController.signal.aborted) {
            break;
          }

          lastMessage.$content.value += textPart;
        }
      })
      .catch((error: unknown) => {
        if (!abortController.signal.aborted) {
          lastMessage.$content.value =
            error instanceof Error && error.message ? error.message : "Oops, something went wrong.";
        }
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          lastMessage.$finished.value = true;
        }
      });

    return () => abortController.abort();
  });
}
