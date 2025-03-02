import type { FunctionComponent } from "preact";
import { Storage } from "../utils/storage.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export const ResetButton: FunctionComponent = () => {
  return (
    <Button
      onClick={() => {
        Storage.clear(localStorage);
        Storage.clear(sessionStorage);
        location.reload();
      }}
      title="Reset Data"
    >
      <SvgIcon data={SvgIcon.powerData} />
    </Button>
  );
};
