import type { Signal } from "@preact/signals";
import type { SessionStorageKey } from "#constants/session-storage-keys.js";
import { type Decoder, type Encoder, useStorage } from "#hooks/use-storage.js";

export function useSessionStorage<TValue>(
  decoder: Decoder<TValue>,
  encoder: Encoder,
  key: SessionStorageKey,
  defaultValue: TValue,
): Signal<TValue> {
  return useStorage(sessionStorage, decoder, encoder, key, defaultValue);
}
