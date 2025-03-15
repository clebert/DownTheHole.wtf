import { array, boolean, object, string, z } from "zod";
import { providerNames } from "#constants/provider-names.js";
import type { ChatMessage } from "#contexts/app-state.js";
import { createChatMessage } from "#utils/create-chat-message.js";
import { createJsonDecoder } from "#utils/create-json-decoder.js";

export const decodeBoolean = createJsonDecoder(boolean());

const decodePlainChatMessages = createJsonDecoder(
  array(
    object({
      content: string(),
      reasoning: string().optional(),
      role: z.enum(["assistant", "user"]),
    }),
  ),
);

export function decodeChatMessages(data: string): ChatMessage[] {
  return (
    decodePlainChatMessages(data)?.map((message) =>
      createChatMessage({ ...message, finished: true }),
    ) ?? []
  );
}

export const decodeProviderName = createJsonDecoder(z.enum(providerNames));
export const decodeString = createJsonDecoder(string());
