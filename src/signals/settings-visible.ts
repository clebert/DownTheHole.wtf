import { effect, signal } from "@preact/signals";
import { boolean } from "zod";
import { Storage } from "#utils/storage.js";

const storage = new Storage({ backend: localStorage, key: "settings-visible", schema: boolean() });

export const $settingsVisible = signal(storage.item ?? true);

effect(() => {
  storage.item = $settingsVisible.value;
});
