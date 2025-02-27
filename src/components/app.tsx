import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { Chat } from "../contexts/chat.js";
import { Settings } from "../contexts/settings.js";
import { useAssistantReply } from "../hooks/use-assistant-reply.js";
import { useUserReply } from "../hooks/use-user-reply.js";
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
  const chat = useContext(Chat.Context);
  const settings = useContext(Settings.Context);

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
            onInput={(chatModelId) => settings.setChatModelId(chatModelId)}
            title="Model ID"
            value={settings.$chatModelId.value}
          />
        </Container>

        <ThinkingButton />
      </Container>

      {settings.$showSettings.value && settings.$providerName.value !== "ollama" && (
        <Container grow={true}>
          <TextField
            onInput={(apiKey) => settings.setApiKey(apiKey)}
            title="API Key"
            value={settings.$apiKey.value}
          />

          <Button
            disabled={!settings.$apiKey.value}
            onClick={() => settings.setApiKey("")}
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
