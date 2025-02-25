import { batch } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Ai } from "../contexts/ai.js";
import { Chat } from "../contexts/chat.js";
import { Settings } from "../contexts/settings.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export const ResetButton: FunctionComponent = () => {
  const ai = useContext(Ai.Context);
  const chat = useContext(Chat.Context);
  const settings = useContext(Settings.Context);

  return (
    <Button
      onClick={() =>
        batch(() => {
          ai.resetData();
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
