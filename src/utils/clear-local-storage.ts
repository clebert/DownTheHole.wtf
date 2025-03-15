import { localStorageKeys } from "#constants/local-storage-keys.js";

export function clearLocalStorage(): void {
  for (const key of localStorageKeys) {
    localStorage.removeItem(key);
  }
}
