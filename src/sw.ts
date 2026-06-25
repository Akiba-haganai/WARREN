/// <reference lib="webworker" />

import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { BackgroundSyncPlugin } from "workbox-background-sync";
import { registerRoute } from "workbox-routing";
import { NetworkOnly } from "workbox-strategies";

declare let self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: any;
};

self.skipWaiting();
clientsClaim();

/* ---------------- SAFE PRECACHE (FIX MOBILE WHITE SCREEN) ---------------- */
precacheAndRoute(self.__WB_MANIFEST, {
  cleanURLs: false,
});

/* ---------------- BACKGROUND SYNC (LEVEL 3) ---------------- */

const bgSyncPlugin = new BackgroundSyncPlugin("warren-sync-queue", {
  maxRetentionTime: 24 * 60, // 24 hours
});

registerRoute(
  ({ request }) => request.method === "POST",
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  })
);

/* ---------------- PUSH ---------------- */

self.addEventListener("push", (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();

    event.waitUntil(
      self.registration.showNotification(data.title || "Warren", {
        body: data.body || "",
        icon: data.icon || "/pwa-192.png",
        data: { url: data.url || "/" },
        tag: "warren",
      })
    );
  } catch (e) {
    console.error("[SW PUSH ERROR]", e);
  }
});

/* ---------------- NOTIFICATION CLICK ---------------- */

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.url || "/";

  event.waitUntil(
    (async () => {
      const clientsList = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      for (const client of clientsList) {
        if ("focus" in client) {
          client.focus();
          return;
        }
      }

      return self.clients.openWindow(url);
    })()
  );
});