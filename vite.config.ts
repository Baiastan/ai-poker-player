import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase",
      scopeBehaviour: "local",
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
