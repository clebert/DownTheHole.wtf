import { tw } from "./utils/tw.js";

export const backgroundStyle = tw("bg-white dark:bg-slate-900");
export const placeholderStyle = tw("placeholder-slate-400");

const borderStyle = tw("border border-slate-300 dark:border-slate-700");

const focusStyle = tw(
  "focus:outline focus:outline-1 focus:outline-blue-400 focus:outline-offset-[-1px]",
);

export const buttonStyle = tw(
  "bg-white enabled:active:bg-slate-900 dark:bg-slate-900 dark:enabled:active:bg-white",
  "text-black enabled:active:text-white dark:text-white dark:enabled:active:text-black",
  borderStyle,
  focusStyle,
);

export const defaultButtonStyle = tw(
  "bg-slate-900 enabled:active:bg-white dark:bg-white dark:enabled:active:bg-slate-900",
  "text-white enabled:active:text-black dark:text-black dark:enabled:active:text-white",
  borderStyle,
  focusStyle,
);

export const textAreaStyle = tw(
  "bg-slate-100 text-black caret-transparent focus:caret-blue-400 dark:bg-slate-800 dark:text-white",
  borderStyle,
  focusStyle,
);
