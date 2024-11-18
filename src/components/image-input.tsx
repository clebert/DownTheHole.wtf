import type { FunctionComponent } from "preact";
import type { UserMessage } from "../contexts/chat.js";
import { fileInputStyle } from "../styles.js";

export interface ImageInputProps {
  readonly message: UserMessage;
}

export const ImageInput: FunctionComponent<ImageInputProps> = ({ message }) => {
  return (
    <input
      accept="image/*"
      capture="environment"
      class={fileInputStyle}
      multiple={true}
      onChange={(event) => {
        message.$imageFileList.value = (event.target as HTMLInputElement).files ?? undefined;
      }}
      tabIndex={0}
      type="file"
    />
  );
};
