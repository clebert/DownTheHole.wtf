import { type Signal, signal, useSignalEffect } from "@preact/signals";
import { createContext } from "preact";
import { boolean } from "zod";
import { loadJson } from "../utils/load-json.js";
import { saveJson } from "../utils/save-json.js";

const showApiKey = { defaultValue: true, key: "settings-show-api-key" };
const thinkingEnabled = { defaultValue: false, key: "settings-thinking-enabled" };

export class Settings {
  static readonly Context = createContext(new Settings());

  readonly $showApiKey: Signal<boolean>;
  readonly $thinkingEnabled: Signal<boolean>;

  constructor() {
    this.$showApiKey = signal(loadJson(boolean(), showApiKey.key, showApiKey.defaultValue));

    this.$thinkingEnabled = signal(
      loadJson(boolean(), thinkingEnabled.key, thinkingEnabled.defaultValue),
    );
  }

  reset(): void {
    this.$showApiKey.value = showApiKey.defaultValue;
    this.$thinkingEnabled.value = thinkingEnabled.defaultValue;

    localStorage.removeItem(showApiKey.key);
    localStorage.removeItem(thinkingEnabled.key);
  }

  useSignalEffects(): void {
    // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
    useSignalEffect(() => {
      saveJson(showApiKey.key, this.$showApiKey.value);
    });

    // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
    useSignalEffect(() => {
      saveJson(thinkingEnabled.key, this.$thinkingEnabled.value);
    });
  }
}
