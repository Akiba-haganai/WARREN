import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// ── PWA update handling ──────────────────────────────────────────────────────
// The plugin fires "pwa:update-available" when a new SW is waiting.
window.addEventListener("pwa:update-available", () => {
  const shouldUpdate = window.confirm(
    "A new version of Warren is available. Update now?"
  );
  if (shouldUpdate) window.location.reload();
});

const container = document.getElementById("root");
if (!container) throw new Error("[Warren] Root element not found.");

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);