import { effect, signal } from "@preact/signals";
import { boolean } from "zod";
import { Storage } from "../utils/storage.js";

const storage = new Storage({ backend: localStorage, key: "thinking-enabled", schema: boolean() });

export const $thinkingEnabled = signal(storage.item ?? false);

effect(() => {
  storage.item = $thinkingEnabled.value;
});
