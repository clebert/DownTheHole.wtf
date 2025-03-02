import { effect } from "@preact/signals";
import { object, string } from "zod";
import { createMultiplexer } from "../utils/create-multiplexer.js";
import { Storage } from "../utils/storage.js";
import { $providerName } from "./provider-name.js";

const storage = new Storage({
  backend: localStorage,
  key: "chat-model-ids",
  schema: object({ anthropic: string(), mistral: string(), ollama: string(), openai: string() }),
});

export const chatModelIdSelector = createMultiplexer(
  $providerName,

  storage.getItem() ?? {
    anthropic: "claude-3-7-sonnet-latest",
    mistral: "pixtral-large-latest",
    ollama: "qwen2.5-coder:32b",
    openai: "gpt-4o",
  },
);

effect(() => storage.setItem(chatModelIdSelector.$inputs.value));
