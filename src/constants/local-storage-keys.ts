import { providerNames } from "#constants/provider-names.js";

export type LocalStorageKey = (typeof localStorageKeys)[number];

export const localStorageKeys = [
  ...providerNames.flatMap(
    (providerName) => [`${providerName}ApiKey`, `${providerName}ChatModelId`] as const,
  ),

  "imageInputVisible",
  "providerName",
  "settingsVisible",
  "thinkingEnabled",
] as const;
