import type { FunctionComponent } from "preact";
import { tw } from "../utils/tw.js";

export interface ContainerProps {
  readonly col?: boolean | undefined;
  readonly grow?: boolean | undefined;
}

export const Container: FunctionComponent<ContainerProps> = ({ children, col, grow }) => {
  return (
    <div
      class={tw(
        "flex max-h-min",
        col ? "flex-col space-y-2" : "flex-row space-x-2",
        grow ? "grow overflow-hidden" : "shrink-0",
      )}
    >
      {children}
    </div>
  );
};
