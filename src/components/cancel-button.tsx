import type { FunctionComponent } from "preact";
import { Button } from "#components/button.js";
import { SvgIcon } from "#components/svg-icon.js";
import type { AssistantChatMessage } from "#signals/chat-messages.js";

export interface CancelButtonProps {
  readonly chatMessage: AssistantChatMessage;
}

export const CancelButton: FunctionComponent<CancelButtonProps> = ({ chatMessage }) => {
  return (
    <Button
      onClick={() => {
        chatMessage.$finished.value = true;
      }}
      title="Cancel Completion"
    >
      <SvgIcon animation="animate-pulse" data={SvgIcon.xMarkData} />
    </Button>
  );
};
