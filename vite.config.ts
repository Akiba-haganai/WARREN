import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "prompt",

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
          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        importScripts: ["/push-sw.js"],

        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],

        cleanupOutdatedCaches: true,

        // Safe because updateSW(true) in main.tsx controls exactly when
        // SKIP_WAITING is posted — the SW won't activate until the user
        // confirms the prompt, so there's no race with the page reload.
        clientsClaim: true,
        skipWaiting: true,

        navigateFallback: "/index.html",

        runtimeCaching: [
          {
            // Exclude Supabase and any other external origins so auth tokens
            // and API responses are never served from cache.
            // urlPattern runs inside the built SW bundle (not Node/vite),
            // so we avoid referencing `self` here to keep vite.config.ts
            // type-clean — the exclusion list achieves the same result.
            urlPattern: ({ url }: { url: URL }) =>
              !url.hostname.includes("supabase.co") &&
              !url.hostname.includes("googleapis.com") &&
              !url.hostname.includes("gstatic.com") &&
              url.protocol !== "chrome-extension:",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-assets",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
        ],
      },
    }),
  ],
});