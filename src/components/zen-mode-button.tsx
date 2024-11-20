import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Settings } from "../contexts/settings.js";
import { Button } from "./button.js";
import { CubeIcon, CubeTransparentIcon } from "./icons.js";

export const ZenModeButton: FunctionComponent = () => {
  const settings = useContext(Settings.Context);

  return (
    <Button
      title={settings.$zenMode.value ? "Zen Mode ON" : "Zen Mode OFF"}
      onClick={() => {
        settings.$zenMode.value = !settings.$zenMode.peek();
      }}
    >
      {settings.$zenMode.value ? <CubeTransparentIcon /> : <CubeIcon />}
    </Button>
  );
};
