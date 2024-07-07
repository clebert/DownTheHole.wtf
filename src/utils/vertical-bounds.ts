export class VerticalBounds {
  static ofElement(element: HTMLElement): VerticalBounds | undefined {
    const viewport = window.visualViewport;

    if (!viewport) {
      return undefined;
    }

    const { top, bottom } = element.getBoundingClientRect();

    return new VerticalBounds(viewport, top, bottom);
  }

  static ofLastLine(textNode: Node): VerticalBounds | undefined {
    if (textNode.nodeType !== Node.TEXT_NODE) {
      throw new Error("not a text node");
    }

    const viewport = window.visualViewport;

    if (!viewport) {
      return undefined;
    }

    const range = document.createRange();
    const length = textNode.nodeValue?.length ?? 0;

    range.setStart(textNode, length);
    range.setEnd(textNode, length);

    const rect = range.getClientRects()[0];

    return rect ? new VerticalBounds(viewport, rect.top, rect.bottom) : undefined;
  }

  readonly top: number;
  readonly bottom: number;
  readonly isTopVisible: boolean;
  readonly isBottomVisible: boolean;

  constructor({ pageTop, height }: VisualViewport, top: number, bottom: number) {
    const pageBottom = pageTop + height;

    this.top = pageTop + top;
    this.bottom = pageTop + bottom;
    this.isTopVisible = this.top >= pageTop && this.top < pageBottom;
    this.isBottomVisible = this.bottom <= pageBottom && this.bottom > pageTop;
  }

  get isFullyVisible(): boolean {
    return this.isTopVisible && this.isBottomVisible;
  }

  get isPartlyVisible(): boolean {
    return this.isTopVisible || this.isBottomVisible;
  }

  scrollIntoView(): void {
    window.scrollTo({ top: this.top, behavior: "instant" });
  }
}
