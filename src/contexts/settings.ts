import { type Signal, signal, useSignalEffect } from "@preact/signals";
import { createContext } from "preact";
import { boolean } from "zod";
import { loadJson } from "../utils/load-json.js";
import { saveJson } from "../utils/save-json.js";

const showApiKey = { defaultValue: true, key: "settings-show-api-key" };

export class Settings {
  static readonly Context = createContext(new Settings());

  readonly $showApiKey: Signal<boolean>;

  constructor() {
    this.$showApiKey = signal(loadJson(boolean(), showApiKey.key, showApiKey.defaultValue));
  }

  reset(): void {
    this.$showApiKey.value = showApiKey.defaultValue;

    localStorage.removeItem(showApiKey.key);
  }

  useSignalEffects(): void {
    // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
    useSignalEffect(() => {
      saveJson(showApiKey.key, this.$showApiKey.value);
    });
  }
}
