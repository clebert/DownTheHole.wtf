import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Button } from "#components/button.js";
import { SvgIcon } from "#components/svg-icon.js";
import { AppState, type ChatMessage } from "#contexts/app-state.js";

export interface DeleteButtonProps {
  readonly chatMessage: ChatMessage;
}

export const DeleteButton: FunctionComponent<DeleteButtonProps> = ({ chatMessage }) => {
  const { $chatMessages } = useContext(AppState);

  return (
    <Button
      disabled={chatMessage.$content.value.length === 0}
      onClick={() => {
        const chatMessages = $chatMessages.peek();
        const index = chatMessages.findIndex(({ id }) => id === chatMessage.id);

        if (index > -1) {
          $chatMessages.value = chatMessages.slice(0, index);
        }
      }}
      title="Delete Message"
    >
      <SvgIcon data={SvgIcon.trashData} />
    </Button>
  );
};
