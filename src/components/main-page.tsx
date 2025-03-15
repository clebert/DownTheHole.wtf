import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
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
import { AppState } from "#contexts/app-state.js";
import { useAssistantReply } from "#hooks/use-assistant-reply.js";
import { useUserReply } from "#hooks/use-user-reply.js";

export const MainPage: FunctionComponent = () => {
  const {
    $apiKey,
    $chatMessages,
    $chatModelId,
    $imageInputVisible,
    $providerName,
    $settingsVisible,
  } = useContext(AppState);

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
            appearance={$chatModelId.value ? undefined : "error"}
            onInput={(chatModelId) => {
              $chatModelId.value = chatModelId;
            }}
            title="Model ID"
            value={$chatModelId.value}
          />

          <Button
            disabled={!$chatModelId.value}
            onClick={() => {
              $chatModelId.value = "";
            }}
            title="Clear Model ID"
          >
            <SvgIcon data={SvgIcon.backspaceData} />
          </Button>
        </Container>
      )}

      {$settingsVisible.value && $providerName.value !== "ollama" && (
        <Container grow={true}>
          <TextField
            appearance={$apiKey.value ? undefined : "error"}
            onInput={(apiKey) => {
              $apiKey.value = apiKey;
            }}
            title="API Key"
            value={$apiKey.value}
          />

          <Button
            disabled={!$apiKey.value}
            onClick={() => {
              $apiKey.value = "";
            }}
            title="Clear API Key"
          >
            <SvgIcon data={SvgIcon.backspaceData} />
          </Button>
        </Container>
      )}

      {$imageInputVisible.value && <ImageInput />}

      {$chatMessages.value.map((chatMessage) => (
        <MessageView key={chatMessage.id} chatMessage={chatMessage} />
      ))}
    </Page>
  );
};
