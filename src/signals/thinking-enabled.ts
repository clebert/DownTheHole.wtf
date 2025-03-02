import { effect, signal } from "@preact/signals";
import { boolean } from "zod";
import { Storage } from "../utils/storage.js";

const storage = new Storage({ backend: localStorage, key: "thinking-enabled", schema: boolean() });

export const $thinkingEnabled = signal(storage.getItem() ?? false);

effect(() => storage.setItem($thinkingEnabled.value));
