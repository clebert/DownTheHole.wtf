import { useComputed } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Chat, type Message } from "../contexts/chat.js";
import { CancelButton } from "./cancel-button.js";
import { Container } from "./container.js";
import { DeleteButton } from "./delete-button.js";
import { ImageInput } from "./image-input.js";
import { ResendButton } from "./resend-button.js";
import { SendButton } from "./send-button.js";
import { TextEditor } from "./text-editor.js";
import { TextView } from "./text-view.js";

export interface MessageViewProps {
  readonly message: Message;
}

export const MessageView: FunctionComponent<MessageViewProps> = ({ message }) => {
  const chat = useContext(Chat.Context);

  const $isLastMessage = useComputed(() => {
    const messages = chat.$messages.value;

    return messages[messages.length - 1] === message;
  });

  const buttons =
    message.role === "assistant" ? (
      message.$finished.value ? (
        <ResendButton message={message} />
      ) : (
        <CancelButton message={message} />
      )
    ) : $isLastMessage.value ? (
      <SendButton message={message} />
    ) : (
      <DeleteButton message={message} />
    );

  return (
    <Container>
      <Container col={true} grow={true}>
        {message.role === "assistant" ? (
          <TextView $content={message.$content} title="Assistant Message" />
        ) : (
          <>
            <TextEditor $content={message.$content} title="User Message" />
            <ImageInput message={message} />
          </>
        )}
      </Container>

      <Container col={true}>{buttons}</Container>
    </Container>
  );
};
