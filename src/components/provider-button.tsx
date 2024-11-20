import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Ai, type ProviderName } from "../contexts/ai.js";
import { borderStyleError } from "../styles.js";
import { isLocalhost } from "../utils/is-localhost.js";
import { tw } from "../utils/tw.js";
import { Button } from "./button.js";

export const ProviderButton: FunctionComponent = () => {
  const ai = useContext(Ai.Context);

  return (
    <Button
      class={tw(
        ((!ai.$apiKey.value && ai.$providerName.value !== "ollama") || !ai.$chatModelId.value) &&
          borderStyleError,
      )}
      title="Provider"
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
