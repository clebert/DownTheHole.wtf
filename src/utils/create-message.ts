import { signal } from "@preact/signals";
import type { ChatMessage } from "../signals/chat-messages.js";

export function createChatMessage(content: string, role: "assistant" | "user"): ChatMessage {
  const id = crypto.randomUUID ? crypto.randomUUID() : String(Math.random());
  const $content = signal(content);

  return role === "assistant"
    ? { $content, $finished: signal(false), id, role }
    : { $content, id, role };
}
