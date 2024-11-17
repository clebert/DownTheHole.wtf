import { type ReadonlySignal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export interface ScrollEvent {
  readonly direction: "down" | "up";
}

export function useScrollObserver(): ReadonlySignal<ScrollEvent | undefined> {
  const $scrollEvent = useSignal<ScrollEvent | undefined>(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    window.addEventListener(
      "wheel",
      ({ deltaY }) => {
        $scrollEvent.value = { direction: deltaY > 0 ? "down" : "up" };
      },
      { passive: true, signal },
    );

    let touchStartY: number | undefined;
    let touchEndY: number | undefined;

    window.addEventListener(
      "touchstart",
      ({ touches }) => {
        const touch = touches[0];

        touchStartY = touch && touches.length === 1 ? touch.screenY : undefined;
        touchEndY = undefined;
      },
      { passive: true, signal },
    );

    window.addEventListener(
      "touchmove",
      ({ touches }) => {
        const touch = touches[0];

        if (touchStartY !== undefined && touch && touches.length === 1) {
          touchEndY = touch.screenY;
        } else {
          touchStartY = undefined;
          touchEndY = undefined;
        }
      },
      { passive: true, signal },
    );

    window.addEventListener(
      "touchend",
      () => {
        if (touchStartY !== undefined && touchEndY !== undefined) {
          const deltaY = touchStartY - touchEndY;

          $scrollEvent.value = { direction: deltaY > 0 ? "down" : "up" };
        }

        touchStartY = undefined;
        touchEndY = undefined;
      },
      { passive: true, signal },
    );

    return () => abortController.abort();
  }, [$scrollEvent]);

  return $scrollEvent;
}
