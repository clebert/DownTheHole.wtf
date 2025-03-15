import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Button } from "#components/button.js";
import { SvgIcon } from "#components/svg-icon.js";
import { AppState } from "#contexts/app-state.js";

export const SettingsButton: FunctionComponent = () => {
  const { $apiKey, $chatModelId, $providerName, $settingsVisible } = useContext(AppState);

  const appearance =
    (($providerName.value !== "ollama" && !$apiKey.value) || !$chatModelId.value) &&
    !$settingsVisible.value
      ? "error"
      : undefined;

  return (
    <Button
      appearance={appearance}
      dashed={!$settingsVisible.value}
      onClick={() => {
        $settingsVisible.value = !$settingsVisible.peek();
      }}
      title={$settingsVisible.value ? "Settings Visible" : "Settings Hidden"}
    >
      <SvgIcon appearance={appearance} data={SvgIcon.cog6ToothData} />
    </Button>
  );
};
