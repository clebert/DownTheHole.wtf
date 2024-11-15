import { batch } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Ai } from "../contexts/ai.js";
import { Chat } from "../contexts/chat.js";
import { Button } from "./button.js";
import { PowerIcon } from "./svg-icon.js";

export const ResetButton: FunctionComponent = () => {
  const ai = useContext(Ai.Context);
  const chat = useContext(Chat.Context);

  return (
    <Button
      onClick={() =>
        batch(() => {
          ai.reset();
          chat.reset();
        })
      }
      title="Reset"
    >
      <PowerIcon />
    </Button>
  );
};
