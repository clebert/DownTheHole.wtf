import type { FunctionComponent } from "preact";
import type { AssistantChatMessage } from "../signals/chat-messages.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

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
