import { batch } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { ApiKey } from "../contexts/api-key.js";
import { Chat } from "../contexts/chat.js";
import { Button } from "./button.js";
import { PowerIcon } from "./svg-icon.js";

export const ResetButton: FunctionComponent = () => {
  const $apiKey = useContext(ApiKey);
  const $chat = useContext(Chat);

  return (
    <Button
      onClick={() =>
        batch(() => {
          $apiKey.value = "";
          $chat.value = [];
        })
      }
      title="Reset"
    >
      <PowerIcon />
    </Button>
  );
};
