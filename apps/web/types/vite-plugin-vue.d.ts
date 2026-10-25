declare module "@vitejs/plugin-vue" {
  import type { Plugin } from "vite";
  export default function vuePlugin(...args: any[]): Plugin;
}
