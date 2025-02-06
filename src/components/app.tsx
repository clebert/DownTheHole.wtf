import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Ai } from "../contexts/ai.js";
import { Chat } from "../contexts/chat.js";
import { Settings } from "../contexts/settings.js";
import { useAssistantReply } from "../hooks/use-assistant-reply.js";
import { useUserReply } from "../hooks/use-user-reply.js";
import { ApiKeyButton } from "./api-key-button.js";
import { Button } from "./button.js";
import { Container } from "./container.js";
import { ImageInput } from "./image-input.js";
import { MessageView } from "./message-view.js";
import { Page } from "./page.js";
import { ProviderButton } from "./provider-button.js";
import { ResetButton } from "./reset-button.js";
import { SvgIcon } from "./svg-icon.js";
import { TextField } from "./text-field.js";

export const App: FunctionComponent = () => {
  const ai = useContext(Ai.Context);
  const chat = useContext(Chat.Context);
  const settings = useContext(Settings.Context);

  ai.useSignalEffects();
  settings.useSignalEffects();
  useAssistantReply();
  useUserReply();

  return (
    <Page>
      <Container>
        <Container grow={true}>
          <ResetButton />
          <ProviderButton />
          {ai.$providerName.value !== "ollama" && <ApiKeyButton />}

          <TextField
            $content={ai.$chatModelId}
            id={`model-id-${ai.$providerName.value}`}
            title="Model ID"
          />
        </Container>

        <Button
          disabled={!ai.$chatModelId.value}
          onClick={() => {
            ai.$chatModelId.value = "";
          }}
          title="Clear Model ID"
        >
          <SvgIcon data={SvgIcon.backspaceData} />
        </Button>
      </Container>

      {settings.$showApiKey.value && ai.$providerName.value !== "ollama" && (
        <Container grow={true}>
          <TextField
            $content={ai.$apiKey}
            id={`api-key-${ai.$providerName.value}`}
            title="API Key"
          />

          <Button
            disabled={!ai.$apiKey.value}
            onClick={() => {
              ai.$apiKey.value = "";
            }}
            title="Clear API Key"
          >
            <SvgIcon data={SvgIcon.backspaceData} />
          </Button>
        </Container>
      )}

      <ImageInput />

      {chat.$messages.value.map((message) => (
        <MessageView key={message.id} message={message} />
      ))}
    </Page>
  );
};
