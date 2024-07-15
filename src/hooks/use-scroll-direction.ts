import { type Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export function useScrollDirection(): Signal<"down" | "up"> {
  const $scrollDirection = useSignal<"down" | "up">("down");

  useEffect(() => {
    const abortController = new AbortController();

    let lastScrollY = window.scrollY;

    window.addEventListener(
      "scroll",
      () => {
        const scrollY = window.scrollY;

        if (scrollY > lastScrollY) {
          $scrollDirection.value = "down";
        } else {
          $scrollDirection.value = "up";
        }

        lastScrollY = scrollY;
      },
      { signal: abortController.signal },
    );

    return () => abortController.abort();
  }, [$scrollDirection]);

  return $scrollDirection;
}
