import { createOpenAI } from "@ai-sdk/openai";
import { useComputed, useSignal } from "@preact/signals";
import type { FunctionComponent } from "preact";
import { ApiKey } from "../contexts/api-key.js";
import { Chat, type Message } from "../contexts/chat.js";
import { useApiKeyStorage } from "../hooks/use-api-key-storage.js";
import { useLastAssistantMessage } from "../hooks/use-last-assistant-message.js";
import { useLastUserMessage } from "../hooks/use-last-user-message.js";
import { createMessage } from "../utils/create-message.js";
import { ApiKeyField } from "./api-key-field.js";
import { Container } from "./container.js";
import { MessageView } from "./message-view.js";
import { Page } from "./page.js";
import { ResetButton } from "./reset-button.js";

export const App: FunctionComponent = () => {
  const $chat = useSignal<readonly Message[]>([createMessage("user", "")]);
  const $apiKey = useApiKeyStorage();

  const $model = useComputed(() =>
    createOpenAI({ apiKey: $apiKey.value, compatibility: "strict" })("gpt-4o"),
  );

  useLastAssistantMessage({ $chat, $model });
  useLastUserMessage({ $chat });

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
