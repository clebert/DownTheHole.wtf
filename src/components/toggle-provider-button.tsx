import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Ai, type ProviderName } from "../contexts/ai.js";
import { isLocalhost } from "../utils/is-localhost.js";
import { Button } from "./button.js";

export const ToggleProviderButton: FunctionComponent = () => {
  const ai = useContext(Ai.Context);

  return (
    <Button
      appearance={
        (!ai.$apiKey.value && ai.$providerName.value !== "ollama") || !ai.$chatModelId.value
          ? "error"
          : "normal"
      }
      title="Toggle Provider"
      onClick={() => {
        ai.$providerName.value = getNextProviderName(ai.$providerName.peek());
      }}
    >
      {getLabel(ai.$providerName.value)}
    </Button>
  );
};

function getNextProviderName(providerName: ProviderName): ProviderName {
  switch (providerName) {
    case "anthropic":
      return "mistral";
    case "mistral":
      return isLocalhost() ? "ollama" : "openai";
    case "ollama":
      return "openai";
    case "openai":
      return "anthropic";
  }
}

function getLabel(providerName: ProviderName): string {
  switch (providerName) {
    case "anthropic":
      return "Anthropic";
    case "mistral":
      return "Mistral AI";
    case "ollama":
      return "Ollama";
    case "openai":
      return "OpenAI";
  }
}
