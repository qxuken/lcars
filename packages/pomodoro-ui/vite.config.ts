import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { modifyConfig } from "@qxuken/vite-lib-config";

import packageJson from "./package.json";

let entry = resolve(__dirname, "src/main.ts");

let baseConfig = {
  plugins: [react()],
};

export default defineConfig(modifyConfig(baseConfig, entry, packageJson));
