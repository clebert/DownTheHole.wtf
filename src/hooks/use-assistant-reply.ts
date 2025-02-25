import { batch, useSignalEffect } from "@preact/signals";
import { AISDKError, type CoreMessage, type UserContent, streamText } from "ai";
import { useContext } from "preact/hooks";
import { Chat } from "../contexts/chat.js";
import { Settings } from "../contexts/settings.js";
import { useChatModel } from "./use-chat-model.js";

export function useAssistantReply(): void {
  const $chatModel = useChatModel();
  const chat = useContext(Chat.Context);
  const settings = useContext(Settings.Context);

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

    const handleError = (error: unknown): void => {
      if (abortController.signal.aborted) {
        return;
      }

      batch(() => {
        lastMessage.$finished.value = true;

        const message = AISDKError.isInstance(error)
          ? error.message
          : "Oops, something went wrong.";

        if (lastMessage.$content.peek()) {
          lastMessage.$content.value += `\n\nError: ${message}`;
        } else {
          lastMessage.$content.value = `Error: ${message}`;
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
        anthropic: settings.$thinkingEnabled.peek()
          ? { thinking: { type: "enabled", budgetTokens: 12000 } }
          : {},
      },
    });

    Promise.resolve()
      .then(async () => {
        for await (const textPart of textStream) {
          if (abortController.signal.aborted) {
            break;
          }

          lastMessage.$content.value += textPart;
        }

        const reasoning = await reasoningPromise;

        if (reasoning) {
          console.info("Reasoning:", reasoning);
        }

        if (!abortController.signal.aborted) {
          lastMessage.$finished.value = true;
        }
      })
      .catch(handleError);

    return () => abortController.abort();
  });
}
