import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Ai } from "../contexts/ai.js";
import { Chat } from "../contexts/chat.js";
import { Settings } from "../contexts/settings.js";
import { useAssistantReply } from "../hooks/use-assistant-reply.js";
import { useUserReply } from "../hooks/use-user-reply.js";
import { ApiKeyField } from "./api-key-field.js";
import { ChatModelIdField } from "./chat-model-id-field.js";
import { Container } from "./container.js";
import { MessageView } from "./message-view.js";
import { Page } from "./page.js";
import { ProviderButton } from "./provider-button.js";
import { ResetButton } from "./reset-button.js";
import { ZenModeButton } from "./zen-mode-button.js";

export const App: FunctionComponent = () => {
  const ai = useContext(Ai.Context);
  const chat = useContext(Chat.Context);
  const settings = useContext(Settings.Context);

  ai.useSignalEffects();
  settings.useSignalEffects();
  useAssistantReply();
  useUserReply();

  const zenMode = settings.$zenMode.value;

  return (
    <Page>
      <Container col={true}>
        <Container>
          <ResetButton />
          <ZenModeButton />
          {!zenMode && <ProviderButton />}
        </Container>

        {!zenMode && (
          <Container grow={true}>
            <ChatModelIdField />
          </Container>
        )}

        {!zenMode && ai.$providerName.value !== "ollama" && (
          <Container grow={true}>
            <ApiKeyField />
          </Container>
        )}
      </Container>

      {chat.$messages.value.map((message) => (
        <MessageView key={message.id} message={message} />
      ))}
    </Page>
  );
};
