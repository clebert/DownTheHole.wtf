import type { FunctionComponent } from "preact";
import { useMemo } from "preact/hooks";
import { textInputStyle } from "../styles.js";
import { debounce } from "../utils/debounce.js";

export interface TextFieldProps {
  readonly id?: string;
  readonly onInput: (value: string) => void;
  readonly title: string;
  readonly type?: string;
  readonly value: string;
}

export const TextField: FunctionComponent<TextFieldProps> = (props) => {
  const { id, title, type = "text", value } = props;
  const onInput = useMemo(() => debounce(props.onInput, 300), [props.onInput]);

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
