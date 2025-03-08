import type { FunctionComponent } from "preact";
import { Button } from "#components/button.js";
import { $providerName, type ProviderName } from "#signals/provider-name.js";
import { isLocalhost } from "#utils/is-localhost.js";

export const ProviderButton: FunctionComponent = () => {
  return (
    <Button
      class="w-23"
      title={`${getLabel($providerName.value)} Provider Selected`}
      onClick={() => {
        $providerName.value = getNextProviderName($providerName.peek());
      }}
    >
      {getLabel($providerName.value)}
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
