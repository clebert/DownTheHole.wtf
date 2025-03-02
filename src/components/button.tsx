import type { FunctionComponent } from "preact";
import {
  buttonStyle,
  buttonStyleError,
  buttonStyleInverted,
  buttonStyleInvertedError,
} from "../styles.js";
import { tw } from "../utils/tw.js";

export interface ButtonProps {
  readonly appearance?: "error" | undefined;
  readonly class?: string | undefined;
  readonly dashed?: boolean | undefined;
  readonly default?: boolean | undefined;
  readonly disabled?: boolean | undefined;
  readonly onClick?: (() => void) | undefined;
  readonly title: string;
}

export const Button: FunctionComponent<ButtonProps> = ({
  appearance,
  children,
  class: className,
  dashed,
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
        dashed && "border-dashed focus:outline-dashed",
        isDefault
          ? appearance === "error"
            ? buttonStyleInvertedError
            : buttonStyleInverted
          : appearance === "error"
            ? buttonStyleError
            : buttonStyle,
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
