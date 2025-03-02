import type { FunctionComponent } from "preact";
import { useAssistantReply } from "../hooks/use-assistant-reply.js";
import { useUserReply } from "../hooks/use-user-reply.js";
import { apiKeySelector } from "../signals/api-key-selector.js";
import { $chatMessages } from "../signals/chat-messages.js";
import { chatModelIdSelector } from "../signals/chat-model-id-selector.js";
import { $providerName } from "../signals/provider-name.js";
import { $settingsVisible } from "../signals/settings-visible.js";
import { Button } from "./button.js";
import { Container } from "./container.js";
import { ImageInput } from "./image-input.js";
import { MessageView } from "./message-view.js";
import { Page } from "./page.js";
import { ProviderButton } from "./provider-button.js";
import { ResetButton } from "./reset-button.js";
import { SettingsButton } from "./settings-button.js";
import { SvgIcon } from "./svg-icon.js";
import { TextField } from "./text-field.js";
import { ThinkingButton } from "./thinking-button.js";

export const App: FunctionComponent = () => {
  const apiKey = apiKeySelector.$output.value;
  const chatModelId = chatModelIdSelector.$output.value;

  useAssistantReply();
  useUserReply();

  return (
    <Page>
      <Container>
        <Container grow={true}>
          <ResetButton />
          <ProviderButton />
          <SettingsButton />

          <TextField
            onInput={(chatModelId) => chatModelIdSelector.set(chatModelId)}
            title="Model ID"
            value={chatModelId}
          />
        </Container>

        <ThinkingButton />
      </Container>

      {$settingsVisible.value && $providerName.value !== "ollama" && (
        <Container grow={true}>
          <TextField
            onInput={(apiKey) => apiKeySelector.set(apiKey)}
            title="API Key"
            value={apiKey}
          />

          <Button disabled={!apiKey} onClick={() => apiKeySelector.set("")} title="Clear API Key">
            <SvgIcon data={SvgIcon.backspaceData} />
          </Button>
        </Container>
      )}

      <ImageInput />

      {$chatMessages.value.map((chatMessage) => (
        <MessageView key={chatMessage.id} chatMessage={chatMessage} />
      ))}
    </Page>
  );
};
