import type { FunctionComponent } from "preact";
import { chatModelIdSelector } from "../signals/chat-model-id-selector.js";
import { $thinkingEnabled } from "../signals/thinking-enabled.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export const ThinkingButton: FunctionComponent = () => {
  const chatModelId = chatModelIdSelector.$output.value;

  return (
    <Button
      class={$thinkingEnabled.value ? undefined : "border-dashed focus:outline-dashed"}
      disabled={!chatModelId.startsWith("claude-3-7-sonnet-")}
      title={$thinkingEnabled.value ? "Thinking Enabled" : "Thinking Disabled"}
      onClick={() => {
        $thinkingEnabled.value = !$thinkingEnabled.value;
      }}
    >
      <SvgIcon data={SvgIcon.academicCapData} />
    </Button>
  );
};
