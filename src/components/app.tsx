import { createOpenAI } from "@ai-sdk/openai";
import { useComputed, useSignal, useSignalEffect } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { ApiKey } from "../contexts/api-key.js";
import { Chat, type Message } from "../contexts/chat.js";
import { useAssistantReply } from "../hooks/use-assistant-reply.js";
import { useUserReply } from "../hooks/use-user-reply.js";
import { createMessage } from "../utils/create-message.js";
import { ApiKeyField } from "./api-key-field.js";
import { Container } from "./container.js";
import { MessageView } from "./message-view.js";
import { Page } from "./page.js";
import { ResetButton } from "./reset-button.js";

export const App: FunctionComponent = () => {
  const $apiKey = useSignal(localStorage.getItem("openai-api-key") ?? "");

  useSignalEffect(() => {
    localStorage.setItem("openai-api-key", $apiKey.value);
  });

  const $model = useComputed(() =>
    createOpenAI({ apiKey: $apiKey.value, compatibility: "strict" })("gpt-4o"),
  );

  const $chat = useSignal<readonly Message[]>([createMessage("user", "")]);

  useAssistantReply({ $chat, $model });
  useUserReply({ $chat });

  return (
    <ApiKey.Provider value={$apiKey}>
      <Chat.Provider value={$chat}>
        <Page>
          <Container>
            <Container col={true} grow={true}>
              <ApiKeyField />
            </Container>

            <Container col={true}>
              <ResetButton />
            </Container>
          </Container>

          {$chat.value.map((message) => (
            <MessageView key={message.id} message={message} />
          ))}
        </Page>
      </Chat.Provider>
    </ApiKey.Provider>
  );
};
