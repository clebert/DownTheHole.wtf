import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Ai } from "../contexts/ai.js";
import { isLocalhost } from "../utils/is-localhost.js";
import { Button } from "./button.js";

export const ProviderButton: FunctionComponent = () => {
  const ai = useContext(Ai.Context);

  return (
    <Button
      title="Provider"
      onClick={() => {
        switch (ai.$providerName.peek()) {
          case "anthropic":
            ai.$providerName.value = isLocalhost() ? "ollama" : "openai";
            break;
          case "ollama":
            ai.$providerName.value = "openai";
            break;
          case "openai":
            ai.$providerName.value = "anthropic";
        }
      }}
    >
      {ai.$providerName.value === "anthropic"
        ? "Anthropic"
        : ai.$providerName.value === "ollama"
          ? "Ollama"
          : "OpenAI"}
    </Button>
  );
};
