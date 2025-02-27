import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { type ProviderName, Settings } from "../contexts/settings.js";
import { isLocalhost } from "../utils/is-localhost.js";
import { Button } from "./button.js";

export const ProviderButton: FunctionComponent = () => {
  const settings = useContext(Settings.Context);

  return (
    <Button
      title={`${getLabel(settings.$providerName.value)} Provider Selected`}
      onClick={() => settings.setProviderName(getNextProviderName(settings.$providerName.peek()))}
    >
      {getLabel(settings.$providerName.value)}
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
