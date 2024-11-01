import type { FunctionComponent } from "preact";
import { useCallback } from "preact/hooks";
import type { AssistantMessage } from "../contexts/chat.js";
import { Button } from "./button.js";
import { XMarkIcon } from "./svg-icon.js";

export interface CancelButtonProps {
  readonly message: AssistantMessage;
}

export const CancelButton: FunctionComponent<CancelButtonProps> = ({ message }) => {
  const cancelMessage = useCallback(() => {
    message.$finished.value = true;
  }, [message]);

  return (
    <Button title="Cancel" onClick={cancelMessage}>
      <XMarkIcon class="animate-pulse" />
    </Button>
  );
};
