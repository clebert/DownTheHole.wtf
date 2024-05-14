import type { ReadonlySignal } from "@preact/signals";
import { useRef } from "preact/hooks";

/**
 * Ensures that the provided signals remain stable over time.
 * This hook is intended to be used in development mode to track
 * value changes of signals rather than the signals themselves.
 *
 * @see https://github.com/preactjs/signals/issues/361#issuecomment-1552229236
 */
export function useStableSignals(...signals: ReadonlySignal[]): void {
  if (__dev) {
    // biome-ignore lint/correctness/useHookAtTopLevel: __dev
    const signalsRef = useRef(signals);

    if (signals.length !== signalsRef.current.length) {
      throw new Error("The number of signals has changed between renders.");
    }

    for (let index = 0; index < signals.length; index += 1) {
      if (signals[index] !== signalsRef.current[index]) {
        throw new Error(`Signal at index ${index} has changed between renders.`);
      }
    }
  }
}
