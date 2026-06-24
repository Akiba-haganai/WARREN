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
        icons: [
          { src: "pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "pwa-512.png",
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

        runtimeCaching: [
          {
            // Google ads — NetworkOnly, failure must never crash SW
            urlPattern: /googlesyndication\.com/i,
            handler: "NetworkOnly",
          },
          {
            // All Google infrastructure
            urlPattern:
              /^https:\/\/.*(googleapis|gstatic|doubleclick|googletagmanager)\.com/i,
            handler: "NetworkOnly",
          },
          {
            // Supabase — never cache auth or API responses
            urlPattern: /supabase\.co/i,
            handler: "NetworkOnly",
          },
          {
            // All other cross-origin — pass through, don't cache
            urlPattern: ({ url }: { url: URL }) =>
              url.origin !== "https://warren-gold.vercel.app",
            handler: "NetworkOnly",
          },
          {
            // Same-origin static assets only
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