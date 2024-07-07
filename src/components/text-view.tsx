import { type ReadonlySignal, useSignal } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useAutoScroll } from "../hooks/use-auto-scroll.js";
import { textAreaStyle } from "../styles.js";
import { tw } from "../utils/tw.js";

export interface TextViewProps {
  readonly $content: ReadonlySignal<string>;
  readonly title: string;
}

export const TextView: FunctionComponent<TextViewProps> = ({ $content, title }) => {
  const $element = useSignal<HTMLDivElement | undefined>(undefined);

  useAutoScroll({ $content, $element });

  return (
    <div
      class={tw([
        tw`min-h-32 w-full whitespace-break-spaces break-words px-2 font-mono`,
        textAreaStyle,
      ])}
      ref={(element) => {
        $element.value = element ?? undefined;
      }}
      title={title}
    >
      {$content}
    </div>
  );
};
