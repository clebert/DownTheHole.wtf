import type { FunctionComponent } from "preact";
import { Button } from "#components/button.js";
import { SvgIcon } from "#components/svg-icon.js";
import { $chatMessages, type ChatMessage } from "#signals/chat-messages.js";

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
