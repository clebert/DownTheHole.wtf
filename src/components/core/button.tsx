import type { FunctionComponent } from "preact";
import { buttonStyle, defaultButtonStyle } from "../../styles.js";
import { tw } from "../../utils/tw.js";

export interface ButtonProps {
  readonly default?: boolean | undefined;
  readonly disabled?: boolean | undefined;
  readonly title: string;
  readonly onClick?: (() => void) | undefined;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  default: isDefault,
  disabled,
  title,
  onClick,
}) => {
  return (
    <button
      aria-label={title}
      class={tw([
        tw`select-none whitespace-nowrap px-2 disabled:opacity-25`,
        isDefault ? defaultButtonStyle : buttonStyle,
      ])}
      disabled={disabled ?? !onClick}
      onClick={onClick}
      tabindex={0 /* https://stackoverflow.com/a/78380974 */}
      title={title}
      type="button"
    >
      {children}
    </button>
  );
};
