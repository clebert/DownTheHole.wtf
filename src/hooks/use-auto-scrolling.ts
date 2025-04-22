import { type ReadonlySignal, useComputed } from "@preact/signals";
import type { RefObject } from "preact";
import { useScrollObserver } from "#hooks/use-scroll-observer.js";
import { getLastLineBounds } from "#utils/get-last-line-bounds.js";

export function useAutoScrolling(elementRef: RefObject<HTMLElement>): ReadonlySignal<boolean> {
  const $scrollEvent = useScrollObserver();

  return useComputed(() => {
    const scrollEvent = $scrollEvent.value;

    if (scrollEvent?.direction === "up") {
      return false;
    }

    const lastChild = elementRef.current?.lastChild;
    const lastLinePosition = lastChild ? getLastLineBounds(lastChild) : undefined;

    return lastLinePosition?.visible ?? false;
  });
}
