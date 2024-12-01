import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@/": "/src/",
      "@/assets": "/src/assets",
      "@/components": "/src/components",
      "@/helpers": "/src/helpers",
      "@/hooks": "/src/hooks",
      "@/layouts": "/src/layouts",
      "@/pages": "/src/pages",
      "@/router": "/src/router",
      "@/types": "/src/types",
      "@/store": "/src/store",
    }
  },
})
