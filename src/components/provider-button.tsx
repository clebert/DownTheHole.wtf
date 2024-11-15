import { useContext } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import { Ai } from "../contexts/ai.js";
import { Button } from "./button.js";

export function ProviderButton(): JSX.Element {
  const ai = useContext(Ai.Context);

  return (
    <Button
      class="border-dashed"
      title="Provider"
      onClick={() => {
        switch (ai.$providerName.value) {
          case "anthropic":
            ai.$providerName.value = "ollama";
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
}
