import type { FunctionComponent } from "preact";
import { tw } from "../utils/tw.js";

// https://heroicons.com
// Outline24x24, 1.5px stroke

export interface IconProps {
  readonly class?: string | undefined;
}

export const ArrowPathIcon: FunctionComponent<IconProps> = ({ class: className }) => (
  <SvgIcon
    class={className}
    data={[
      "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
    ]}
  />
);

export const CubeIcon: FunctionComponent<IconProps> = ({ class: className }) => (
  <SvgIcon
    class={className}
    data={["m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"]}
  />
);

export const CubeTransparentIcon: FunctionComponent<IconProps> = ({ class: className }) => (
  <SvgIcon
    class={className}
    data={[
      "m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25",
    ]}
  />
);

export const PaperAirplaneIcon: FunctionComponent<IconProps> = ({ class: className }) => (
  <SvgIcon
    class={className}
    data={[
      "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5",
    ]}
  />
);

export const PowerIcon: FunctionComponent<IconProps> = ({ class: className }) => (
  <SvgIcon class={className} data={["M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"]} />
);

export const TrashIcon: FunctionComponent<IconProps> = ({ class: className }) => (
  <SvgIcon
    class={className}
    data={[
      "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0",
    ]}
  />
);

export const XMarkIcon: FunctionComponent<IconProps> = ({ class: className }) => (
  <SvgIcon class={className} data={["M6 18 18 6M6 6l12 12"]} />
);

interface SvgIconProps {
  readonly class?: string | undefined;
  readonly data: readonly string[];
}

const SvgIcon: FunctionComponent<SvgIconProps> = ({ class: className, data }) => {
  return (
    <div class="inline-block h-5 align-middle">
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        class={tw(className, "size-4")}
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