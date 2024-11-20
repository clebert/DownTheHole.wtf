import { batch, useSignal, useSignalEffect } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { useContext, useRef } from "preact/hooks";
import { Chat } from "../contexts/chat.js";
import { fileInputStyle } from "../styles.js";
import { encodePngImage } from "../utils/encode-png-image.js";
import { tw } from "../utils/tw.js";
import { Button } from "./button.js";
import { Container } from "./container.js";
import { TrashIcon } from "./icons.js";

export const ImageInput: FunctionComponent = () => {
  const chat = useContext(Chat.Context);
  const elementRef = useRef<HTMLInputElement>(null);
  const $error = useSignal(false);
  const $files = useSignal<FileList>();

  useSignalEffect(() => {
    if (chat.$images.value.length === 0) {
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
          chat.$images.value = images;
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
    <Container>
      <Container grow={true}>
        <input
          accept="image/*"
          capture="environment"
          class={tw($error.value && "border-rose-500 dark:border-rose-500", fileInputStyle)}
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
      </Container>

      <Container col={true}>
        <Button
          disabled={!$files.value}
          onClick={() => {
            if (elementRef.current) {
              elementRef.current.value = "";
            }

            batch(() => {
              chat.$images.value = [];
              $error.value = false;
              $files.value = undefined;
            });
          }}
          title="Delete"
        >
          <TrashIcon />
        </Button>
      </Container>
    </Container>
  );
};
