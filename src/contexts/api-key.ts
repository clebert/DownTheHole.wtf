import { signal } from "@preact/signals";
import { createContext } from "preact";

export const ApiKey = createContext(signal(""));
