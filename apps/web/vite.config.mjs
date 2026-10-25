import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    // host: 'localhost',
    host: "0.0.0.0",
    port: 6006,
    open: process.env.CI !== "true", // 避免 CI/自动化环境因尝试打开浏览器导致不稳定
    proxy: {
      "/lingxiforge": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      // Legacy compatibility route, planned to be removed after 30-day window.
      "/tifa": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/tokens.scss" as *;`,
      },
    },
  },
  build: {
    emptyOutDir: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1200,
  },
});
