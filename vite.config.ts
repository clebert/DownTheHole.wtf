import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({ plugins: [tailwindcss()] });
