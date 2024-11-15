import { useSignalEffect } from "@preact/signals";
import { useContext } from "preact/hooks";
import { Chat } from "../contexts/chat.js";
import { createMessage } from "../utils/create-message.js";

export function useUserReply(): void {
  const chat = useContext(Chat.Context);

  useSignalEffect(() => {
    const messages = chat.$messages.value;
    const lastMessage = messages[messages.length - 1];

    if (!lastMessage) {
      chat.$messages.value = [createMessage("user", "")];
    } else if (lastMessage.role === "assistant" && lastMessage.$finished.value) {
      if (lastMessage.$content.peek()) {
        chat.$messages.value = [...messages, createMessage("user", "")];
      } else {
        chat.$messages.value = messages.slice(0, -1);
      }
    }
  });
}
