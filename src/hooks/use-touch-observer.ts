import { type ReadonlySignal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export interface TouchEvent {
  readonly type: "start" | "end";
}

export function useTouchObserver(): ReadonlySignal<TouchEvent | undefined> {
  const $touchEvent = useSignal<TouchEvent | undefined>(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    window.addEventListener(
      "touchstart",
      () => {
        $touchEvent.value = { type: "start" };
      },
      { passive: true, signal },
    );

    window.addEventListener(
      "touchend",
      () => {
        $touchEvent.value = { type: "end" };
      },
      { passive: true, signal },
    );

    window.addEventListener(
      "touchcancel",
      () => {
        $touchEvent.value = { type: "end" };
      },
      { passive: true, signal },
    );

    return () => abortController.abort();
  }, [$touchEvent]);

  return $touchEvent;
}
