import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Button } from "#components/button.js";
import { SvgIcon } from "#components/svg-icon.js";
import { AppState } from "#contexts/app-state.js";

export const ThinkingButton: FunctionComponent = () => {
  const { $thinkingEnabled } = useContext(AppState);

  return (
    <Button
      dashed={$thinkingEnabled.value === false}
      disabled={$thinkingEnabled.value === undefined}
      onClick={() => {
        $thinkingEnabled.value = !$thinkingEnabled.peek();
      }}
      title={
        $thinkingEnabled.value === undefined
          ? "Thinking Unavailable"
          : $thinkingEnabled.value
            ? "Thinking Enabled"
            : "Thinking Disabled"
      }
    >
      <SvgIcon data={$thinkingEnabled.value ? SvgIcon.boltData : SvgIcon.boltSlashData} />
    </Button>
  );
};
