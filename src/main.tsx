import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

// ── Capture install prompt as early as possible ─────────────────────────
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  (window as any).deferredPrompt = e;
});

// ── Chunk load error recovery — prevents blank screen on stale SW cache ──
// If a JS chunk 404s (after a new deploy), clear everything and reload once.
// On the 2nd consecutive error in a session, do a nuclear cache wipe.
const CHUNK_ERR_KEY = "515-chunk-error-strikes";
(window as Window).addEventListener("vite:preloadError", async () => {
  const strikes = parseInt(sessionStorage.getItem(CHUNK_ERR_KEY) ?? "0", 10) + 1;
  if (strikes >= 2) {
    // Nuclear reset: unregister SW + wipe all caches, then reload once
    sessionStorage.removeItem(CHUNK_ERR_KEY);
    sessionStorage.setItem("515-sw-hard-reset", "1");
    try {
      if ("serviceWorker" in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch (_) {}
    window.location.reload();
  } else {
    sessionStorage.setItem(CHUNK_ERR_KEY, String(strikes));
    window.location.reload();
  }
});

const container = document.getElementById("root");
if (!container) throw new Error("[515] Root element not found.");

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </StrictMode>
);