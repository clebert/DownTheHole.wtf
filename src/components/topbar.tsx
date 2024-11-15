import type { FunctionComponent } from "preact";
import { tw } from "../utils/tw.js";

export interface TopbarProps {
  readonly class?: string | undefined;
}

export const Topbar: FunctionComponent<TopbarProps> = ({ children, class: className }) => {
  return (
    <div
      class={tw(
        className,
        "flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0",
      )}
    >
      {children}
    </div>
  );
};
