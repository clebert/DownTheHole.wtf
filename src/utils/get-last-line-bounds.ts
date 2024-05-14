export interface VerticalBounds {
  readonly top: number;
  readonly bottom: number;
}

export function getLastLineBounds(textNode: Node): VerticalBounds | undefined {
  if (textNode.nodeType !== Node.TEXT_NODE) {
    throw new Error("not a text node");
  }

  const range = document.createRange();
  const length = textNode.nodeValue?.length ?? 0;

  range.setStart(textNode, length);
  range.setEnd(textNode, length);

  const rect = range.getClientRects()[0];

  return rect
    ? { top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY }
    : undefined;
}
