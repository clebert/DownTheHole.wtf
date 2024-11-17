import { type Signal, signal, useSignalEffect } from "@preact/signals";
import { createContext } from "preact";
import { boolean } from "zod";
import { loadJson } from "../utils/load-json.js";
import { saveJson } from "../utils/save-json.js";

export class Settings {
  static readonly Context = createContext(new Settings());

  readonly $zenMode: Signal<boolean>;

  constructor() {
    this.$zenMode = signal(loadJson(boolean(), "settings-zen-mode", false));
  }

  reset(): void {
    this.$zenMode.value = false;

    localStorage.removeItem("settings-zen-mode");
  }

  useSignalEffects(): void {
    // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
    useSignalEffect(() => {
      saveJson("settings-zen-mode", this.$zenMode.value);
    });
  }
}
