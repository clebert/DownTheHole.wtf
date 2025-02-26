import { computed } from "@preact/signals";
import { createContext } from "preact";
import { type TypeOf, boolean, object } from "zod";
import { Storage } from "../utils/storage.js";

export type Data = TypeOf<typeof Data>;

const Data = object({ showApiKey: boolean(), thinkingEnabled: boolean() });

export class Settings extends Storage<Data> {
  static readonly Context = createContext(
    new Settings({ showApiKey: true, thinkingEnabled: false }),
  );

  readonly $showApiKey = computed(() => this.$data.value.showApiKey);
  readonly $thinkingEnabled = computed(() => this.$data.value.thinkingEnabled);

  constructor(defaultData: Data) {
    super(Data, "settings-data", defaultData);
  }

  toggleShowApiKey(): void {
    const data = this.$data.peek();

    this.setData({ ...data, showApiKey: !data.showApiKey });
  }

  toggleThinkingEnabled(): void {
    const data = this.$data.peek();

    this.setData({ ...data, thinkingEnabled: !data.thinkingEnabled });
  }
}
