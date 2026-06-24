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

        // Only fall back to index.html for navigation requests (page loads),
        // never for JS/CSS/asset requests. Prevents the SW from returning
        // index.html when a JS bundle is requested, which causes a MIME crash.
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [
          /\.[a-z0-9]+$/i,   // any URL with a file extension
          /^\/workbox-/,      // workbox internals
          /^\/sw\.js/,        // main service worker
          /^\/push-sw\.js/,   // push service worker
        ],

        runtimeCaching: [
          {
            // AdSense — NetworkOnly so a blocked/failed ad request never
            // throws inside the SW and crashes the whole app
            urlPattern: /^https:\/\/.*googlesyndication\.com\/.*/i,
            handler: "NetworkOnly",
          },
          {
            // All other Google infrastructure (fonts, apis, ads, analytics)
            urlPattern:
              /^https:\/\/.*(googleapis|gstatic|doubleclick|googletagmanager)\.com\/.*/i,
            handler: "NetworkOnly",
          },
          {
            // Supabase — never cache auth tokens or API responses
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: "NetworkOnly",
          },
          {
            // Same-origin static assets only, matched by request destination
            // rather than URL origin to avoid referencing browser globals
            // (self, location) which don't exist in the Node/vite config context
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