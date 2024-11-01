import type { FunctionComponent } from "preact";
import { useCallback, useContext } from "preact/hooks";
import { Chat, type Message } from "../contexts/chat.js";
import { Button } from "./button.js";
import { TrashIcon } from "./svg-icon.js";

export interface DeleteButtonProps {
  readonly message: Message;
}

export const DeleteButton: FunctionComponent<DeleteButtonProps> = ({ message }) => {
  const $chat = useContext(Chat);

  const deleteMessage = useCallback(() => {
    const index = $chat.value.findIndex((otherMessage) => otherMessage.id === message.id);

    if (index > -1) {
      $chat.value = $chat.value.slice(0, index);
    }
  }, [$chat, message]);

  return (
    <Button disabled={message.$content.value.length === 0} title="Delete" onClick={deleteMessage}>
      <TrashIcon />
    </Button>
  );
};
