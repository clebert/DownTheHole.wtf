import type { FunctionComponent } from "preact";
import { textInputStyle } from "../styles.js";

export interface TextFieldProps {
  readonly id?: string;
  readonly onInput: (value: string) => void;
  readonly title: string;
  readonly type?: string;
  readonly value: string;
}

export const TextField: FunctionComponent<TextFieldProps> = ({
  id,
  onInput,
  title,
  type = "text",
  value,
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
        onInput((event.target as HTMLInputElement).value);
      }}
      placeholder={title}
      spellcheck={false}
      title={title}
      type={type}
      value={value}
    />
  );
};
