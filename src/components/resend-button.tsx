import type { FunctionComponent } from "preact";
import { $chatMessages, type AssistantChatMessage } from "../signals/chat-messages.js";
import { createChatMessage } from "../utils/create-chat-message.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export interface ResendButtonProps {
  readonly chatMessage: AssistantChatMessage;
}

export const ResendButton: FunctionComponent<ResendButtonProps> = ({ chatMessage }) => {
  return (
    <Button
      onClick={() => {
        const chatMessages = $chatMessages.value;

        const index = chatMessages.findIndex(
          (otherChatMessage) => otherChatMessage.id === chatMessage.id,
        );

        if (index > -1) {
          $chatMessages.value = [
            ...chatMessages.slice(0, index),
            createChatMessage({ role: "assistant" }),
          ];
        }
      }}
      title="Resend Message"
    >
      <SvgIcon data={SvgIcon.arrowPathData} />
    </Button>
  );
};
