import { batch, useSignalEffect } from "@preact/signals";
import { AISDKError, type CoreMessage, type UserContent, streamText } from "ai";
import { $chatMessages } from "../signals/chat-messages.js";
import { $images } from "../signals/images.js";
import { $thinkingEnabled } from "../signals/thinking-enabled.js";
import { useChatModel } from "./use-chat-model.js";

export function useAssistantReply(): void {
  const $chatModel = useChatModel();

  useSignalEffect(() => {
    const lastChatMessage = $chatMessages.value[$chatMessages.value.length - 1];

    if (lastChatMessage?.role !== "assistant" || lastChatMessage.$finished.value) {
      return;
    }

    lastChatMessage.$content.value = "";

    const messages = $chatMessages.value
      .slice(0, -1)
      .map(({ role, $content }, index): CoreMessage => {
        if (role === "assistant") {
          return { role, content: $content.peek() };
        }

        const content: UserContent = [{ type: "text", text: $content.peek() }];

        if (index === 0) {
          for (const image of $images.peek()) {
            content.push({ type: "image", image });
          }
        }

        return { role, content };
      });

    const abortController = new AbortController();

    const handleError = (error: unknown): void => {
      if (abortController.signal.aborted) {
        return;
      }

      batch(() => {
        lastChatMessage.$finished.value = true;

        const errorMessage = AISDKError.isInstance(error)
          ? error.message
          : "Oops, something went wrong.";

        if (lastChatMessage.$content.peek()) {
          lastChatMessage.$content.value += `\n\nError: ${errorMessage}`;
        } else {
          lastChatMessage.$content.value = `Error: ${errorMessage}`;
        }
      });
    };

    const thinkingEnabled = $thinkingEnabled.peek();
    const { signal: abortSignal } = abortController;

    const { textStream, reasoning: reasoningPromise } = streamText({
      model: $chatModel.value,
      messages,
      abortSignal,
      onError: (event) => handleError(event.error),

      providerOptions: {
        anthropic: thinkingEnabled ? { thinking: { type: "enabled", budgetTokens: 12000 } } : {},
      },
    });

    Promise.resolve()
      .then(async () => {
        if (thinkingEnabled) {
          lastChatMessage.$content.value = "Thinking...";
        }

        let textPartReceived = false;

        for await (const textPart of textStream) {
          if (abortController.signal.aborted) {
            break;
          }

          if (textPartReceived) {
            lastChatMessage.$content.value += textPart;
          } else {
            textPartReceived = true;

            lastChatMessage.$content.value = textPart;
          }
        }

        const reasoning = await reasoningPromise;

        if (reasoning) {
          console.info("Reasoning:", reasoning);
        }

        if (!abortController.signal.aborted) {
          lastChatMessage.$finished.value = true;
        }
      })
      .catch(handleError);

    return () => abortController.abort();
  });
}
