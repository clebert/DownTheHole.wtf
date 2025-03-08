import type { FunctionComponent } from "preact";
import { Button } from "#components/button.js";
import { SvgIcon } from "#components/svg-icon.js";
import { $chatMessages, type AssistantChatMessage } from "#signals/chat-messages.js";
import { createChatMessage } from "#utils/create-chat-message.js";

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
