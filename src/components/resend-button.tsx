import { batch } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useCallback, useContext } from "preact/hooks";
import { type AssistantMessage, Chat } from "../contexts/chat.js";
import { Button } from "./core/button.js";
import { ArrowPathIcon } from "./core/svg-icon.js";

export interface ResendButtonProps {
  readonly message: AssistantMessage;
}

export const ResendButton: FunctionComponent<ResendButtonProps> = ({ message }) => {
  const $chat = useContext(Chat);

  const resendMessage = useCallback(() => {
    const index = $chat.value.findIndex((otherMessage) => otherMessage.id === message.id);

    if (index > -1) {
      batch(() => {
        $chat.value = $chat.value.slice(0, index + 1);
        message.$finished.value = false;
      });
    }
  }, [$chat, message]);

  return (
    <Button title="Resend" onClick={resendMessage}>
      <ArrowPathIcon />
    </Button>
  );
};
