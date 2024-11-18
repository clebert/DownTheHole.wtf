import type { FunctionComponent } from "preact";
import { buttonStyle, buttonStyleInverted } from "../styles.js";

export interface ButtonProps {
  readonly default?: boolean | undefined;
  readonly disabled?: boolean | undefined;
  readonly onClick?: (() => void) | undefined;
  readonly title: string;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  default: isDefault,
  disabled,
  onClick,
  title,
}) => {
  return (
    <button
      aria-label={title}
      class={isDefault ? buttonStyleInverted : buttonStyle}
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
