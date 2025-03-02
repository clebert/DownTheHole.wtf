import { useComputed, useSignal } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { $chatMessages, type ChatMessage } from "../signals/chat-messages.js";
import { Button } from "./button.js";
import { CancelButton } from "./cancel-button.js";
import { Container } from "./container.js";
import { DeleteButton } from "./delete-button.js";
import { ResendButton } from "./resend-button.js";
import { SendButton } from "./send-button.js";
import { SvgIcon } from "./svg-icon.js";
import { TextEditor } from "./text-editor.js";
import { TextView } from "./text-view.js";

export interface MessageViewProps {
  readonly chatMessage: ChatMessage;
}

export const MessageView: FunctionComponent<MessageViewProps> = ({ chatMessage }) => {
  const $isLastChatMessage = useComputed(() => {
    const chatMessages = $chatMessages.value;

    return chatMessages[chatMessages.length - 1] === chatMessage;
  });

  const $reasoningVisible = useSignal(false);

  const buttons =
    chatMessage.role === "assistant" ? (
      chatMessage.$finished.value ? (
        <>
          <ResendButton chatMessage={chatMessage} />

          {chatMessage.$reasoning.value && (
            <Button
              dashed={!$reasoningVisible.value}
              onClick={() => {
                $reasoningVisible.value = !$reasoningVisible.value;
              }}
              title={$reasoningVisible.value ? "Reasoning Visible" : "Reasoning Hidden"}
            >
              <SvgIcon data={$reasoningVisible.value ? SvgIcon.eyeData : SvgIcon.eyeSlashData} />
            </Button>
          )}
        </>
      ) : (
        <CancelButton chatMessage={chatMessage} />
      )
    ) : $isLastChatMessage.value ? (
      <SendButton chatMessage={chatMessage} />
    ) : (
      <DeleteButton chatMessage={chatMessage} />
    );

  return (
    <Container>
      <Container col={true} grow={true}>
        {chatMessage.role === "assistant" ? (
          <TextView
            $content={$reasoningVisible.value ? chatMessage.$reasoning : chatMessage.$content}
            title="Assistant Message"
          />
        ) : (
          <TextEditor $content={chatMessage.$content} title="User Message" />
        )}
      </Container>

      <Container col={true}>{buttons}</Container>
    </Container>
  );
};
