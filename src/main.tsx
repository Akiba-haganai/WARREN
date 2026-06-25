import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import App from "./App";
import "./index.css";

// ─────────────────────────────────────────────
// PWA SERVICE WORKER REGISTRATION (SAFE MODE)
// ─────────────────────────────────────────────

registerSW({
  immediate: false, // IMPORTANT: prevents cold-start crash/reload race

  onNeedRefresh() {
    const shouldUpdate = window.confirm(
      "A new version of Warren is available. Update now?"
    );

    if (shouldUpdate) {
      window.location.reload();
    }
  },

  onOfflineReady() {
    console.log("[Warren] Offline ready");
  },
});

const container = document.getElementById("root");

if (!container) {
  throw new Error("[Warren] Root element not found.");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);