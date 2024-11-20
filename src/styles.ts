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
const borderStyleError = tw("border border-rose-300 dark:border-rose-700");

// Caret Style

const caretStyle = "caret-transparent focus:caret-blue-400";
const caretStyleError = "caret-transparent focus:caret-rose-400";

// Focus Style

const focusStyleBase = tw("focus:outline focus:outline-1 focus:outline-offset-[-1px]");
const focusStyle = tw(focusStyleBase, "focus:outline-blue-400");
const focusStyleError = tw(focusStyleBase, "focus:outline-rose-400");

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

const createButtonStyle = (appearance?: "error") =>
  tw(
    "select-none whitespace-nowrap px-2 disabled:opacity-25",
    backgroundStyleInteractive,
    appearance === "error" ? borderStyleError : borderStyle,
    appearance === "error" ? focusStyleError : focusStyle,
    textStyleInteractive,
  );

export const buttonStyle = createButtonStyle();
export const buttonStyleError = createButtonStyle("error");

const createButtonStyleInverted = (appearance?: "error") =>
  tw(
    "select-none whitespace-nowrap px-2 disabled:opacity-25",
    backgroundStyleInvertedInteractive,
    appearance === "error" ? borderStyleError : borderStyle,
    appearance === "error" ? focusStyleError : focusStyle,
    textStyleInvertedInteractive,
  );

export const buttonStyleInverted = createButtonStyleInverted();
export const buttonStyleInvertedError = createButtonStyleInverted("error");

const createFileInputStyle = (appearance?: "error") =>
  tw(
    "w-full rounded-none pr-2 font-mono",
    backgroundStyleTintedInteractive,
    appearance === "error" ? borderStyleError : borderStyle,
    appearance === "error" ? focusStyleError : focusStyle,
    textStyleInteractive,

    "file:px-2 file:py-0 file:font-sans",
    "file:bg-slate-100 file:dark:bg-slate-800",
    "file:enabled:active:bg-slate-800 file:dark:enabled:active:bg-slate-100",
    "file:border-0",
    "file:text-black file:dark:text-white",
    "file:enabled:active:text-white file:dark:enabled:active:text-black",
  );

export const fileInputStyle = createFileInputStyle();
export const fileInputStyleError = createFileInputStyle("error");

const createTextAreaStyle = (appearance?: "error") =>
  tw(
    "min-h-32 w-full whitespace-break-spaces break-words px-2 font-mono",
    backgroundStyleTinted,
    appearance === "error" ? borderStyleError : borderStyle,
    appearance === "error" ? caretStyleError : caretStyle,
    appearance === "error" ? focusStyleError : focusStyle,
    textStyle,
  );

export const textAreaStyle = createTextAreaStyle();
export const textAreaStyleError = createTextAreaStyle("error");

const createTextInputStyle = (appearance?: "error") =>
  tw(
    "w-full rounded-none px-2 font-mono",
    backgroundStyleTinted,
    appearance === "error" ? borderStyleError : borderStyle,
    appearance === "error" ? caretStyleError : caretStyle,
    appearance === "error" ? focusStyleError : focusStyle,
    placeholderStyle,
    textStyle,
  );

export const textInputStyle = createTextInputStyle();
export const textInputStyleError = createTextInputStyle("error");
