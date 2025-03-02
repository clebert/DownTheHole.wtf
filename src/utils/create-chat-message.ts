import { signal } from "@preact/signals";
import type { ChatMessage } from "../signals/chat-messages.js";

export interface Init {
  readonly content?: string | undefined;
  readonly role: "assistant" | "user";
  readonly finished?: boolean | undefined;
}

export function createChatMessage({ content = "", role, finished = false }: Init): ChatMessage {
  const id = crypto.randomUUID ? crypto.randomUUID() : String(Math.random());
  const $content = signal(content);

  return role === "assistant"
    ? { $content, $finished: signal(finished), id, role }
    : { $content, id, role };
}
