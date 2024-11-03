import type { Signal } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { placeholderStyle, textAreaStyle } from "../styles.js";
import { tw } from "../utils/tw.js";

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
}) => (
  <input
    autocapitalize="off"
    autocomplete="off"
    autocorrect="off"
    class={tw("w-full rounded-none px-2 font-mono", placeholderStyle, textAreaStyle)}
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
