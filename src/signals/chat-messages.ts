import { type Signal, effect, signal } from "@preact/signals";
import { array, object, string, z } from "zod";
import { createChatMessage } from "../utils/create-chat-message.js";
import { Storage } from "../utils/storage.js";

export type ChatMessage = AssistantChatMessage | UserChatMessage;

export interface AssistantChatMessage {
  readonly $content: Signal<string>;
  readonly $finished: Signal<boolean>;
  readonly $reasoning: Signal<string | undefined>;
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

  schema: array(
    object({
      content: string(),
      reasoning: string().optional(),
      role: z.enum(["assistant", "user"]),
    }),
  ),
});

export const $chatMessages = signal<readonly ChatMessage[]>(
  storage.item?.map((item) => createChatMessage({ ...item, finished: true })) ?? [],
);

effect(() => {
  storage.item = $chatMessages.value.map((chatMessage) => {
    const { $content, role } = chatMessage;

    return role === "assistant"
      ? { content: $content.value, reasoning: chatMessage.$reasoning.value, role }
      : { content: $content.value, role };
  });
});
