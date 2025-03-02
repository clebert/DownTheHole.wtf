import type { FunctionComponent } from "preact";
import { apiKeySelector } from "../signals/api-key-selector.js";
import { $providerName } from "../signals/provider-name.js";
import { $settingsVisible } from "../signals/settings-visible.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export const SettingsButton: FunctionComponent = () => {
  const apiKey = apiKeySelector.$output.value;

  return (
    <Button
      appearance={
        $providerName.value !== "ollama" && !apiKey && !$settingsVisible.value ? "error" : "normal"
      }
      disabled={$providerName.value === "ollama"}
      title={$settingsVisible.value ? "Settings Visible" : "Settings Hidden"}
      onClick={() => {
        $settingsVisible.value = !$settingsVisible.value;
      }}
    >
      <SvgIcon data={SvgIcon.cog6Tooth} />
    </Button>
  );
};
