import type { FunctionComponent } from "preact";
import { tw } from "../utils/tw.js";

// https://heroicons.com
// Outline24x24, 1.5px stroke

export interface SvgIconProps {
  readonly animation?: `animate-${string}` | undefined;
  readonly data: readonly string[];
}

export interface SvgIconData {
  readonly arrowPathData: readonly string[];
  readonly backspaceData: readonly string[];
  readonly eyeData: readonly string[];
  readonly eyeSlashData: readonly string[];
  readonly paperAirplaneData: readonly string[];
  readonly powerData: readonly string[];
  readonly trashData: readonly string[];
  readonly xMarkData: readonly string[];
}

const SvgIconComponent: FunctionComponent<SvgIconProps> = ({ animation, data }) => {
  return (
    <div class="inline-block h-5 align-middle">
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        class={tw("size-4", animation)}
        fill="none"
        stroke-width="1.5"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {data.map((d, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <path d={d} key={index} stroke-linecap="round" stroke-linejoin="round" />
        ))}
      </svg>
    </div>
  );
};

const svgIconData: SvgIconData = {
  arrowPathData: [
    "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
  ],

  backspaceData: [
    "M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z",
  ],

  eyeData: [
    "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z",
    "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  ],

  eyeSlashData: [
    "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88",
  ],

  paperAirplaneData: [
    "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5",
  ],

  powerData: ["M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"],

  trashData: [
    "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0",
  ],

  xMarkData: ["M6 18 18 6M6 6l12 12"],
};

export const SvgIcon = Object.assign(SvgIconComponent, svgIconData);
