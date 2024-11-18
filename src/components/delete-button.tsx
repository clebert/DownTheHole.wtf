import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Chat, type Message } from "../contexts/chat.js";
import { Button } from "./button.js";
import { TrashIcon } from "./icons.js";

export interface DeleteButtonProps {
  readonly message: Message;
}

export const DeleteButton: FunctionComponent<DeleteButtonProps> = ({ message }) => {
  const chat = useContext(Chat.Context);

  return (
    <Button
      disabled={message.$content.value.length === 0}
      onClick={() => {
        const messages = chat.$messages.value;
        const index = messages.findIndex((otherMessage) => otherMessage.id === message.id);

        if (index > -1) {
          chat.$messages.value = messages.slice(0, index);
        }
      }}
      title="Delete"
    >
      <TrashIcon />
    </Button>
  );
};
