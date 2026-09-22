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
            // Keep Supabase alone — it's huge (200KB) and changes rarely
            if (id.includes("node_modules/@supabase")) return "vendor-supabase";
            // All other node_modules in a single vendor chunk
            // This reduces 15 parallel chunk requests to 2, saving ~1.5s on slow 4G
            return "vendor";
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
        registerType: "autoUpdate",
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
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
              options: { cacheName: "images", expiration: { maxEntries: 50 } },
            },
          ],
        },
        manifest: {
          name: "Wave",
          short_name: "Wave",
          description: "Connect. Learn. Interact. — Student Hub & Resources",
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