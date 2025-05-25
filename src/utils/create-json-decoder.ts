import type { ZodMiniType } from "zod/v4-mini";
import type { Decoder } from "#hooks/use-storage.js";

export function createJsonDecoder<TValue>(schema: ZodMiniType<TValue>): Decoder<TValue> {
  return (data) => {
    try {
      const result = schema.safeParse(JSON.parse(data));

      return result.success ? result.data : undefined;
    } catch {
      return;
    }
  };
}
