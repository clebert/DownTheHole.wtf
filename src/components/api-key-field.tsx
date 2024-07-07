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

  return (
    <TextField
      id="openai-api-key"
      title="OpenAI API Key"
      type="password"
      value={$apiKey.value}
      onInput={updateApiKey}
    />
  );
};
