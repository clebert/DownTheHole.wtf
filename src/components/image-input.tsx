import { batch, useSignal, useSignalEffect } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useContext, useEffect, useRef } from "preact/hooks";
import { Button } from "#components/button.js";
import { Container } from "#components/container.js";
import { SvgIcon } from "#components/svg-icon.js";
import { fileInputStyle, fileInputStyleError } from "#constants/styles.js";
import { AppState } from "#contexts/app-state.js";
import { createPngImage } from "#utils/create-png-image.js";

export const ImageInput: FunctionComponent = () => {
  const { $images } = useContext(AppState);
  const elementRef = useRef<HTMLInputElement>(null);
  const $error = useSignal(false);
  const $files = useSignal<FileList>();

  useEffect(
    () => () => {
      $images.value = [];
    },
    [$images],
  );

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

    Promise.all([...files].map((file) => createPngImage(file, 1024)))
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
