import { useSignal } from "@preact/signals";
import { useMemo } from "preact/hooks";
import { defaultChatModelIds, defaultProviderName } from "#constants/defaults.js";
import type { AppState } from "#contexts/app-state.js";
import { useLocalStorage } from "#hooks/use-local-storage.js";
import { useSessionStorage } from "#hooks/use-session-storage.js";
import {
  decodeBoolean,
  decodeChatMessages,
  decodeProviderName,
  decodeString,
} from "#utils/decoders.js";
import { encodeChatMessages, encodeJson } from "#utils/encoders.js";

export function useAppState(): AppState {
  const $providerName = useLocalStorage(
    decodeProviderName,
    encodeJson,
    "providerName",
    defaultProviderName,
  );

  const providerName = $providerName.value;
  const $apiKey = useLocalStorage(decodeString, encodeJson, `${providerName}ApiKey`, "");

  const $chatMessages = useSessionStorage(
    decodeChatMessages,
    encodeChatMessages,
    "chatMessages",
    [],
  );

  const $chatModelId = useLocalStorage(
    decodeString,
    encodeJson,
    `${providerName}ChatModelId`,
    defaultChatModelIds[providerName],
  );

  const $imageInputVisible = useLocalStorage(decodeBoolean, encodeJson, "imageInputVisible", true);
  const $images = useSignal<readonly ArrayBuffer[]>([]);
  const $settingsVisible = useLocalStorage(decodeBoolean, encodeJson, "settingsVisible", true);
  const $thinkingEnabled = useLocalStorage(decodeBoolean, encodeJson, "thinkingEnabled", false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  return useMemo(
    () => ({
      $apiKey,
      $chatMessages,
      $chatModelId,
      $imageInputVisible,
      $images,
      $providerName,
      $settingsVisible,
      $thinkingEnabled,
    }),
    [],
  );
}
