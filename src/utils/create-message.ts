import { signal } from "@preact/signals";
import type { Message } from "../contexts/chat.js";

export function createMessage(role: "assistant" | "user", content: string): Message {
  const id = crypto.randomUUID ? crypto.randomUUID() : String(Math.random());
  const $content = signal(content);

  return role === "assistant"
    ? { $content, $finished: signal(false), id, role }
    : { $content, id, role };
}
