import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Button } from "#components/button.js";
import { SvgIcon } from "#components/svg-icon.js";
import { AppState, type AssistantChatMessage } from "#contexts/app-state.js";
import { createChatMessage } from "#utils/create-chat-message.js";

export interface ResendButtonProps {
  readonly chatMessage: AssistantChatMessage;
}

export const ResendButton: FunctionComponent<ResendButtonProps> = ({ chatMessage }) => {
  const { $chatMessages } = useContext(AppState);

  return (
    <Button
      onClick={() => {
        const chatMessages = $chatMessages.peek();
        const index = chatMessages.findIndex(({ id }) => id === chatMessage.id);

        if (index > -1) {
          $chatMessages.value = [
            ...chatMessages.slice(0, index),
            createChatMessage({ role: "assistant" }),
          ];
        }
      }}
      title="Resend Message"
    >
      <SvgIcon data={SvgIcon.arrowPathData} />
    </Button>
  );
};
