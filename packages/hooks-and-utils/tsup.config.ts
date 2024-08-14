import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  clean: true,
  entry: ["./src/index.ts", "./src/hooks/index.ts", "./src/utils/index.ts"],
  format: ["esm"],
  dts: true,
  outDir: "dist",
  sourcemap: true,
  external: ["react-jsx"],
  treeshake: true,
  ...options,
}));
