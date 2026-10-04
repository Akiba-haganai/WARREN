import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const buildId = env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || env.VITE_APP_BUILD_ID || "dev";

  return {
    define: {
      __APP_VERSION__: JSON.stringify(buildId),
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            if (
              id.includes("node_modules/react/") ||
              id.includes("node_modules/react-dom/") ||
              id.includes("node_modules/react-router") ||
              id.includes("node_modules/@remix-run/router")
            ) {
              return "vendor-react";
            }
            if (id.includes("node_modules/@supabase")) {
              return "vendor-supabase";
            }
            if (id.includes("node_modules/@tanstack/react-query")) {
              return "vendor-query";
            }
            if (id.includes("node_modules/lucide-react")) {
              return "vendor-icons";
            }
            if (
              id.includes("node_modules/react-hook-form") ||
              id.includes("node_modules/@hookform") ||
              id.includes("node_modules/zod")
            ) {
              return "vendor-forms";
            }
            if (id.includes("node_modules/date-fns")) {
              return "vendor-dates";
            }
          },
        },
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      // Custom plugin to emit version.json
      {
        name: "emit-version-json",
        generateBundle() {
          this.emitFile({
            type: "asset",
            fileName: "version.json",
            source: JSON.stringify({ version: buildId }),
          });
        },
      },
      VitePWA({
        registerType: "prompt",
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,webmanifest}"],
          cleanupOutdatedCaches: true,
          skipWaiting: false,   // Don't force-activate on install — wait for user action
          clientsClaim: false,  // Don't hijack existing tabs — prevents reload cascade
          navigateFallback: "/index.html",
          runtimeCaching: [
            {
              urlPattern: ({ request }) => request.mode === "navigate",
              handler: "NetworkFirst",
              options: {
                cacheName: "html-cache",
                networkTimeoutSeconds: 3,
              },
            },
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "images",
                expiration: {
                  maxEntries: 60,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
              },
            },
            {
              urlPattern: /\/assets\/.*\.js$/,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "js-chunks-cache",
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts",
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
                },
              },
            },
          ],
        },
        manifest: {
          name: "515",
          short_name: "515",
          description: "Find the paper. Understand it. Plan the cram.",
          theme_color: "#1E88E5",
          background_color: "#1E88E5",
          display: "standalone",
          start_url: `/?v=${buildId}`,
          scope: "/",
          icons: [
            { src: "/icons/icon-72.png", sizes: "72x72", type: "image/png" },
            { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
            { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
          ],
        },
      }),
    ],
  };
});