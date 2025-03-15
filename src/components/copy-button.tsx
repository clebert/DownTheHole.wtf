import { useComputed, useSignal, useSignalEffect } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { Button } from "#components/button.js";
import { SvgIcon } from "#components/svg-icon.js";
import type { ChatMessage } from "#contexts/app-state.js";

export interface DeleteButtonProps {
  readonly chatMessage: ChatMessage;
}

export const CopyButton: FunctionComponent<DeleteButtonProps> = ({ chatMessage }) => {
  const { $content } = chatMessage;
  const $state = useSignal<"failure" | "ready" | "success">("ready");

  const $data = useComputed(() =>
    $state.value === "ready"
      ? SvgIcon.clipboardDocumentData
      : $state.value === "success"
        ? SvgIcon.clipboardDocumentCheckData
        : SvgIcon.exclamationTriangleData,
  );

  useSignalEffect(() => {
    $content.value;

    $state.value = "ready";
  });

  return (
    <Button
      disabled={!$content.value}
      onClick={() =>
        navigator.clipboard
          .writeText($content.peek())
          .then(() => {
            $state.value = "success";
          })
          .catch(() => {
            $state.value = "failure";
          })
      }
      title="Copy Message"
    >
      <SvgIcon data={$data.value} />
    </Button>
  );
};
