import type { ReadonlySignal, Signal } from "@preact/signals";

export function createGatedSignal<TValue>(
  inputSignal: Signal<TValue>,
  controlSignal: ReadonlySignal<boolean>,
): Signal<TValue | undefined> {
  return new Proxy(inputSignal, {
    get(_target, key) {
      if (key === "value") {
        return controlSignal.value ? inputSignal.value : undefined;
      }

      // biome-ignore lint/suspicious/noExplicitAny: proxy property forwarding
      return (inputSignal as any)[key];
    },
  });
}
