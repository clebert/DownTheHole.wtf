export function setCaret(position: "end" | "start", node: Node): void {
  const range = document.createRange();

  range.selectNodeContents(node);
  range.collapse(position === "start");

  const selection = window.getSelection();

  selection?.removeAllRanges();
  selection?.addRange(range);
}
