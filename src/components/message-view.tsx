import { useComputed, useSignal } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Button } from "#components/button.js";
import { CancelButton } from "#components/cancel-button.js";
import { Container } from "#components/container.js";
import { CopyButton } from "#components/copy-button.js";
import { DeleteButton } from "#components/delete-button.js";
import { ResendButton } from "#components/resend-button.js";
import { ScrollTextView } from "#components/scroll-text-view.js";
import { SendButton } from "#components/send-button.js";
import { SvgIcon } from "#components/svg-icon.js";
import { TextEditor } from "#components/text-editor.js";
import { AppState, type ChatMessage } from "#contexts/app-state.js";
import { TextView } from "./text-view.js";

export interface MessageViewProps {
  readonly chatMessage: ChatMessage;
}

export const MessageView: FunctionComponent<MessageViewProps> = ({ chatMessage }) => {
  const { $chatMessages } = useContext(AppState);

  const $isLastChatMessage = useComputed(() => {
    const chatMessages = $chatMessages.value;

    return chatMessages.at(-1) === chatMessage;
  });

  const $reasoningVisible = useSignal(false);

  const buttons =
    chatMessage.role === "assistant" ? (
      chatMessage.$finished.value ? (
        <>
          <ResendButton chatMessage={chatMessage} />
          <CopyButton chatMessage={chatMessage} reasoningVisible={$reasoningVisible.value} />

          {chatMessage.$reasoning.value && (
            <Button
              dashed={!$reasoningVisible.value}
              onClick={() => {
                $reasoningVisible.value = !$reasoningVisible.peek();
              }}
              title={$reasoningVisible.value ? "Reasoning Visible" : "Reasoning Hidden"}
            >
              <SvgIcon data={$reasoningVisible.value ? SvgIcon.eyeData : SvgIcon.eyeSlashData} />
            </Button>
          )}
        </>
      ) : (
        <>
          <CancelButton chatMessage={chatMessage} />
          <CopyButton chatMessage={chatMessage} reasoningVisible={$reasoningVisible.value} />
        </>
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
          $reasoningVisible.value ? (
            <TextView content={chatMessage.$reasoning.value} title="Assistant Message" />
          ) : (
            <ScrollTextView $contentChunks={chatMessage.$contentChunks} title="Assistant Message" />
          )
        ) : (
          <TextEditor $content={chatMessage.$content} title="User Message" />
        )}
      </Container>

      <Container col={true}>{buttons}</Container>
    </Container>
  );
};
