import { type ReadonlySignal, useComputed } from "@preact/signals";
import type { RefObject } from "preact";
import { useRef } from "preact/hooks";
import { useScrollObserver } from "#hooks/use-scroll-observer.js";
import { getLastLineBounds } from "#utils/get-last-line-bounds.js";

export function useAutoScrolling(elementRef: RefObject<HTMLElement>): ReadonlySignal<boolean> {
  const $scrollEvent = useScrollObserver();
  const enabledRef = useRef(true);

  return useComputed(() => {
    const scrollEvent = $scrollEvent.value;

    if (scrollEvent?.direction === "up") {
      enabledRef.current = false;
    } else if (!enabledRef.current) {
      const lastChild = elementRef.current?.lastChild;
      const lastLinePosition = lastChild ? getLastLineBounds(lastChild) : undefined;

      enabledRef.current = lastLinePosition?.visible ?? false;
    }

    return enabledRef.current;
  });
}
