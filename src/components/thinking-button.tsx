import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Button } from "#components/button.js";
import { SvgIcon } from "#components/svg-icon.js";
import { AppState } from "#contexts/app-state.js";

export const ThinkingButton: FunctionComponent = () => {
  const { $chatModelId, $thinkingEnabled } = useContext(AppState);

  return (
    <Button
      dashed={!$thinkingEnabled.value}
      disabled={!$chatModelId.value.startsWith("claude-3-7-sonnet-")}
      onClick={() => {
        $thinkingEnabled.value = !$thinkingEnabled.peek();
      }}
      title={$thinkingEnabled.value ? "Thinking Enabled" : "Thinking Disabled"}
    >
      <SvgIcon data={$thinkingEnabled.value ? SvgIcon.boltData : SvgIcon.boltSlashData} />
    </Button>
  );
};
