import { batch } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Chat } from "../contexts/chat.js";
import { Settings } from "../contexts/settings.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export const ResetButton: FunctionComponent = () => {
  const chat = useContext(Chat.Context);
  const settings = useContext(Settings.Context);

  return (
    <Button
      onClick={() =>
        batch(() => {
          chat.resetData();
          settings.resetData();
        })
      }
      title="Reset Data"
    >
      <SvgIcon data={SvgIcon.powerData} />
    </Button>
  );
};
