import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// ── PWA update handling ──────────────────────────────────────────────────────
// The VitePWA plugin (registerType: "autoUpdate") fires this event when
// a new version is waiting. We show a friendly prompt and reload.
window.addEventListener("pwa:update-available", () => {
  const shouldUpdate = window.confirm(
    "A new version of Warren is available. Update now?"
  );
  if (shouldUpdate) {
    window.location.reload();
  }
});

const container = document.getElementById("root");
if (!container) throw new Error("[Warren] Root element not found.");

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);