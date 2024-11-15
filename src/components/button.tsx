import type { FunctionComponent } from "preact";
import { buttonStyle, defaultButtonStyle } from "../styles.js";
import { tw } from "../utils/tw.js";

export interface ButtonProps {
  readonly class?: string | undefined;
  readonly default?: boolean | undefined;
  readonly disabled?: boolean | undefined;
  readonly onClick?: (() => void) | undefined;
  readonly title: string;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  class: className,
  default: isDefault,
  disabled,
  onClick,
  title,
}) => {
  return (
    <button
      aria-label={title}
      class={tw(
        className,
        "select-none whitespace-nowrap px-2 disabled:opacity-25",
        isDefault ? defaultButtonStyle : buttonStyle,
      )}
      disabled={disabled ?? !onClick}
      onClick={onClick}
      tabIndex={0 /* https://stackoverflow.com/a/78380974 */}
      title={title}
      type="button"
    >
      {children}
    </button>
  );
};
