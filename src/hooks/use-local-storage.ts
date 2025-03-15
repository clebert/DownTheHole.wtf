import type { Signal } from "@preact/signals";
import type { LocalStorageKey } from "#constants/local-storage-keys.js";
import { type Decoder, type Encoder, useStorage } from "#hooks/use-storage.js";

export function useLocalStorage<TValue>(
  decoder: Decoder<TValue>,
  encoder: Encoder,
  key: LocalStorageKey,
  defaultValue: TValue,
): Signal<TValue> {
  return useStorage(localStorage, decoder, encoder, key, defaultValue);
}
