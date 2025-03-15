import { signal } from "@preact/signals";
import type { ChatMessage } from "#contexts/app-state.js";

export interface Params {
  readonly content?: string | undefined;
  readonly finished?: boolean | undefined;
  readonly reasoning?: string | undefined;
  readonly role: "assistant" | "user";
}

export function createChatMessage({
  content = "",
  finished = false,
  reasoning,
  role,
}: Params): ChatMessage {
  const id = crypto.randomUUID ? crypto.randomUUID() : String(Math.random());
  const $content = signal(content);

  return role === "assistant"
    ? { $content, $finished: signal(finished), $reasoning: signal(reasoning), id, role }
    : { $content, id, role };
}
