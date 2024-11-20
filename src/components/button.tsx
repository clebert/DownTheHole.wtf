import type { FunctionComponent } from "preact";
import {
  buttonStyle,
  buttonStyleError,
  buttonStyleInverted,
  buttonStyleInvertedError,
} from "../styles.js";

export interface ButtonProps {
  readonly appearance?: "error" | "normal";
  readonly default?: boolean | undefined;
  readonly disabled?: boolean | undefined;
  readonly onClick?: (() => void) | undefined;
  readonly title: string;
}

export const Button: FunctionComponent<ButtonProps> = ({
  appearance = "normal",
  children,
  default: isDefault,
  disabled,
  onClick,
  title,
}) => {
  return (
    <button
      aria-label={title}
      class={
        isDefault
          ? appearance === "error"
            ? buttonStyleInvertedError
            : buttonStyleInverted
          : appearance === "error"
            ? buttonStyleError
            : buttonStyle
      }
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
