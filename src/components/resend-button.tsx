import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { type AssistantMessage, Chat } from "../contexts/chat.js";
import { createMessage } from "../utils/create-message.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export interface ResendButtonProps {
  readonly message: AssistantMessage;
}

export const ResendButton: FunctionComponent<ResendButtonProps> = ({ message }) => {
  const chat = useContext(Chat.Context);

  return (
    <Button
      onClick={() => {
        const messages = chat.$messages.value;
        const index = messages.findIndex((otherMessage) => otherMessage.id === message.id);

        if (index > -1) {
          chat.$messages.value = [...messages.slice(0, index), createMessage("assistant", "")];
        }
      }}
      title="Resend Message"
    >
      <SvgIcon data={SvgIcon.arrowPathData} />
    </Button>
  );
};
