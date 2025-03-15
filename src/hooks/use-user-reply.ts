import { useSignalEffect } from "@preact/signals";
import { useContext } from "preact/hooks";
import { AppState } from "#contexts/app-state.js";
import { createChatMessage } from "#utils/create-chat-message.js";

export function useUserReply(): void {
  const { $chatMessages } = useContext(AppState);

  useSignalEffect(() => {
    const chatMessages = $chatMessages.value;
    const lastChatMessage = chatMessages[chatMessages.length - 1];

    if (!lastChatMessage) {
      $chatMessages.value = [createChatMessage({ role: "user" })];
    } else if (lastChatMessage.role === "assistant" && lastChatMessage.$finished.value) {
      if (lastChatMessage.$content.peek()) {
        $chatMessages.value = [...chatMessages, createChatMessage({ role: "user" })];
      } else {
        $chatMessages.value = chatMessages.slice(0, -1);
      }
    }
  });
}
