import type { FunctionComponent } from "preact";
import { apiKeySelector } from "../signals/api-key-selector.js";
import { chatModelIdSelector } from "../signals/chat-model-id-selector.js";
import { $providerName } from "../signals/provider-name.js";
import { $settingsVisible } from "../signals/settings-visible.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export const SettingsButton: FunctionComponent = () => {
  const apiKey = apiKeySelector.$output.value;

  const appearance =
    (($providerName.value !== "ollama" && !apiKey) || !chatModelIdSelector.$output.value) &&
    !$settingsVisible.value
      ? "error"
      : undefined;

  return (
    <Button
      appearance={appearance}
      dashed={!$settingsVisible.value}
      onClick={() => {
        $settingsVisible.value = !$settingsVisible.value;
      }}
      title={$settingsVisible.value ? "Settings Visible" : "Settings Hidden"}
    >
      <SvgIcon appearance={appearance} data={SvgIcon.cog6Tooth} />
    </Button>
  );
};
