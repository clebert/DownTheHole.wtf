import { type ReadonlySignal, type Signal, useSignalEffect } from "@preact/signals";

export interface UseContentObserverProps {
  readonly $content: Signal<string>;
  readonly $element: ReadonlySignal<HTMLElement | undefined>;
}

export function useContentObserver({ $content, $element }: UseContentObserverProps): void {
  useSignalEffect(() => {
    const element = $element.value;

    if (!element) {
      return;
    }

    $content.value = element.textContent ?? "";

    const observer = new MutationObserver(() => {
      $content.value = element.textContent ?? "";
    });

    observer.observe(element, { characterData: true, childList: true, subtree: true });

    return () => observer.disconnect();
  });
}
