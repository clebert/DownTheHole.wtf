import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Chat, type UserMessage } from "../contexts/chat.js";
import { createMessage } from "../utils/create-message.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export interface SendButtonProps {
  readonly message: UserMessage;
}

export const SendButton: FunctionComponent<SendButtonProps> = ({ message }) => {
  const chat = useContext(Chat.Context);

  return (
    <Button
      default={true}
      disabled={message.$content.value.length === 0}
      onClick={() => {
        chat.$messages.value = [...chat.$messages.value, createMessage("assistant", "")];
      }}
      title="Send Message"
    >
      <SvgIcon data={SvgIcon.paperAirplaneData} />
    </Button>
  );
};
