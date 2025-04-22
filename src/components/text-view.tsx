import { type ReadonlySignal, useSignalEffect } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useRef } from "preact/hooks";
import { textAreaStyle } from "#constants/styles.js";
import { useAutoScrolling } from "#hooks/use-auto-scrolling.js";
import { useTouchObserver } from "#hooks/use-touch-observer.js";
import { getLastLineBounds } from "#utils/get-last-line-bounds.js";

export interface TextViewProps {
  readonly $content: ReadonlySignal<string | readonly string[] | undefined>;
  readonly title: string;
}

export const TextView: FunctionComponent<TextViewProps> = ({ $content, title }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const $autoScrolling = useAutoScrolling(elementRef);
  const $touchEvent = useTouchObserver();

  useSignalEffect(() => {
    const content = $content.value ?? "";
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (typeof content === "string") {
      element.textContent = content;
    } else {
      for (const text of content.slice(element.childNodes.length)) {
        element.appendChild(document.createTextNode(text));
      }
    }

    if ($autoScrolling.peek()) {
      const lastChild = element.lastChild;
      const lastLinePosition = lastChild ? getLastLineBounds(lastChild) : undefined;

      if (lastLinePosition && !lastLinePosition.visible && $touchEvent.peek()?.type !== "start") {
        window.scrollTo({ top: lastLinePosition.pageTop, behavior: "instant" });
      }
    }
  });

  return <div class={textAreaStyle} ref={elementRef} title={title} />;
};
