import { rm } from "node:fs/promises";
import process from "node:process";
import autoprefixer from "autoprefixer";
import { build, context } from "esbuild";
import { htmlPlugin } from "esbuild-html-plugin";
import stylePlugin from "esbuild-style-plugin";
import tailwindcss from "tailwindcss";

const outdir = "dist";
const nodeEnv = process.env["NODE_ENV"] ?? "production";
const dev = nodeEnv !== "production";

const style = stylePlugin({ postcss: { plugins: [tailwindcss, autoprefixer] } });

const html = htmlPlugin({
  outfile: "index.html",
  language: "en",

  createHeadElements: (outputUrls) => [
    '<meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    '<meta name="description" content="A conversational rabbit hole!">',
    "<title>DownTheHole.wtf</title>",

    ...outputUrls
      .filter((url) => url.endsWith(".css"))
      .map((url) => `<link href="${url}" rel="stylesheet">`),

    ...outputUrls
      .filter((url) => url.endsWith(".js"))
      .map((url) => `<script src="${url}" defer></script>`),
  ],

  createBodyElements: () => [`<main id="app"></main>`],
});

console.log(`Building in ${dev ? "DEV" : "PROD"} mode.`);

/** @type {import('esbuild').BuildOptions} */
const buildOptions = {
  bundle: true,
  define: { __dev: `${dev}` },
  entryNames: "[dir]/[name]-[hash]",
  entryPoints: [{ out: "client", in: "src/client.tsx" }],
  metafile: true,
  minify: !dev,
  outdir,
  plugins: [style, html],
  publicPath: "/static",
  sourcemap: dev,
  target: "es2022",
  treeShaking: true,
  tsconfig: "tsconfig.base.json",
};

if (process.argv.includes("--watch")) {
  const ctx = await context(buildOptions);

  await ctx.watch();
} else {
  await rm(outdir, { recursive: true, force: true });

  await build(buildOptions);
}
