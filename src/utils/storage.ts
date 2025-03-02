import type { Schema } from "zod";

export interface Init<TSchema extends Schema> {
  readonly backend: Backend;
  readonly key: string;
  readonly schema: TSchema;
}

export type Backend = Pick<globalThis.Storage, "getItem" | "removeItem" | "setItem">;

export class Storage<TSchema extends Schema> {
  static readonly #keys = new WeakMap<Backend, Set<string>>();

  static clear(backend: Backend): void {
    const keys = Storage.#keys.get(backend);

    if (keys) {
      for (const key of keys) {
        backend.removeItem(key);
      }
    }
  }

  readonly #init: Init<TSchema>;

  constructor(init: Init<TSchema>) {
    this.#init = init;

    const { backend, key } = init;
    const keys = Storage.#keys.get(backend) ?? new Set();

    keys.add(key);

    Storage.#keys.set(backend, keys);
  }

  get item(): (TSchema extends Schema<infer TItem> ? TItem : never) | undefined {
    const { backend, key, schema } = this.#init;
    const item = backend.getItem(key);

    if (item === null) {
      return undefined;
    }

    const result = schema.safeParse(JSON.parse(item));

    return result.success ? result.data : undefined;
  }

  #handle: number | undefined;

  set item(item: (TSchema extends Schema<infer TItem> ? TItem : never) | undefined) {
    if (this.#handle !== undefined) {
      (window.cancelIdleCallback ?? clearTimeout)(this.#handle);
    }

    const { backend, key } = this.#init;

    this.#handle = (window.requestIdleCallback ?? setTimeout)(() => {
      if (item === undefined) {
        backend.removeItem(key);
      } else {
        backend.setItem(key, JSON.stringify(item));
      }
    });
  }
}
