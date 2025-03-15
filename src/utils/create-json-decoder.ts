import type { Schema } from "zod";
import type { Decoder } from "#hooks/use-storage.js";

export function createJsonDecoder<TValue>(schema: Schema<TValue>): Decoder<TValue> {
  return (data) => {
    try {
      const result = schema.safeParse(JSON.parse(data));

      return result.success ? result.data : undefined;
    } catch {
      return undefined;
    }
  };
}
