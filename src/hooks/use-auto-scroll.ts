import { type ReadonlySignal, useSignalEffect } from "@preact/signals";
import { useRef } from "preact/hooks";
import { VerticalBounds } from "../utils/vertical-bounds.js";
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

    const lastLineBounds = element.lastChild
      ? VerticalBounds.ofLastLine(element.lastChild)
      : undefined;

    const prevLastLineBounds = prevLastLineBoundsRef.current;

    prevLastLineBoundsRef.current = lastLineBounds;

    if (
      lastLineBounds &&
      !lastLineBounds.isFullyVisible &&
      (!prevLastLineBounds || prevLastLineBounds.isPartlyVisible)
    ) {
      // TODO: Detect high scroll momentum when viewport width is small and text flows fast.
      //       Allow user to scroll up and escape auto-scrolling in such cases.
      lastLineBounds.scrollIntoView();
    }
  });
}
