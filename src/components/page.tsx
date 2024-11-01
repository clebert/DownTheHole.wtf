import type { FunctionComponent } from "preact";

export const Page: FunctionComponent = ({ children }) => {
  return (
    <div class="2xl:container 2xl:mx-auto">
      <div class="m-4 flex flex-col space-y-4">{children}</div>
    </div>
  );
};
