import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Ai } from "../contexts/ai.js";
import { Chat } from "../contexts/chat.js";
import { useAssistantReply } from "../hooks/use-assistant-reply.js";
import { useUserReply } from "../hooks/use-user-reply.js";
import { ApiKeyField } from "./api-key-field.js";
import { ChatModelIdField } from "./chat-model-id-field.js";
import { Container } from "./container.js";
import { MessageView } from "./message-view.js";
import { Page } from "./page.js";
import { ProviderButton } from "./provider-button.js";
import { ResetButton } from "./reset-button.js";

export const App: FunctionComponent = () => {
  const ai = useContext(Ai.Context);

  ai.useSignalEffects();
  useAssistantReply();
  useUserReply();

  const chat = useContext(Chat.Context);

  return (
    <Page>
      <Container col={true}>
        <Container>
          <ResetButton />
          <ProviderButton />
        </Container>

        <Container grow={true}>
          <ChatModelIdField />
        </Container>

        {ai.$providerName.value !== "ollama" ? (
          <Container grow={true}>
            <ApiKeyField />
          </Container>
        ) : null}
      </Container>

      {chat.$messages.value.map((message) => (
        <MessageView key={message.id} message={message} />
      ))}
    </Page>
  );
};
