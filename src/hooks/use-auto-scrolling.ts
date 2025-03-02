import { type ReadonlySignal, useSignalEffect } from "@preact/signals";
import type { RefObject } from "preact";
import { useRef } from "preact/hooks";
import { getLastLineBounds } from "../utils/get-last-line-bounds.js";
import { useScrollObserver } from "./use-scroll-observer.js";
import { useTouchObserver } from "./use-touch-observer.js";

export function useAutoScrolling(
  $content: ReadonlySignal<string | undefined>,
  elementRef: RefObject<HTMLElement>,
): void {
  const $scrollEvent = useScrollObserver();
  const enabledRef = useRef(true);

  useSignalEffect(() => {
    const scrollEvent = $scrollEvent.value;

    if (scrollEvent?.direction === "up") {
      enabledRef.current = false;
    } else if (!enabledRef.current) {
      const lastChild = elementRef.current?.lastChild;
      const lastLinePosition = lastChild ? getLastLineBounds(lastChild) : undefined;

      enabledRef.current = lastLinePosition?.visible ?? false;
    }
  });

  const $touchEvent = useTouchObserver();

  useSignalEffect(() => {
    $content.value;

    if (enabledRef.current) {
      const lastChild = elementRef.current?.lastChild;
      const lastLinePosition = lastChild ? getLastLineBounds(lastChild) : undefined;

      if (lastLinePosition && !lastLinePosition.visible && $touchEvent.peek()?.type !== "start") {
        window.scrollTo({ top: lastLinePosition.pageTop, behavior: "instant" });
      }
    }
  });
}
