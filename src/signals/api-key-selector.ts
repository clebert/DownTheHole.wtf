import { effect } from "@preact/signals";
import { object, string } from "zod";
import { createMultiplexer } from "../utils/create-multiplexer.js";
import { Storage } from "../utils/storage.js";
import { $providerName } from "./provider-name.js";

const storage = new Storage({
  backend: localStorage,
  key: "api-keys",
  schema: object({ anthropic: string(), mistral: string(), ollama: string(), openai: string() }),
});

export const apiKeySelector = createMultiplexer(
  $providerName,
  storage.getItem() ?? { anthropic: "", mistral: "", ollama: "", openai: "" },
);

effect(() => storage.setItem(apiKeySelector.$inputs.value));
