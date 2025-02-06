import { type Signal, signal, useSignalEffect } from "@preact/signals";
import { createContext } from "preact";
import { boolean } from "zod";
import { loadJson } from "../utils/load-json.js";
import { saveJson } from "../utils/save-json.js";

const showProviderConfig = { defaultValue: true, key: "settings-show-provider-config" };

export class Settings {
  static readonly Context = createContext(new Settings());

  readonly $showProviderConfig: Signal<boolean>;

  constructor() {
    this.$showProviderConfig = signal(
      loadJson(boolean(), showProviderConfig.key, showProviderConfig.defaultValue),
    );
  }

  reset(): void {
    this.$showProviderConfig.value = showProviderConfig.defaultValue;

    localStorage.removeItem(showProviderConfig.key);
  }

  useSignalEffects(): void {
    // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
    useSignalEffect(() => {
      saveJson(showProviderConfig.key, this.$showProviderConfig.value);
    });
  }
}
