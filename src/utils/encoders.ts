import type { ChatMessage } from "#contexts/app-state.js";
import type { Encoder } from "#hooks/use-storage.js";

export const encodeJson: Encoder = JSON.stringify;

export function encodeChatMessages(value: unknown): string {
  return JSON.stringify(
    (value as readonly ChatMessage[]).map((message) => {
      const { $content, role } = message;

      return role === "assistant"
        ? { content: $content.value, reasoning: message.$reasoning.value, role }
        : { content: $content.value, role };
    }),
  );
}
