import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Settings } from "../contexts/settings.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export const ZenButton: FunctionComponent = () => {
  const settings = useContext(Settings.Context);

  return (
    <Button
      title={settings.$zenMode.value ? "Zen ON" : "Zen OFF"}
      onClick={() => {
        settings.$zenMode.value = !settings.$zenMode.peek();
      }}
    >
      <SvgIcon data={settings.$zenMode.value ? SvgIcon.cubeTransparentData : SvgIcon.cubeData} />
    </Button>
  );
};
