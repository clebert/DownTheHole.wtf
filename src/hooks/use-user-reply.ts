import { type Signal, useSignalEffect } from "@preact/signals";
import type { Message } from "../contexts/chat.js";
import { createMessage } from "../utils/create-message.js";

export interface UseUserReplyProps {
  readonly $chat: Signal<readonly Message[]>;
}

export function useUserReply({ $chat }: UseUserReplyProps): void {
  useSignalEffect(() => {
    const lastMessage = $chat.value[$chat.value.length - 1];

    if (!lastMessage) {
      $chat.value = [createMessage("user", "")];
    } else if (lastMessage.role === "assistant" && lastMessage.$finished.value) {
      if (lastMessage.$content.peek()) {
        $chat.value = [...$chat.value, createMessage("user", "")];
      } else {
        $chat.value = $chat.value.slice(0, -1);
      }
    }
  });
}
