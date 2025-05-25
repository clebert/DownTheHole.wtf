import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// biome-ignore lint/style/noDefaultExport: Vite requires default export
export default defineConfig({ plugins: [tailwindcss()] });
