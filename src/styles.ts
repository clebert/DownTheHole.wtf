import { tw } from "./utils/tw.js";

// Background Styles

const backgroundStyle = tw("bg-white dark:bg-slate-900");

document.body.classList.add(...backgroundStyle.split(" "));

const backgroundStyleInteractive = tw(
  backgroundStyle,
  "enabled:active:bg-slate-900 dark:enabled:active:bg-white",
);

const backgroundStyleInverted = tw("bg-slate-900 dark:bg-white");

const backgroundStyleInvertedInteractive = tw(
  backgroundStyleInverted,
  "enabled:active:bg-white dark:enabled:active:bg-slate-900",
);

const backgroundStyleTinted = tw("bg-slate-100 dark:bg-slate-800");

const backgroundStyleTintedInteractive = tw(
  backgroundStyleTinted,
  "enabled:active:bg-slate-800 dark:enabled:active:bg-slate-100",
);

// Border Styles

const borderStyle = tw("border border-slate-300 dark:border-slate-700");

export const borderStyleError = tw("border-rose-300 focus:outline-rose-400 dark:border-rose-700");

// Caret Style

const caretStyle = "caret-transparent focus:caret-blue-400";

// Focus Style

const focusStyle = tw(
  "focus:outline focus:outline-1 focus:outline-blue-400 focus:outline-offset-[-1px]",
);

// Placeholder Style

const placeholderStyle = tw("placeholder-slate-400");

// Text Styles

const textStyle = tw("text-black dark:text-white");

const textStyleInteractive = tw(
  textStyle,
  "enabled:active:text-white dark:enabled:active:text-black",
);

const textStyleInverted = tw("text-white dark:text-black");

const textStyleInvertedInteractive = tw(
  textStyleInverted,
  "enabled:active:text-black dark:enabled:active:text-white",
);

// Element Styles

export const buttonStyle = tw(
  "select-none whitespace-nowrap px-2 disabled:opacity-25",
  backgroundStyleInteractive,
  borderStyle,
  focusStyle,
  textStyleInteractive,
);

export const buttonStyleInverted = tw(
  "select-none whitespace-nowrap px-2 disabled:opacity-25",
  backgroundStyleInvertedInteractive,
  borderStyle,
  focusStyle,
  textStyleInvertedInteractive,
);

export const fileInputStyle = tw(
  "w-full rounded-none pr-2 font-mono",
  backgroundStyleTintedInteractive,
  borderStyle,
  focusStyle,
  textStyleInteractive,

  "file:px-2 file:py-0 file:font-sans",
  "file:bg-slate-100 file:dark:bg-slate-800",
  "file:enabled:active:bg-slate-800 file:dark:enabled:active:bg-slate-100",
  "file:border-0",
  "file:text-black file:dark:text-white",
  "file:enabled:active:text-white file:dark:enabled:active:text-black",
);

export const textAreaStyle = tw(
  "min-h-32 w-full whitespace-break-spaces break-words px-2 font-mono",
  backgroundStyleTinted,
  borderStyle,
  caretStyle,
  focusStyle,
  textStyle,
);

export const textInputStyle = tw(
  "w-full rounded-none px-2 font-mono",
  backgroundStyleTinted,
  borderStyle,
  caretStyle,
  focusStyle,
  placeholderStyle,
  textStyle,
);
