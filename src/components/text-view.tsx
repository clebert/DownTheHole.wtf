import type { ReadonlySignal } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useRef } from "preact/hooks";
import { textAreaStyle } from "#constants/styles.js";
import { useAutoScrolling } from "#hooks/use-auto-scrolling.js";

export interface TextViewProps {
  readonly $content: ReadonlySignal<string | undefined>;
  readonly title: string;
}

export const TextView: FunctionComponent<TextViewProps> = ({ $content, title }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useAutoScrolling($content, elementRef);

  return (
    <div class={textAreaStyle} ref={elementRef} title={title}>
      {$content}
    </div>
  );
};
