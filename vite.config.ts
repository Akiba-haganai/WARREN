import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.ico",
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
  icons: [
    { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
    { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
    { src: "/pwa-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
},

      workbox: {
        importScripts: ["/push-sw.js"],

        globPatterns: [
          "**/*.{js,css,html,svg,png,ico}"
        ],

        cleanupOutdatedCaches: true,

        clientsClaim: true,

        skipWaiting: true,

        navigateFallback: "/index.html",

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds:
                  60 * 60 * 24,
              },
            },
          },
        ],
      },
    }),
  ],
});