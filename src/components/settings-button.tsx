import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Settings } from "../contexts/settings.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export const SettingsButton: FunctionComponent = () => {
  const settings = useContext(Settings.Context);

  return (
    <Button
      appearance={
        settings.$providerName.value !== "ollama" &&
        !settings.$apiKey.value &&
        !settings.$showSettings.value
          ? "error"
          : "normal"
      }
      disabled={settings.$providerName.value === "ollama"}
      title={settings.$showSettings.value ? "Settings Visible" : "Settings Hidden"}
      onClick={() => settings.toggleShowSettings()}
    >
      <SvgIcon data={SvgIcon.cog6Tooth} />
    </Button>
  );
};
