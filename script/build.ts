import { context } from "esbuild";
import { notifyPlugin } from "./plugin";

const ctx = await context({
  entryPoints: ["./src/**/*.ts"],
  outdir: "build",
  platform: "node",
  format: "esm",
  bundle: true,
  plugins: [notifyPlugin],
  banner: {
    js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
  },
});

await ctx.watch();

console.log("watching");
