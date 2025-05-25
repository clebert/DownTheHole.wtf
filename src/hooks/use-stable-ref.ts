import { useRef } from "preact/hooks";

export function useStableRef(value: unknown): void {
  if (import.meta.env.PROD) {
    return;
  }

  // biome-ignore lint/correctness/useHookAtTopLevel: false positive
  const valueRef = useRef(value);

  if (!Object.is(value, valueRef.current)) {
    throw new Error("Value reference changed between renders, expected stable identity.");
  }
}
