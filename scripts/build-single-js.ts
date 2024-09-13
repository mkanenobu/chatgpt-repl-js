import { build } from "esbuild";

const main = async () => {
  const result = await build({
    bundle: true,
    platform: "node",
    outfile: "out/bundle.js",
    entryPoints: ["main.ts"],
  });
  console.log(result);
};

await main();
