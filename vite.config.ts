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
        clientsClaim: true,
        skipWaiting: true,

        navigateFallback: "/index.html",
        navigateFallbackDenylist: [
          /\.[a-z0-9]+$/i,
          /^\/workbox-/,
          /^\/sw\.js/,
          /^\/push-sw\.js/,
        ],

        // ── IMPORTANT: order matters — workbox matches top to bottom ──
        runtimeCaching: [
          {
            // 1. AdSense — must be FIRST so it wins before the script
            //    destination rule below can catch it. NetworkOnly means
            //    if the request fails (ad blocker, offline) the error
            //    stays on the network layer and never reaches the SW handler.
            urlPattern: /googlesyndication\.com/i,
            handler: "NetworkOnly",
          },
          {
            // 2. All Google infrastructure — fonts, maps, analytics, ads
            urlPattern:
              /^https:\/\/.*(googleapis|gstatic|doubleclick|googletagmanager)\.com/i,
            handler: "NetworkOnly",
          },
          {
            // 3. Supabase — never cache auth or API responses
            urlPattern: /supabase\.co/i,
            handler: "NetworkOnly",
          },
          {
            // 4. Any other cross-origin request not matched above —
            //    pass through to network, don't cache third-party stuff
            urlPattern: ({ url }: { url: URL }) =>
              url.origin !== "https://warren-gold.vercel.app",
            handler: "NetworkOnly",
          },
          {
            // 5. Same-origin static assets — cache these for offline support
            urlPattern: ({ request }: { request: Request }) =>
              ["script", "style", "image", "font"].includes(
                request.destination
              ),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-assets",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
        ],
      },
    }),
  ],
});