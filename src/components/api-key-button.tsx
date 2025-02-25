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
      appearance={
        ai.$providerName.value !== "ollama" && !ai.$apiKey.value && !settings.$showApiKey.value
          ? "error"
          : "normal"
      }
      disabled={ai.$providerName.value === "ollama"}
      title={settings.$showApiKey.value ? "API Key Visible" : "API Key Hidden"}
      onClick={() => settings.toggleShowApiKey()}
    >
      <SvgIcon data={settings.$showApiKey.value ? SvgIcon.eyeData : SvgIcon.eyeSlashData} />
    </Button>
  );
};
