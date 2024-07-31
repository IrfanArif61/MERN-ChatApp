import { defineConfig } from "vite";
// import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://bitchat-app.vercel.app",
        // changeOrigin: true,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "./src"),
  //   },
  // },
});
