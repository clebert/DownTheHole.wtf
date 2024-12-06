import { useSignalEffect } from "@preact/signals";
import { type CoreMessage, type UserContent, streamText } from "ai";
import { useContext } from "preact/hooks";
import { Chat } from "../contexts/chat.js";
import { useChatModel } from "./use-chat-model.js";

export function useAssistantReply(): void {
  const $chatModel = useChatModel();
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
    const { signal: abortSignal } = abortController;
    const { textStream } = streamText({ model: $chatModel.value, messages, abortSignal });

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
