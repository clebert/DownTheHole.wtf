import { type Signal, computed, signal } from "@preact/signals";
import type { Schema } from "zod";

export type Backend = Pick<globalThis.Storage, "getItem" | "removeItem" | "setItem">;

export abstract class Storage<TData extends object> {
  readonly $data = computed(() => this.#$data.value);
  readonly backend: Backend;

  readonly #$data: Signal<TData>;
  readonly #dataKey: string;
  readonly #defaultData: TData;

  constructor(backend: Backend, dataSchema: Schema<TData>, dataKey: string, defaultData: TData) {
    this.backend = backend;
    this.#$data = signal(this.#getData(dataSchema, dataKey, defaultData));
    this.#dataKey = dataKey;
    this.#defaultData = defaultData;
  }

  resetData(): void {
    this.backend.removeItem(this.#dataKey);

    this.#$data.value = this.#defaultData;
  }

  #handle: number | undefined;

  setData(data: TData): void {
    this.#$data.value = data;

    if (this.#handle !== undefined) {
      (window.cancelIdleCallback ?? clearTimeout)(this.#handle);
    }

    this.#handle = (window.requestIdleCallback ?? setTimeout)(() =>
      this.backend.setItem(this.#dataKey, JSON.stringify(this.#$data.peek())),
    );
  }

  #getData(dataSchema: Schema<TData>, dataKey: string, defaultData: TData): TData {
    const data = this.backend.getItem(dataKey);

    if (data === null) {
      return defaultData;
    }

    try {
      return dataSchema.parse(JSON.parse(data));
    } catch {
      return defaultData;
    }
  }
}
