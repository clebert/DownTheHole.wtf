import { type Signal, useSignal, useSignalEffect } from "@preact/signals";
import { useMemo } from "preact/hooks";
import { useStableRef } from "#hooks/use-stable-ref.js";

export type Decoder<TValue> = (data: string) => TValue | undefined;
export type Encoder = (value: unknown) => string;

export function useStorage<const TValue>(
  storage: Pick<globalThis.Storage, "getItem" | "setItem">,
  decoder: Decoder<TValue>,
  encoder: Encoder,
  key: string,
  defaultValue: TValue,
): Signal<TValue> {
  useStableRef(storage);
  useStableRef(decoder);
  useStableRef(encoder);

  const signal = useSignal(defaultValue);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useMemo(() => {
    const item = storage.getItem(key);

    signal.value = item === null ? defaultValue : (decoder(item) ?? defaultValue);
  }, [key]);

  useSignalEffect(() => storage.setItem(key, encoder(signal.value)));

  return signal;
}
