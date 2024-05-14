import { useSignal } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useCallback, useContext } from "preact/hooks";
import { ApiKey } from "../contexts/api-key.js";
import { TextField } from "./core/text-field.js";

export const ApiKeyField: FunctionComponent = () => {
  const $apiKey = useContext(ApiKey);

  const updateApiKey = useCallback(
    (apiKey: string) => {
      $apiKey.value = apiKey;
    },
    [$apiKey],
  );

  const $focused = useSignal(false);

  const handleBlur = useCallback(() => {
    $focused.value = false;
  }, [$focused]);

  const handleFocus = useCallback(() => {
    $focused.value = true;
  }, [$focused]);

  return (
    <TextField
      id="openai-api-key"
      placeholder="OpenAI API Key"
      type={$focused.value ? "text" : "password"}
      value={$apiKey.value}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onInput={updateApiKey}
    />
  );
};
