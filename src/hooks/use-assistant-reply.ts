import { batch, useSignalEffect } from "@preact/signals";
import { AISDKError, type CoreMessage, type UserContent, streamText } from "ai";
import { useContext } from "preact/hooks";
import { AppState } from "#contexts/app-state.js";
import { useChatModel } from "#hooks/use-chat-model.js";

export function useAssistantReply(): void {
  const { $chatMessages, $images, $thinkingEnabled } = useContext(AppState);
  const $chatModel = useChatModel();

  useSignalEffect(() => {
    const chatMessages = $chatMessages.value;
    const lastChatMessage = chatMessages[chatMessages.length - 1];

    if (lastChatMessage?.role !== "assistant" || lastChatMessage.$finished.value) {
      return;
    }

    lastChatMessage.$contentChunks.value = [];

    const messages = chatMessages.slice(0, -1).map(({ role, $content }, index): CoreMessage => {
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
          lastChatMessage.$contentChunks.value = [
            ...lastChatMessage.$contentChunks.value,
            `\n\nError: ${errorMessage}`,
          ];
        } else {
          lastChatMessage.$contentChunks.value = [`Error: ${errorMessage}`];
        }
      });
    };

    const { signal: abortSignal } = abortController;

    const { textStream, reasoning: reasoningPromise } = streamText({
      model: $chatModel.value,
      messages,
      abortSignal,
      onError: (event) => handleError(event.error),

      providerOptions: {
        // https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/extended-thinking-tips#technical-considerations-for-extended-thinking
        anthropic: $thinkingEnabled.peek()
          ? { thinking: { type: "enabled", budgetTokens: 1024 } }
          : {},
      },
    });

    Promise.resolve()
      .then(async () => {
        for await (const textPart of textStream) {
          if (abortController.signal.aborted) {
            break;
          }

          lastChatMessage.$contentChunks.value = [
            ...lastChatMessage.$contentChunks.value,
            textPart,
          ];
        }

        const reasoning = await reasoningPromise;

        if (!abortController.signal.aborted) {
          batch(() => {
            if (reasoning) {
              lastChatMessage.$reasoning.value = `Thoughts: ${reasoning}`;
            }

            lastChatMessage.$finished.value = true;
          });
        }
      })
      .catch(handleError);

    return () => abortController.abort();
  });
}
