import type { ReadonlySignal, Signal } from "@preact/signals";

export function createGatedSignal<TValue>(
  inputSignal: Signal<TValue>,
  controlSignal: ReadonlySignal<boolean>,
): Signal<TValue | undefined> {
  return new Proxy(inputSignal, {
    get(_target, key) {
      if (key === "value") {
        if (!controlSignal.value) {
          return undefined;
        }

        return inputSignal.value;
      }

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      return (inputSignal as any)[key];
    },
  });
}
