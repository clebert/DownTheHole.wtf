import type { FunctionComponent } from "preact";
import { tw } from "../../utils/tw.js";

export const Page: FunctionComponent = ({ children }) => {
  return (
    <div class={tw`2xl:container 2xl:mx-auto`}>
      <div class={tw`m-4 flex flex-col space-y-4`}>{children}</div>
    </div>
  );
};
