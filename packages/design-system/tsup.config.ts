import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: [],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  external: ["react"],
  ...options,
}));
