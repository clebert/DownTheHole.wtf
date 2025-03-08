import type { FunctionComponent } from "preact";
import { Button } from "#components/button.js";
import { SvgIcon } from "#components/svg-icon.js";
import { Storage } from "#utils/storage.js";

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
