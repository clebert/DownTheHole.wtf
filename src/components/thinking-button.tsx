import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Ai } from "../contexts/ai.js";
import { Settings } from "../contexts/settings.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export const ThinkingButton: FunctionComponent = () => {
  const ai = useContext(Ai.Context);
  const settings = useContext(Settings.Context);

  return (
    <Button
      disabled={!ai.$chatModelId.value.startsWith("claude-3-7-sonnet-")}
      title={settings.$thinkingEnabled.value ? "Thinking Enabled" : "Thinking Disabled"}
      onClick={() => settings.toggleThinkingEnabled()}
    >
      <SvgIcon
        data={settings.$thinkingEnabled.value ? SvgIcon.academicCapData : SvgIcon.rocketLaunch}
      />
    </Button>
  );
};
