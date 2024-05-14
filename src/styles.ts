import { tw } from "./utils/tw.js";

export const backgroundStyle = tw`bg-white dark:bg-gray-900`;
export const placeholderStyle = tw`placeholder-gray-400`;

const borderStyle = tw`border border-gray-300 dark:border-gray-700`;
const focusStyle = tw`focus:outline focus:outline-1 focus:outline-blue-400 focus:outline-offset-[-1px]`;

export const buttonStyle = [
  tw`bg-white enabled:active:bg-gray-900 dark:bg-gray-900 dark:enabled:active:bg-white`,
  tw`text-black enabled:active:text-white dark:text-white dark:enabled:active:text-black`,
  borderStyle,
  focusStyle,
].join(" ");

export const defaultButtonStyle = [
  tw`bg-gray-900 enabled:active:bg-white dark:bg-white dark:enabled:active:bg-gray-900`,
  tw`text-white enabled:active:text-black dark:text-black dark:enabled:active:text-white`,
  borderStyle,
  focusStyle,
].join(" ");

export const textAreaStyle = [
  tw`bg-gray-100 dark:bg-gray-800`,
  tw`text-black dark:text-white`,
  tw`caret-transparent focus:caret-blue-400`,
  borderStyle,
  focusStyle,
].join(" ");
