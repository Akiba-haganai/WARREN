import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    const shouldUpdate = window.confirm(
      "A new version of Warren is available. Update now?"
    );
    if (shouldUpdate) {
      updateSW(true);
    }
  },

  onOfflineReady() {
    console.log("[Warren] App is ready to work offline.");
  },

  onRegistered(registration) {
    if (!registration) return;
    registration.update();
    setInterval(() => registration.update(), 60 * 60 * 1000);
  },

  onRegisterError(error) {
    console.error("[Warren] Service worker registration failed:", error);
  },
});

// Global error handler — catches SW-related crashes before React mounts
// and gives the user a recovery path instead of a permanent blank screen.
window.addEventListener("error", (event) => {
  console.error("[Warren] Global error:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("[Warren] Unhandled promise rejection:", event.reason);
});

const container = document.getElementById("root");

if (!container) {
  throw new Error("[Warren] Root element not found. Check index.html.");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);