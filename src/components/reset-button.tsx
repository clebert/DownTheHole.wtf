import type { FunctionComponent } from "preact";
import { useCallback, useContext } from "preact/hooks";
import { ApiKey } from "../contexts/api-key.js";
import { Chat } from "../contexts/chat.js";
import { Button } from "./core/button.js";
import { PowerIcon } from "./core/svg-icon.js";

export const ResetButton: FunctionComponent = () => {
  const $apiKey = useContext(ApiKey);
  const $chat = useContext(Chat);

  const reset = useCallback(() => {
    $apiKey.value = "";
    $chat.value = [];
  }, [$apiKey, $chat]);

  return (
    <Button title="Reset" onClick={reset}>
      <PowerIcon />
    </Button>
  );
};
