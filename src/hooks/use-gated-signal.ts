import type { ReadonlySignal, Signal } from "@preact/signals";
import { useMemo } from "preact/hooks";
import { createGatedSignal } from "#utils/create-gated-signal.js";
import { useStableRef } from "./use-stable-ref.js";

export function useGatedSignal<TValue>(
  inputSignal: Signal<TValue>,
  controlSignal: ReadonlySignal<boolean>,
): Signal<TValue | undefined> {
  useStableRef(inputSignal);
  useStableRef(controlSignal);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  return useMemo(() => createGatedSignal(inputSignal, controlSignal), []);
}
