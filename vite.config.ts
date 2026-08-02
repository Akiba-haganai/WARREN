import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const buildId = env.VERCEL_GIT_COMMIT_SHA || env.VITE_APP_BUILD_ID || "dev";

  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          navigateFallback: "/index.html",
          runtimeCaching: [
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
              handler: "CacheFirst",
              options: { cacheName: "images", expiration: { maxEntries: 50 } },
            },
            {
              // Cache your own JS/CSS/HTML (app shell)
              urlPattern: ({ url }: { url: URL }) => url.origin === (globalThis as any).location.origin,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "app-shell",
                expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 },
              },
            },
          ],
        },
        manifest: {
          name: "Campus",
          short_name: "Campus",
          description: "The digital home of CBU — by Warren",
          theme_color: "#1E40AF",
          background_color: "#1E40AF",
          display: "standalone",
          start_url: `/?v=${buildId}`,
          scope: "/",
          icons: [
            { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
            { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
          ],
        },
      }),
    ],
  };
});