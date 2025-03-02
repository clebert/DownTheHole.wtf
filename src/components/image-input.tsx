import { batch, useSignal, useSignalEffect } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useRef } from "preact/hooks";
import { $images } from "../signals/images.js";
import { fileInputStyle, fileInputStyleError } from "../styles.js";
import { encodePngImage } from "../utils/encode-png-image.js";
import { Button } from "./button.js";
import { Container } from "./container.js";
import { SvgIcon } from "./svg-icon.js";

export const ImageInput: FunctionComponent = () => {
  const elementRef = useRef<HTMLInputElement>(null);
  const $error = useSignal(false);
  const $files = useSignal<FileList>();

  useSignalEffect(() => {
    if ($images.value.length === 0) {
      if (elementRef.current) {
        elementRef.current.value = "";
      }

      batch(() => {
        $error.value = false;
        $files.value = undefined;
      });
    }
  });

  useSignalEffect(() => {
    const files = $files.value;

    if (!files) {
      return;
    }

    const abortController = new AbortController();

    Promise.all([...files].map((file) => encodePngImage(file, 1024)))
      .then((images) => {
        if (!abortController.signal.aborted) {
          $images.value = images;
        }
      })
      .catch(() => {
        if (!abortController.signal.aborted) {
          $error.value = true;
        }
      });

    return () => abortController.abort();
  });

  return (
    <Container grow={true}>
      <input
        accept="image/*"
        class={$error.value ? fileInputStyleError : fileInputStyle}
        multiple={true}
        onChange={(event) =>
          batch(() => {
            $error.value = false;
            $files.value = (event.target as HTMLInputElement).files ?? undefined;
          })
        }
        ref={elementRef}
        tabIndex={0}
        type="file"
      />

      <Button
        disabled={!$files.value}
        onClick={() => {
          if (elementRef.current) {
            elementRef.current.value = "";
          }

          batch(() => {
            $images.value = [];
            $error.value = false;
            $files.value = undefined;
          });
        }}
        title="Clear Image"
      >
        <SvgIcon data={SvgIcon.backspaceData} />
      </Button>
    </Container>
  );
};
