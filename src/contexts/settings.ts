import { computed } from "@preact/signals";
import { createContext } from "preact";
import type { DeepReadonly } from "ts-essentials";
import { type TypeOf, boolean, object, string } from "zod";
import { Storage } from "../utils/storage.js";

export type Data = DeepReadonly<TypeOf<typeof Data>>;
export type ProviderName = TypeOf<typeof ProviderName>;

const ProviderConfig = object({ apiKey: string(), chatModelId: string() });

const ProviderConfigs = object({
  anthropic: ProviderConfig,
  mistral: ProviderConfig,
  ollama: ProviderConfig,
  openai: ProviderConfig,
});

const ProviderName = ProviderConfigs.keyof();

const Data = object({
  providerConfigs: ProviderConfigs,
  providerName: ProviderName,
  showSettings: boolean(),
  thinkingEnabled: boolean(),
});

export class Settings extends Storage<Data> {
  static readonly Context = createContext(
    new Settings({
      providerConfigs: {
        anthropic: { apiKey: "", chatModelId: "claude-3-7-sonnet-latest" },
        mistral: { apiKey: "", chatModelId: "pixtral-large-latest" },
        ollama: { apiKey: "", chatModelId: "qwen2.5-coder:32b" },
        openai: { apiKey: "", chatModelId: "gpt-4o" },
      },

      providerName: "anthropic",
      showSettings: true,
      thinkingEnabled: false,
    }),
  );

  readonly $apiKey = computed(
    () => this.$data.value.providerConfigs[this.$data.value.providerName].apiKey,
  );

  readonly $chatModelId = computed(
    () => this.$data.value.providerConfigs[this.$data.value.providerName].chatModelId,
  );

  readonly $providerName = computed(() => this.$data.value.providerName);
  readonly $showSettings = computed(() => this.$data.value.showSettings);
  readonly $thinkingEnabled = computed(() => this.$data.value.thinkingEnabled);

  constructor(defaultData: Data) {
    super(localStorage, Data, "settings-data", defaultData);
  }

  override resetData(): void {
    super.resetData();

    this.backend.removeItem("ai-api-key-anthropic"); // legacy
    this.backend.removeItem("ai-api-key-mistral"); // legacy
    this.backend.removeItem("ai-api-key-ollama"); // legacy
    this.backend.removeItem("ai-api-key-openai"); // legacy
    this.backend.removeItem("ai-data"); // legacy
  }

  setApiKey(apiKey: string): void {
    const data = this.$data.peek();

    this.setData({
      ...data,

      providerConfigs: {
        ...data.providerConfigs,
        [data.providerName]: { ...data.providerConfigs[data.providerName], apiKey },
      },
    });
  }

  setChatModelId(chatModelId: string): void {
    const data = this.$data.peek();

    this.setData({
      ...data,

      providerConfigs: {
        ...data.providerConfigs,
        [data.providerName]: { ...data.providerConfigs[data.providerName], chatModelId },
      },
    });
  }

  setProviderName(providerName: ProviderName): void {
    const data = this.$data.peek();

    this.setData({ ...data, providerName });
  }

  toggleShowSettings(): void {
    const data = this.$data.peek();

    this.setData({ ...data, showSettings: !data.showSettings });
  }

  toggleThinkingEnabled(): void {
    const data = this.$data.peek();

    this.setData({ ...data, thinkingEnabled: !data.thinkingEnabled });
  }
}
