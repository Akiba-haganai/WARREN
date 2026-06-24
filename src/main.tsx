import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// ── PWA update handling ──────────────────────────────────────────────────────
// Because vite.config.ts uses registerType: "autoUpdate", the plugin fires
// a custom "pwa:update-available" event when a new version is waiting.
// We listen for it to show the user a friendly update prompt.

window.addEventListener("pwa:update-available", () => {
  const shouldUpdate = window.confirm(
    "A new version of Warren is available. Update now?"
  );
  if (shouldUpdate) {
    // This tells the waiting service worker to activate immediately and reloads
    window.location.reload();
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);