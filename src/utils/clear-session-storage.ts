import { sessionStorageKeys } from "#constants/session-storage-keys.js";

export function clearSessionStorage(): void {
  for (const key of sessionStorageKeys) {
    sessionStorage.removeItem(key);
  }
}
