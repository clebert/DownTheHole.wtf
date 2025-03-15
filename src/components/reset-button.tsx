import type { FunctionComponent } from "preact";
import { Button } from "#components/button.js";
import { SvgIcon } from "#components/svg-icon.js";
import { clearLocalStorage } from "#utils/clear-local-storage.js";
import { clearSessionStorage } from "#utils/clear-session-storage.js";

export const ResetButton: FunctionComponent = () => {
  return (
    <Button
      onClick={() => {
        clearLocalStorage();
        clearSessionStorage();
        location.reload();
      }}
      title="Reset Data"
    >
      <SvgIcon data={SvgIcon.powerData} />
    </Button>
  );
};
