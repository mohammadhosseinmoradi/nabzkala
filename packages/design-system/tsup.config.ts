import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  clean: true,
  entry: ["./src/components/index.ts"],
  format: ["esm"],
  dts: true,
  outDir: "dist",
  sourcemap: true,
  external: ["react-jsx"],
  ...options,
}));
