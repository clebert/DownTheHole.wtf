import type { FunctionComponent } from "preact";
import { $imageVisible } from "../signals/image-visible.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export const ImageButton: FunctionComponent = () => {
  return (
    <Button
      class={$imageVisible.value ? undefined : "border-dashed focus:outline-dashed"}
      title={$imageVisible.value ? "Image Visible" : "Image Hidden"}
      onClick={() => {
        $imageVisible.value = !$imageVisible.value;
      }}
    >
      <SvgIcon data={SvgIcon.photo} />
    </Button>
  );
};
