import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { batch, useComputed, useSignalEffect } from "@preact/signals";
import { type CoreMessage, streamText } from "ai";
import { useContext } from "preact/hooks";
import { Ai } from "../contexts/ai.js";
import { Chat, type Message } from "../contexts/chat.js";
import { encodePngImage } from "../utils/encode-png-image.js";

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

    const abortController = new AbortController();

    Promise.all(messages.slice(0, -1).map(createCoreMessage))
      .then((coreMessages) =>
        streamText({
          model: $chatModel.value,
          messages: coreMessages,
          abortSignal: abortController.signal,
        }),
      )
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

async function createCoreMessage(message: Message): Promise<CoreMessage> {
  const content = message.$content.peek();

  if (message.role !== "user") {
    return { role: message.role, content };
  }

  const imageFileList = message.$imageFileList.peek();

  if (!imageFileList) {
    return { role: "user", content };
  }

  const images: ArrayBuffer[] = [];

  for (const imageFile of imageFileList) {
    images.push(await encodePngImage(imageFile, 1092));
  }

  return {
    role: "user",
    content: [
      { type: "text", text: content },
      ...images.map((image) => ({ type: "image", image }) as const),
    ],
  };
}
