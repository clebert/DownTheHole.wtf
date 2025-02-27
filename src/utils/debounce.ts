// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function debounce<TFunction extends (...args: any[]) => void>(
  func: TFunction,
  delay: number,
): (...args: Parameters<TFunction>) => void {
  let handle: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<TFunction>) => {
    if (handle !== undefined) {
      clearTimeout(handle);
    }

    handle = setTimeout(() => func(...args), delay);
  };
}
