import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { ApiKey } from "../contexts/api-key.js";
import { TextField } from "./text-field.js";

export const ApiKeyField: FunctionComponent = () => (
  <TextField
    $content={useContext(ApiKey)}
    id="openai-api-key"
    title="OpenAI API Key"
    type="password"
  />
);
