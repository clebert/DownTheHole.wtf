import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Button } from "#components/button.js";
import { SvgIcon } from "#components/svg-icon.js";
import { AppState, type UserChatMessage } from "#contexts/app-state.js";
import { createChatMessage } from "#utils/create-chat-message.js";

export interface SendButtonProps {
  readonly chatMessage: UserChatMessage;
}

export const SendButton: FunctionComponent<SendButtonProps> = ({ chatMessage }) => {
  const { $chatMessages } = useContext(AppState);

  return (
    <Button
      default={true}
      disabled={chatMessage.$content.value.length === 0}
      onClick={() => {
        $chatMessages.value = [...$chatMessages.peek(), createChatMessage({ role: "assistant" })];
      }}
      title="Send Message"
    >
      <SvgIcon data={SvgIcon.paperAirplaneData} />
    </Button>
  );
};
