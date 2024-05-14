import type { FunctionComponent } from "preact";
import { useCallback } from "preact/hooks";
import { placeholderStyle, textAreaStyle } from "../../styles.js";
import { tw } from "../../utils/tw.js";

export interface TextFieldProps {
  readonly id?: string;
  readonly placeholder?: string;
  readonly type?: "password" | "text" | "url" | undefined;
  readonly value: string;

  onBlur?: (() => void) | undefined;
  onFocus?: (() => void) | undefined;
  onInput: (value: string) => void;
}

export const TextField: FunctionComponent<TextFieldProps> = ({
  id,
  placeholder,
  type = "text",
  value,
  onBlur,
  onFocus,
  onInput,
}) => {
  const handleInput = useCallback(
    (event: InputEvent) => {
      event.preventDefault();
      onInput((event.target as HTMLInputElement).value);
    },
    [onInput],
  );

  return (
    <input
      autocapitalize="off"
      autocomplete="off"
      autocorrect="off"
      class={tw([tw`w-full rounded-none px-2 font-mono`, placeholderStyle, textAreaStyle])}
      id={id}
      placeholder={placeholder}
      spellcheck={false}
      type={type}
      value={value}
      onBlur={onBlur}
      onFocus={onFocus}
      onInput={handleInput}
    />
  );
};
