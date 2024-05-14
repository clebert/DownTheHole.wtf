import { type ReadonlySignal, useSignalEffect } from "@preact/signals";
import { useStableSignals } from "./use-stable-signals.js";

export interface UseAutoFocusProps {
  readonly $element: ReadonlySignal<HTMLElement | undefined>;
}

export function useAutoFocus({ $element }: UseAutoFocusProps): void {
  useStableSignals($element);

  useSignalEffect(() => {
    const element = $element.value;

    if (element) {
      element.scrollIntoView({ behavior: "instant", block: "end" });
      element.focus();
    }
  });
}
