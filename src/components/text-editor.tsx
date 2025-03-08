import { type Signal, useSignal, useSignalEffect } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useMemo } from "preact/hooks";
import { useContentObserver } from "#hooks/use-content-observer.js";
import { textAreaStyle } from "#styles.js";
import { setCaret } from "#utils/set-caret.js";

export interface TextEditorProps {
  readonly $content: Signal<string>;
  readonly title: string;
}

export const TextEditor: FunctionComponent<TextEditorProps> = ({ $content, title }) => {
  const $element = useSignal<HTMLDivElement | undefined>(undefined);

  useSignalEffect(() => $element.value?.focus());
  useContentObserver({ $content, $element });

  return useMemo(
    () => (
      <div
        autocapitalize="off"
        autocorrect="off"
        class={textAreaStyle}
        contenteditable="plaintext-only"
        onFocus={({ target }: FocusEvent) => setCaret("end", target as Node)}
        ref={(element) => {
          $element.value = element ?? undefined;
        }}
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role="textbox"
        spellcheck={false}
        tabIndex={0}
        title={title}
      >
        {$content.peek()}
      </div>
    ),
    [$content, title, $element],
  );
};
