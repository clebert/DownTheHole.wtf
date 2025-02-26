import { computed } from "@preact/signals";
import { createContext } from "preact";
import { type TypeOf, object, string } from "zod";
import { Storage } from "../utils/storage.js";

export type Data = TypeOf<typeof Data>;
export type ProviderName = TypeOf<typeof ProviderName>;

const ProviderConfig = object({ apiKey: string(), chatModelId: string() });

const ProviderConfigs = object({
  anthropic: ProviderConfig.readonly(),
  mistral: ProviderConfig.readonly(),
  ollama: ProviderConfig.readonly(),
  openai: ProviderConfig.readonly(),
});

const ProviderName = ProviderConfigs.keyof();

const Data = object({
  providerConfigs: ProviderConfigs.readonly(),
  providerName: ProviderName,
});

export class Ai extends Storage<Data> {
  static readonly Context = createContext(
    new Ai({
      providerConfigs: {
        anthropic: { apiKey: "", chatModelId: "claude-3-7-sonnet-latest" },
        mistral: { apiKey: "", chatModelId: "pixtral-large-latest" },
        ollama: { apiKey: "", chatModelId: "qwen2.5-coder:32b" },
        openai: { apiKey: "", chatModelId: "gpt-4o" },
      },

      providerName: "anthropic",
    }),
  );

  readonly $apiKey = computed(
    () => this.$data.value.providerConfigs[this.$data.value.providerName].apiKey,
  );

  readonly $chatModelId = computed(
    () => this.$data.value.providerConfigs[this.$data.value.providerName].chatModelId,
  );

  readonly $providerName = computed(() => this.$data.value.providerName);

  constructor(defaultData: Data) {
    super(Data, "ai-data", defaultData);
  }

  override resetData(): void {
    super.resetData();

    localStorage.removeItem("ai-api-key-anthropic"); // legacy
    localStorage.removeItem("ai-api-key-mistral"); // legacy
    localStorage.removeItem("ai-api-key-ollama"); // legacy
    localStorage.removeItem("ai-api-key-openai"); // legacy
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
}
