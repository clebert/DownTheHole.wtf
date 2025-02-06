import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Ai } from "../contexts/ai.js";
import { Settings } from "../contexts/settings.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export const ApiKeyButton: FunctionComponent = () => {
  const ai = useContext(Ai.Context);
  const settings = useContext(Settings.Context);

  return (
    <Button
      appearance={!ai.$apiKey.value && !settings.$showApiKey.value ? "error" : "normal"}
      title={settings.$showApiKey.value ? "API Key Visible" : "API Key Hidden"}
      onClick={() => {
        settings.$showApiKey.value = !settings.$showApiKey.peek();
      }}
    >
      <SvgIcon data={settings.$showApiKey.value ? SvgIcon.eyeData : SvgIcon.eyeSlashData} />
    </Button>
  );
};
