import type { FunctionComponent } from "preact";
import { tw } from "../utils/tw.js";

export interface ContainerProps {
  readonly col?: boolean | undefined;
  readonly grow?: boolean | undefined;
}

export const Container: FunctionComponent<ContainerProps> = ({ children, col, grow }) => {
  return (
    <div
      class={tw([
        tw`flex max-h-min`,
        col ? tw`flex-col space-y-2` : tw`flex-row space-x-2`,
        grow ? tw`grow overflow-hidden` : tw`shrink-0`,
      ])}
    >
      {children}
    </div>
  );
};
