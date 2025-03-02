import type { FunctionComponent } from "preact";
import { useMemo } from "preact/hooks";
import { textInputStyle, textInputStyleError } from "../styles.js";
import { debounce } from "../utils/debounce.js";

export interface TextFieldProps {
  readonly appearance?: "error" | "normal";
  readonly id?: string;
  readonly onInput: (value: string) => void;
  readonly title: string;
  readonly type?: string;
  readonly value: string;
}

export const TextField: FunctionComponent<TextFieldProps> = (props) => {
  const { appearance = "normal", id, title, type = "text", value } = props;
  const onInput = useMemo(() => debounce(props.onInput, 300), [props.onInput]);

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
