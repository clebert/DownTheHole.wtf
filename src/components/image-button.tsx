import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Button } from "#components/button.js";
import { SvgIcon } from "#components/svg-icon.js";
import { AppState } from "#contexts/app-state.js";

export const ImageButton: FunctionComponent = () => {
  const { $imageInputVisible } = useContext(AppState);

  return (
    <Button
      dashed={!$imageInputVisible.value}
      onClick={() => {
        $imageInputVisible.value = !$imageInputVisible.peek();
      }}
      title={$imageInputVisible.value ? "Image Visible" : "Image Hidden"}
    >
      <SvgIcon data={SvgIcon.photoData} />
    </Button>
  );
};
