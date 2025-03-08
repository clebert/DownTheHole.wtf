import { effect, signal } from "@preact/signals";
import { type TypeOf, z } from "zod";
import { Storage } from "#utils/storage.js";

export type ProviderName = TypeOf<typeof schema>;

const schema = z.enum(["anthropic", "mistral", "ollama", "openai"]);
const storage = new Storage({ backend: localStorage, key: "provider-name", schema });

export const $providerName = signal(storage.item ?? "anthropic");

effect(() => {
  storage.item = $providerName.value;
});
