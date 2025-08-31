import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "Modelia Ai",
        short_name: "Modelia",
        description: "A short Assessment to replicate mock api image gen",
        screenshots: [
          {
            src: "sc-1080x1920.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "sc-1920x1080.png",
            sizes: "1920x1080",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
