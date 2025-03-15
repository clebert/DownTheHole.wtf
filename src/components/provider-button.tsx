import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Button } from "#components/button.js";
import type { ProviderName } from "#constants/provider-names.js";
import { AppState } from "#contexts/app-state.js";
import { isLocalhost } from "#utils/is-localhost.js";

export const ProviderButton: FunctionComponent = () => {
  const { $providerName } = useContext(AppState);

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
