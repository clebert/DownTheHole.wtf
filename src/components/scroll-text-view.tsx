import { type ReadonlySignal, useSignalEffect } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useRef } from "preact/hooks";
import { textAreaStyle } from "#constants/styles.js";
import { useAutoScrolling } from "#hooks/use-auto-scrolling.js";
import { useTouchObserver } from "#hooks/use-touch-observer.js";
import { getLastLineBounds } from "#utils/get-last-line-bounds.js";

export interface ScrollTextViewProps {
  readonly $contentChunks: ReadonlySignal<readonly string[]>;
  readonly title: string;
}

export const ScrollTextView: FunctionComponent<ScrollTextViewProps> = ({
  $contentChunks,
  title,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const $autoScrolling = useAutoScrolling(elementRef);
  const $touchEvent = useTouchObserver();

  useSignalEffect(() => {
    const element = elementRef.current;

    if (element && $contentChunks.value.length > 0) {
      const initialChildCount = element.childNodes.length;

      for (const text of $contentChunks.value.slice(initialChildCount)) {
        element.appendChild(document.createTextNode(text));
      }

      if (initialChildCount > 0 && $autoScrolling.peek()) {
        const lastChild = element.lastChild;
        const lastLinePosition = lastChild ? getLastLineBounds(lastChild) : undefined;

        if (lastLinePosition && !lastLinePosition.visible && $touchEvent.peek()?.type !== "start") {
          window.scrollTo({ top: lastLinePosition.pageTop, behavior: "instant" });
        }
      }
    }
  });

  return <div class={textAreaStyle} ref={elementRef} title={title} />;
};
