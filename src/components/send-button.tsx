import type { FunctionComponent } from "preact";
import { $chatMessages, type UserChatMessage } from "../signals/chat-messages.js";
import { createChatMessage } from "../utils/create-chat-message.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export interface SendButtonProps {
  readonly chatMessage: UserChatMessage;
}

export const SendButton: FunctionComponent<SendButtonProps> = ({ chatMessage }) => {
  return (
    <Button
      default={true}
      disabled={chatMessage.$content.value.length === 0}
      onClick={() => {
        $chatMessages.value = [...$chatMessages.value, createChatMessage({ role: "assistant" })];
      }}
      title="Send Message"
    >
      <SvgIcon data={SvgIcon.paperAirplaneData} />
    </Button>
  );
};
