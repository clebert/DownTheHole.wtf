import type { FunctionComponent } from "preact";
import { Button } from "#components/button.js";
import { SvgIcon } from "#components/svg-icon.js";
import { $imageVisible } from "#signals/image-visible.js";

export const ImageButton: FunctionComponent = () => {
  return (
    <Button
      dashed={!$imageVisible.value}
      onClick={() => {
        $imageVisible.value = !$imageVisible.value;
      }}
      title={$imageVisible.value ? "Image Visible" : "Image Hidden"}
    >
      <SvgIcon data={SvgIcon.photoData} />
    </Button>
  );
};
