import { type ReadonlySignal, useSignalEffect } from "@preact/signals";
import { useRef } from "preact/hooks";
import { VerticalBounds } from "../utils/vertical-bounds.js";
import { useScrollDirection } from "./use-scroll-direction.js";
import { useStableSignals } from "./use-stable-signals.js";

export interface UseAutoScrollProps {
  readonly $content: ReadonlySignal<string>;
  readonly $element: ReadonlySignal<HTMLElement | undefined>;
}

export function useAutoScroll({ $content, $element }: UseAutoScrollProps): void {
  useStableSignals($content, $element);

  const $scrollDirection = useScrollDirection();
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
      (!prevLastLineBounds || prevLastLineBounds.isPartlyVisible) &&
      $scrollDirection.peek() !== "up"
    ) {
      lastLineBounds.scrollIntoView();
    }
  });
}
