import { type Signal, effect, signal, untracked } from "@preact/signals";
import { array, object, string, z } from "zod";
import { createChatMessage } from "../utils/create-message.js";
import { Storage } from "../utils/storage.js";

export type ChatMessage = AssistantChatMessage | UserChatMessage;

export interface AssistantChatMessage {
  readonly $content: Signal<string>;
  readonly $finished: Signal<boolean>;
  readonly id: string;
  readonly role: "assistant";
}

export interface UserChatMessage {
  readonly $content: Signal<string>;
  readonly id: string;
  readonly role: "user";
}

const storage = new Storage({
  backend: sessionStorage,
  key: "chat-messages",
  schema: array(object({ content: string(), role: z.enum(["assistant", "user"]) })),
});

export const $chatMessages = signal<readonly ChatMessage[]>(
  storage.getItem()?.map(({ content, role }) => {
    const chatMessage = createChatMessage(content, role);

    if (chatMessage.role === "assistant") {
      untracked(() => {
        chatMessage.$finished.value = true;
      });
    }

    return chatMessage;
  }) ?? [],
);

effect(() =>
  storage.setItem(
    $chatMessages.value.map(({ $content, role }) => ({ content: $content.value, role })),
  ),
);
