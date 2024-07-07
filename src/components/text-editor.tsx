import { type Signal, useSignal, useSignalEffect } from "@preact/signals";
import type { FunctionComponent } from "preact/compat";
import { useMemo } from "preact/hooks";
import { useContentObserver } from "../hooks/use-content-observer.js";
import { textAreaStyle } from "../styles.js";
import { setCaret } from "../utils/set-caret.js";
import { tw } from "../utils/tw.js";

export interface TextEditorProps {
  readonly $content: Signal<string>;
  readonly title: string;
}

export const TextEditor: FunctionComponent<TextEditorProps> = ({ $content, title }) => {
  const $element = useSignal<HTMLDivElement | undefined>(undefined);

  useSignalEffect(() => {
    $element.value?.focus();
  });

  useContentObserver({ $content, $element });

  return useMemo(
    () => (
      <div
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        class={tw([
          tw`min-h-32 w-full whitespace-break-spaces break-words px-2 font-mono`,
          textAreaStyle,
        ])}
        contenteditable="plaintext-only"
        onFocus={({ target }: FocusEvent) => setCaret("end", target as Node)}
        ref={(element) => {
          $element.value = element ?? undefined;
        }}
        spellcheck={false}
        title={title}
      >
        {$content.peek()}
      </div>
    ),
    [$content, title, $element],
  );
};
