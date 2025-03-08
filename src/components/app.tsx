import type { FunctionComponent } from "preact";
import { Button } from "#components/button.js";
import { Container } from "#components/container.js";
import { ImageButton } from "#components/image-button.js";
import { ImageInput } from "#components/image-input.js";
import { MessageView } from "#components/message-view.js";
import { Page } from "#components/page.js";
import { ProviderButton } from "#components/provider-button.js";
import { ResetButton } from "#components/reset-button.js";
import { SettingsButton } from "#components/settings-button.js";
import { SvgIcon } from "#components/svg-icon.js";
import { TextField } from "#components/text-field.js";
import { ThinkingButton } from "#components/thinking-button.js";
import { useAssistantReply } from "#hooks/use-assistant-reply.js";
import { useUserReply } from "#hooks/use-user-reply.js";
import { apiKeySelector } from "#signals/api-key-selector.js";
import { $chatMessages } from "#signals/chat-messages.js";
import { chatModelIdSelector } from "#signals/chat-model-id-selector.js";
import { $imageVisible } from "#signals/image-visible.js";
import { $providerName } from "#signals/provider-name.js";
import { $settingsVisible } from "#signals/settings-visible.js";

export const App: FunctionComponent = () => {
  const apiKey = apiKeySelector.$output.value;
  const chatModelId = chatModelIdSelector.$output.value;

  useAssistantReply();
  useUserReply();

  return (
    <Page>
      <Container grow={true}>
        <ResetButton />
        <ProviderButton />
        <SettingsButton />
        <ImageButton />
        <ThinkingButton />
      </Container>

      {$settingsVisible.value && (
        <Container grow={true}>
          <TextField
            appearance={chatModelId ? undefined : "error"}
            onInput={(chatModelId) => chatModelIdSelector.set(chatModelId)}
            title="Model ID"
            value={chatModelId}
          />

          <Button
            disabled={!chatModelId}
            onClick={() => chatModelIdSelector.set("")}
            title="Clear Model ID"
          >
            <SvgIcon data={SvgIcon.backspaceData} />
          </Button>
        </Container>
      )}

      {$settingsVisible.value && $providerName.value !== "ollama" && (
        <Container grow={true}>
          <TextField
            appearance={apiKey ? undefined : "error"}
            onInput={(apiKey) => apiKeySelector.set(apiKey)}
            title="API Key"
            value={apiKey}
          />

          <Button disabled={!apiKey} onClick={() => apiKeySelector.set("")} title="Clear API Key">
            <SvgIcon data={SvgIcon.backspaceData} />
          </Button>
        </Container>
      )}

      {$imageVisible.value && <ImageInput />}

      {$chatMessages.value.map((chatMessage) => (
        <MessageView key={chatMessage.id} chatMessage={chatMessage} />
      ))}
    </Page>
  );
};
