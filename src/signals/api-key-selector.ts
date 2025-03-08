import { effect } from "@preact/signals";
import { object, string } from "zod";
import { $providerName } from "#signals/provider-name.js";
import { createMultiplexer } from "#utils/create-multiplexer.js";
import { Storage } from "#utils/storage.js";

const storage = new Storage({
  backend: localStorage,
  key: "api-keys",
  schema: object({ anthropic: string(), mistral: string(), ollama: string(), openai: string() }),
});

export const apiKeySelector = createMultiplexer(
  $providerName,
  storage.item ?? { anthropic: "", mistral: "", ollama: "", openai: "" },
);

effect(() => {
  storage.item = apiKeySelector.$inputs.value;
});
