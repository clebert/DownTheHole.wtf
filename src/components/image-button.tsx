import type { FunctionComponent } from "preact";
import { $imageVisible } from "../signals/image-visible.js";
import { Button } from "./button.js";
import { SvgIcon } from "./svg-icon.js";

export const ImageButton: FunctionComponent = () => {
  return (
    <Button
      dashed={!$imageVisible.value}
      onClick={() => {
        $imageVisible.value = !$imageVisible.value;
      }}
      title={$imageVisible.value ? "Image Visible" : "Image Hidden"}
    >
      <SvgIcon data={SvgIcon.photo} />
    </Button>
  );
};
