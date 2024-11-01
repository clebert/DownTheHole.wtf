import { type ReadonlySignal, batch, useSignalEffect } from "@preact/signals";
import { type LanguageModel, streamText } from "ai";
import type { Message } from "../contexts/chat.js";

export interface UseAssistantReplyProps {
  readonly $chat: ReadonlySignal<readonly Message[]>;
  readonly $model: ReadonlySignal<LanguageModel>;
}

export function useAssistantReply({ $chat, $model }: UseAssistantReplyProps): void {
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
