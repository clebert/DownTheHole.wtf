import { type ReadonlySignal, type Signal, computed, signal } from "@preact/signals";

export type Multiplexer<TKey extends string, TValue> = Readonly<{
  $inputs: ReadonlySignal<Readonly<Record<TKey, TValue>>>;
  $output: ReadonlySignal<TValue>;

  set(value: TValue): void;
}>;

export function createMultiplexer<const TKey extends string, TValue>(
  $key: ReadonlySignal<TKey>,
  initialInputs: Readonly<Record<TKey, TValue>>,
): Multiplexer<TKey, TValue> {
  const keys = Object.keys(initialInputs) as TKey[];
  const inputSignals = {} as Record<TKey, Signal<TValue>>;

  for (const key of keys) {
    inputSignals[key] = signal(initialInputs[key]);
  }

  const $inputs = computed(() => {
    const inputs = {} as Record<TKey, TValue>;

    for (const key of keys) {
      inputs[key] = inputSignals[key].value;
    }

    return inputs;
  });

  const $output = computed(() => inputSignals[$key.value].value);

  const set: Multiplexer<TKey, TValue>["set"] = (value) => {
    const key = $key.peek();

    inputSignals[key].value = value;
  };

  return { $inputs, $output, set };
}
