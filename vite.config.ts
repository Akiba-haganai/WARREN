import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // Completely disable the service worker for now.
      // The PWA manifest and install prompt will still work,
      // but no files will be cached – every load is fresh.
      injectRegister: false,
      selfDestroying: true,

      includeAssets: [
        "favicon.svg",
        "pwa-192.png",
        "pwa-512.png",
      ],

      manifest: {
        name: "Warren",
        short_name: "Warren",
        description: "Connect, share, and study together",
        theme_color: "#2563eb",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/?v=8",
        scope: "/",
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },

      workbox: {
        globPatterns: [],
      },
    }),
  ],
});