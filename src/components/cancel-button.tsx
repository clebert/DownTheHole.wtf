import type { FunctionComponent } from "preact";
import type { AssistantMessage } from "../contexts/chat.js";
import { Button } from "./button.js";
import { XMarkIcon } from "./svg-icon.js";

export interface CancelButtonProps {
  readonly message: AssistantMessage;
}

export const CancelButton: FunctionComponent<CancelButtonProps> = ({ message }) => {
  return (
    <Button
      onClick={() => {
        message.$finished.value = true;
      }}
      title="Cancel"
    >
      <XMarkIcon class="animate-pulse" />
    </Button>
  );
};
