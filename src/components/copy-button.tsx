import {} from "@preact/signals";
import type { FunctionComponent } from "preact";
import { Button } from "#components/button.js";
import { SvgIcon } from "#components/svg-icon.js";
import type { AssistantChatMessage } from "#contexts/app-state.js";

export interface CopyButtonProps {
  readonly chatMessage: AssistantChatMessage;
  readonly reasoningVisible: boolean;
}

export const CopyButton: FunctionComponent<CopyButtonProps> = ({
  chatMessage,
  reasoningVisible,
}) => {
  const { $content, $reasoning } = chatMessage;
  const text = reasoningVisible ? ($reasoning.value ?? "") : $content.value;

  return (
    <Button
      disabled={!text}
      onClick={() => navigator.clipboard.writeText(text)}
      title="Copy Message"
    >
      <SvgIcon data={SvgIcon.clipboardDocumentData} />
    </Button>
  );
};
