export type SessionStorageKey = (typeof sessionStorageKeys)[number];

export const sessionStorageKeys = ["chatMessages"] as const;
