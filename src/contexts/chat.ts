import type { Signal } from "@preact/signals";
import { signal } from "@preact/signals";
import { createContext } from "preact";

export type Message = AssistantMessage | UserMessage;

export interface AssistantMessage {
  readonly role: "assistant";
  readonly id: string;
  readonly $content: Signal<string>;
  readonly $finished: Signal<boolean>;
}

export interface UserMessage {
  readonly role: "user";
  readonly id: string;
  readonly $content: Signal<string>;
}

export const Chat = createContext<Signal<readonly Message[]>>(signal([]));
