import type { ReadonlySignal } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { textAreaStyle } from "../styles.js";
import { tw } from "../utils/tw.js";

export interface TextViewProps {
  readonly $content: ReadonlySignal<string>;
  readonly class?: string | undefined;
  readonly title: string;
}

export const TextView: FunctionComponent<TextViewProps> = ({
  $content,
  class: className,
  title,
}) => {
  return (
    <div
      class={tw(
        className,
        "min-h-32 w-full whitespace-break-spaces break-words px-2 font-mono",
        textAreaStyle,
      )}
      title={title}
    >
      {$content}
    </div>
  );
};
