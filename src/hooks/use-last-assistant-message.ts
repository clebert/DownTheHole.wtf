import { type ReadonlySignal, useSignalEffect } from "@preact/signals";
import { type LanguageModel, streamText } from "ai";
import type { Message } from "../contexts/chat.js";
import { useStableSignals } from "./use-stable-signals.js";

export interface UseLastAssistantMessageProps {
  readonly $chat: ReadonlySignal<readonly Message[]>;
  readonly $model: ReadonlySignal<LanguageModel>;
}

export function useLastAssistantMessage({ $chat, $model }: UseLastAssistantMessageProps): void {
  useStableSignals($chat, $model);

  useSignalEffect(() => {
    const messages = $chat.value;
    const lastMessage = messages[messages.length - 1];

    if (lastMessage?.role !== "assistant" || lastMessage.$finished.value) {
      return;
    }

    lastMessage.$content.value = "";

    const otherMessages = messages.slice(0, -1);
    const abortController = new AbortController();

    streamText({
      model: $model.value,
      messages: otherMessages.map(({ role, $content }) => ({ role, content: $content.peek() })),
      abortSignal: abortController.signal,
    })
      .then(async ({ textStream }) => {
        for await (const textPart of textStream) {
          if (!abortController.signal.aborted) {
            lastMessage.$content.value += textPart;
          }
        }
      })
      .catch((error: unknown) => {
        if (!abortController.signal.aborted) {
          lastMessage.$content.value =
            error instanceof Error ? error.message : "Oops, something went wrong.";
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
