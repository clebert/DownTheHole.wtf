import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Settings } from "../contexts/settings.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export const ToggleProviderConfigButton: FunctionComponent = () => {
  const settings = useContext(Settings.Context);

  return (
    <Button
      title={settings.$showProviderConfig.value ? "Hide Provider Config" : "Show Provider Config"}
      onClick={() => {
        settings.$showProviderConfig.value = !settings.$showProviderConfig.peek();
      }}
    >
      <SvgIcon data={settings.$showProviderConfig.value ? SvgIcon.eyeData : SvgIcon.eyeSlashData} />
    </Button>
  );
};
