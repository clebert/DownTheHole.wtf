import type { FunctionComponent } from "preact";
import { $chatMessages, type ChatMessage } from "../signals/chat-messages.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export interface DeleteButtonProps {
  readonly chatMessage: ChatMessage;
}

export const DeleteButton: FunctionComponent<DeleteButtonProps> = ({ chatMessage }) => {
  return (
    <Button
      disabled={chatMessage.$content.value.length === 0}
      onClick={() => {
        const chatMessages = $chatMessages.value;

        const index = chatMessages.findIndex(
          (otherChatMessage) => otherChatMessage.id === chatMessage.id,
        );

        if (index > -1) {
          $chatMessages.value = chatMessages.slice(0, index);
        }
      }}
      title="Delete Message"
    >
      <SvgIcon data={SvgIcon.trashData} />
    </Button>
  );
};
