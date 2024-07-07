import { useComputed } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Chat, type Message } from "../contexts/chat.js";
import { useStableSignals } from "../hooks/use-stable-signals.js";
import { CancelButton } from "./cancel-button.js";
import { Container } from "./core/container.js";
import { DeleteButton } from "./delete-button.js";
import { ResendButton } from "./resend-button.js";
import { SendButton } from "./send-button.js";
import { TextEditor } from "./text-editor.js";
import { TextView } from "./text-view.js";

export interface MessageViewProps {
  readonly message: Message;
}

export const MessageView: FunctionComponent<MessageViewProps> = ({ message }) => {
  const $chat = useContext(Chat);

  useStableSignals($chat);

  const $isLastMessage = useComputed(() => $chat.value[$chat.value.length - 1] === message);

  const buttons =
    message.role === "assistant" ? (
      message.$finished.value ? (
        <ResendButton message={message} />
      ) : (
        <CancelButton message={message} />
      )
    ) : $isLastMessage.value ? (
      <>
        <SendButton message={message} />
        <DeleteButton message={message} />
      </>
    ) : (
      <DeleteButton message={message} />
    );

  return (
    <Container>
      <Container col={true} grow={true}>
        {message.role === "assistant" ? (
          <TextView $content={message.$content} title="Assistant Message" />
        ) : (
          <TextEditor $content={message.$content} title="User Message" />
        )}
      </Container>

      <Container col={true}>{buttons}</Container>
    </Container>
  );
};
