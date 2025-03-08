import { effect, signal } from "@preact/signals";
import { boolean } from "zod";
import { Storage } from "#utils/storage.js";

const storage = new Storage({ backend: localStorage, key: "image-visible", schema: boolean() });

export const $imageVisible = signal(storage.item ?? true);

effect(() => {
  storage.item = $imageVisible.value;
});
