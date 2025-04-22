import type { FunctionComponent } from "preact";
import { textAreaStyle } from "#constants/styles.js";

export interface TextViewProps {
  readonly content: string | undefined;
  readonly title: string;
}

export const TextView: FunctionComponent<TextViewProps> = ({ content, title }) => {
  return (
    <div class={textAreaStyle} title={title}>
      {content}
    </div>
  );
};
