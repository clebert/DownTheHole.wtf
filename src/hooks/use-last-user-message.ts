import { type Signal, useSignalEffect } from "@preact/signals";
import type { Message } from "../contexts/chat.js";
import { createMessage } from "../utils/create-message.js";
import { useStableSignals } from "./use-stable-signals.js";

export interface UseLastUserMessageProps {
  readonly $chat: Signal<readonly Message[]>;
}

export function useLastUserMessage({ $chat }: UseLastUserMessageProps): void {
  useStableSignals($chat);

  useSignalEffect(() => {
    const lastMessage = $chat.value[$chat.value.length - 1];

    if (
      !lastMessage ||
      (lastMessage.role === "assistant" && lastMessage.$finished.value === true)
    ) {
      $chat.value = [...$chat.value, createMessage("user", "")];
    }
  });
}
