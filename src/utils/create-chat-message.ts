import { computed, signal } from "@preact/signals";
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

  if (role === "user") {
    return { $content: signal(content), id, role };
  }

  const $contentChunks = signal(content ? [content] : []);

  return {
    $content: computed(() => $contentChunks.value.join("")),
    $contentChunks,
    $finished: signal(finished),
    $reasoning: signal(reasoning),
    id,
    role,
  };
}
