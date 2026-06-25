/// <reference lib="webworker" />

import {
  cleanupOutdatedCaches,
  precacheAndRoute,
} from "workbox-precaching";
import { clientsClaim } from "workbox-core";

declare let self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{
    url: string;
    revision: string | null;
  }>;
};

const SW_VERSION = "1.0.3";

self.skipWaiting();
clientsClaim();

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

// ─────────────────────────────────────────────
// PUSH NOTIFICATIONS
// ─────────────────────────────────────────────

self.addEventListener("push", (event: PushEvent) => {
  if (!event.data) return;

  event.waitUntil(
    (async () => {
      try {
        const payload = event.data!.json();

        const title = payload.title || "Warren";

        await self.registration.showNotification(title, {
          body: payload.body || "",
          icon: payload.icon || "/pwa-192.png",
          badge: "/pwa-192.png",

          data: {
            url: payload.url || "/",
          },

          tag: "campus-social",
        });
      } catch (error) {
        console.error("[SW] Push error:", error);
      }
    })()
  );
});

// ─────────────────────────────────────────────
// NOTIFICATION CLICK
// ─────────────────────────────────────────────

self.addEventListener(
  "notificationclick",
  (event: NotificationEvent) => {
    event.notification.close();

    const targetUrl =
      event.notification.data?.url || "/";

    event.waitUntil(
      self.clients
        .matchAll({
          type: "window",
          includeUncontrolled: true,
        })
        .then((clientList) => {
          for (const client of clientList) {
            if (
              "focus" in client &&
              client.url.includes(targetUrl)
            ) {
              return client.focus();
            }
          }

          return self.clients.openWindow(
            targetUrl
          );
        })
    );
  }
);

// ─────────────────────────────────────────────
// ACTIVATION
// ─────────────────────────────────────────────

self.addEventListener("activate", (event) => {
  console.log(`[SW] Activated version ${SW_VERSION}`);

  event.waitUntil(self.clients.claim());
});