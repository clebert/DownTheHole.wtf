import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Ai } from "../contexts/ai.js";
import { TextField } from "./text-field.js";

export const ChatModelIdField: FunctionComponent = () => {
  const ai = useContext(Ai.Context);

  return (
    <TextField
      $content={ai.$chatModelId}
      id={`model-id-${ai.$providerName.value}`}
      title="Model ID"
    />
  );
};
