export function tw(...classNames: readonly (false | null | string | undefined)[]): string {
  return classNames.filter(Boolean).join(" ");
}
