import { type Signal, useSignal, useSignalEffect } from "@preact/signals";

export function useApiKeyStorage(): Signal<string> {
  const $apiKey = useSignal(localStorage.getItem("openai-api-key") ?? "");

  useSignalEffect(() => {
    localStorage.setItem("openai-api-key", $apiKey.value);
  });

  return $apiKey;
}
