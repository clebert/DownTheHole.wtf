import type { Schema } from "zod";

export function loadJson<TValue>(
  schema: Schema<TValue>,
  key: string,
  defaultValue: TValue,
): TValue {
  const data = localStorage.getItem(key);

  if (data === null) {
    return defaultValue;
  }

  try {
    return schema.parse(JSON.parse(data));
  } catch {
    return defaultValue;
  }
}
