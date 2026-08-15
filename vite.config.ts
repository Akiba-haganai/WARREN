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
          skipWaiting: true,
          clientsClaim: true,
          navigateFallback: "/index.html",
          runtimeCaching: [
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