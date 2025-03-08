import type { FunctionComponent } from "preact";
import { Button } from "#components/button.js";
import { SvgIcon } from "#components/svg-icon.js";
import { chatModelIdSelector } from "#signals/chat-model-id-selector.js";
import { $thinkingEnabled } from "#signals/thinking-enabled.js";

export const ThinkingButton: FunctionComponent = () => {
  const chatModelId = chatModelIdSelector.$output.value;

  return (
    <Button
      dashed={!$thinkingEnabled.value}
      disabled={!chatModelId.startsWith("claude-3-7-sonnet-")}
      onClick={() => {
        $thinkingEnabled.value = !$thinkingEnabled.value;
      }}
      title={$thinkingEnabled.value ? "Thinking Enabled" : "Thinking Disabled"}
    >
      <SvgIcon data={$thinkingEnabled.value ? SvgIcon.boltData : SvgIcon.boltSlashData} />
    </Button>
  );
};
