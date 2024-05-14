import { type ReadonlySignal, useSignalEffect } from "@preact/signals";
import { useRef } from "preact/hooks";
import { type VerticalBounds, getLastLineBounds } from "../utils/get-last-line-bounds.js";
import { useStableSignals } from "./use-stable-signals.js";

export interface UseAutoScrollProps {
  readonly $content: ReadonlySignal<string>;
  readonly $element: ReadonlySignal<HTMLElement | undefined>;
}

export function useAutoScroll({ $content, $element }: UseAutoScrollProps): void {
  useStableSignals($content, $element);

  const prevLastLineBoundsRef = useRef<VerticalBounds | undefined>();

  useSignalEffect(() => {
    const content = $content.value;
    const element = $element.value;

    if (!content || !element) {
      return;
    }

    const viewport = window.visualViewport;
    const lastLineBounds = element.lastChild ? getLastLineBounds(element.lastChild) : undefined;
    const prevLastLineBounds = prevLastLineBoundsRef.current;

    prevLastLineBoundsRef.current = lastLineBounds;

    if (!viewport || !lastLineBounds) {
      return;
    }

    const prevLastLineIsPartlyVisible =
      !prevLastLineBounds ||
      (prevLastLineBounds.bottom > window.scrollY &&
        prevLastLineBounds.top < window.scrollY + viewport.height);

    const lastLineIsFullyVisible =
      lastLineBounds.top >= window.scrollY &&
      lastLineBounds.bottom < window.scrollY + viewport.height;

    if (prevLastLineIsPartlyVisible && !lastLineIsFullyVisible) {
      window.scrollTo({ top: lastLineBounds.top, behavior: "instant" });
    }
  });
}
