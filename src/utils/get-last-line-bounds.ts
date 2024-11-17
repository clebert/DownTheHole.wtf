export interface VerticalBounds {
  readonly pageBottom: number;
  readonly pageTop: number;
  readonly visible: boolean;
}

export function getLastLineBounds(textNode: Node): VerticalBounds | undefined {
  if (textNode.nodeType !== Node.TEXT_NODE) {
    throw new TypeError("The argument must be a text node.");
  }

  const range = document.createRange();
  const length = textNode.nodeValue?.length ?? 0;

  range.setStart(textNode, length);
  range.setEnd(textNode, length);

  const clientRect = range.getClientRects()[0];

  if (!clientRect) {
    return undefined;
  }

  const { visualViewport } = window;
  const viewportHeight = visualViewport?.height ?? window.innerHeight;
  const viewportPageTop = visualViewport?.pageTop ?? window.scrollY;

  return {
    pageBottom: viewportPageTop + clientRect.bottom,
    pageTop: viewportPageTop + clientRect.top,
    visible: clientRect.top >= 0 && clientRect.bottom < viewportHeight,
  };
}
