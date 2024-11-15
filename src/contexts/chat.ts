import type { Signal } from "@preact/signals";
import { signal } from "@preact/signals";
import { createContext } from "preact";

export type Message = AssistantMessage | UserMessage;

export interface AssistantMessage {
  readonly $content: Signal<string>;
  readonly $finished: Signal<boolean>;
  readonly id: string;
  readonly role: "assistant";
}

export interface UserMessage {
  readonly $content: Signal<string>;
  readonly id: string;
  readonly role: "user";
}

export class Chat {
  static readonly Context = createContext(new Chat());

  readonly $messages: Signal<readonly Message[]> = signal([]);

  reset(): void {
    this.$messages.value = [];
  }
}
