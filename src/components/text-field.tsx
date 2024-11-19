import type { Signal } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { textInputStyle } from "../styles.js";

export interface TextFieldProps {
  readonly $content: Signal<string>;
  readonly id?: string;
  readonly title: string;
  readonly type?: string;
}

export const TextField: FunctionComponent<TextFieldProps> = ({
  $content,
  id,
  title,
  type = "text",
}) => {
  return (
    <input
      autocapitalize="off"
      autocomplete="off"
      autocorrect="off"
      class={textInputStyle}
      id={id}
      onInput={(event: InputEvent) => {
        event.preventDefault();

        $content.value = (event.target as HTMLInputElement).value;
      }}
      placeholder={title}
      spellcheck={false}
      title={title}
      type={type}
      value={$content.peek()}
    />
  );
};
