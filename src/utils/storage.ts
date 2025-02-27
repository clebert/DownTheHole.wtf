import { type Signal, computed, signal } from "@preact/signals";
import type { Schema } from "zod";
import { loadJson } from "./load-json.js";
import { saveJson } from "./save-json.js";

export abstract class Storage<Data extends object> {
  readonly #dataKey: string;
  readonly #defaultData: Data;
  readonly #$data: Signal<Data>;

  readonly $data = computed(() => this.#$data.value);

  constructor(dataSchema: Schema<Data>, dataKey: string, defaultData: Data) {
    this.#dataKey = dataKey;
    this.#defaultData = defaultData;
    this.#$data = signal(loadJson(dataSchema, dataKey, defaultData));
  }

  resetData(): void {
    localStorage.removeItem(this.#dataKey);

    this.#$data.value = this.#defaultData;
  }

  #handle: number | undefined;

  setData(data: Data): void {
    this.#$data.value = data;

    if (this.#handle !== undefined) {
      (window.cancelIdleCallback ?? clearTimeout)(this.#handle);
    }

    this.#handle = (window.requestIdleCallback ?? setTimeout)(() =>
      saveJson(this.#dataKey, this.#$data.peek()),
    );
  }
}
