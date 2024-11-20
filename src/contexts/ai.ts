import { type Signal, batch, signal, useSignalEffect } from "@preact/signals";
import { createContext } from "preact";
import { type TypeOf, literal, string, union } from "zod";
import { loadJson } from "../utils/load-json.js";
import { saveJson } from "../utils/save-json.js";

export interface AiInit {
  readonly defaultChatModelIds: Readonly<{
    anthropic: string;
    mistral: string;
    ollama: string;
    openai: string;
  }>;

  readonly defaultProviderName: ProviderName;
}

export type ProviderName = TypeOf<typeof ProviderName>;

export const ProviderName = union([
  literal("anthropic"),
  literal("mistral"),
  literal("ollama"),
  literal("openai"),
]);

const providerNames: ProviderName[] = ["anthropic", "mistral", "ollama", "openai"];

export class Ai {
  static readonly Context = createContext(
    new Ai({
      defaultChatModelIds: {
        anthropic: "claude-3-5-sonnet-latest",
        mistral: "pixtral-large-latest",
        ollama: "qwen2.5-coder:32b",
        openai: "gpt-4o",
      },

      defaultProviderName: "anthropic",
    }),
  );

  readonly $apiKey: Signal<string>;
  readonly $chatModelId: Signal<string>;
  readonly $providerName: Signal<ProviderName>;

  constructor(readonly init: AiInit) {
    const { defaultChatModelIds, defaultProviderName } = init;
    const providerName = loadJson(ProviderName, "ai-provider-name", defaultProviderName);
    const apiKey = loadJson(string(), `ai-api-key-${providerName}`, "");

    const chatModelId = loadJson(
      string(),
      `ai-chat-model-id-${providerName}`,
      defaultChatModelIds[providerName],
    );

    this.$apiKey = signal(apiKey);
    this.$chatModelId = signal(chatModelId);
    this.$providerName = signal(providerName);
  }

  reset(): void {
    const { defaultChatModelIds, defaultProviderName } = this.init;

    batch(() => {
      this.$apiKey.value = "";
      this.$chatModelId.value = defaultChatModelIds[defaultProviderName];
      this.$providerName.value = defaultProviderName;
    });

    for (const providerName of providerNames) {
      localStorage.removeItem(`ai-api-key-${providerName}`);
      localStorage.removeItem(`ai-chat-model-id-${providerName}`);
    }

    localStorage.removeItem("ai-provider-name");
  }

  useSignalEffects(): void {
    // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
    useSignalEffect(() => {
      saveJson(`ai-api-key-${this.$providerName.peek()}`, this.$apiKey.value);
    });

    // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
    useSignalEffect(() => {
      saveJson(`ai-chat-model-id-${this.$providerName.peek()}`, this.$chatModelId.value);
    });

    // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
    useSignalEffect(() => {
      const providerName = this.$providerName.value;

      saveJson("ai-provider-name", providerName);

      batch(() => {
        this.$apiKey.value = loadJson(string(), `ai-api-key-${providerName}`, "");

        this.$chatModelId.value = loadJson(
          string(),
          `ai-chat-model-id-${providerName}`,
          this.init.defaultChatModelIds[providerName],
        );
      });
    });
  }
}
