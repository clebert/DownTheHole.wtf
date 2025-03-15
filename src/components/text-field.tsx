import type { FunctionComponent } from "preact";
import { textInputStyle, textInputStyleError } from "#constants/styles.js";

export interface TextFieldProps {
  readonly appearance?: "error" | undefined;
  readonly id?: string;
  readonly onInput: (value: string) => void;
  readonly title: string;
  readonly type?: string;
  readonly value: string;
}

export const TextField: FunctionComponent<TextFieldProps> = ({
  appearance,
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
      class={appearance === "error" ? textInputStyleError : textInputStyle}
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
