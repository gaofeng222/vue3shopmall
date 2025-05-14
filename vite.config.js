import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/vue3shopmall/" : "./",
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "mock",
      localEnabled: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@a": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@c": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@s": fileURLToPath(new URL("./src/store/modules", import.meta.url)),
      "@v": fileURLToPath(new URL("./src/views", import.meta.url)),
      "@u": fileURLToPath(new URL("./src/utils", import.meta.url)),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  css: {
    preprocessorOptions: {
      // 自定义主题色
      scss: {
        additionalData: `@use "@a/styles/var.scss" as *;`,
      },
    },
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});
