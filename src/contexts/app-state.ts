import type { Signal } from "@preact/signals";
import { createContext } from "preact";
import type { ProviderName } from "#constants/provider-names.js";
import { createFakeContextObject } from "#utils/create-fake-context-object.js";

export interface AppState {
  readonly $apiKey: Signal<string>;
  readonly $chatMessages: Signal<readonly ChatMessage[]>;
  readonly $chatModelId: Signal<string>;
  readonly $imageInputVisible: Signal<boolean>;
  readonly $images: Signal<readonly ArrayBuffer[]>;
  readonly $providerName: Signal<ProviderName>;
  readonly $settingsVisible: Signal<boolean>;
  readonly $thinkingEnabled: Signal<boolean>;
}

export type ChatMessage = AssistantChatMessage | UserChatMessage;

export interface AssistantChatMessage {
  readonly $content: Signal<string>;
  readonly $finished: Signal<boolean>;
  readonly $reasoning: Signal<string | undefined>;
  readonly id: string;
  readonly role: "assistant";
}

export interface UserChatMessage {
  readonly $content: Signal<string>;
  readonly id: string;
  readonly role: "user";
}

export const AppState = createContext(createFakeContextObject<AppState>("AppState"));
