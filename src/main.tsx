import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { registerSW } from "virtual:pwa-register";

// registerSW is provided by vite-plugin-pwa. It handles the full SW lifecycle:
//
//  onNeedRefresh  → a new SW has installed and is waiting
//  onOfflineReady → app is fully cached and works offline
//  onRegistered   → SW registered successfully (good place to set up polling)
//  onRegisterError→ SW failed to register (permissions, https, etc.)
//
// Calling updateSW(true) posts SKIP_WAITING to the waiting worker, which
// causes it to activate and claim all tabs, then reloads the page cleanly.
// This is the only correct way to trigger an update with VitePWA — using
// window.location.reload() directly races against clientsClaim and crashes.

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

    // Check for updates once on load, then every hour for long-lived sessions.
    registration.update();
    setInterval(() => registration.update(), 60 * 60 * 1000);
  },

  onRegisterError(error) {
    console.error("[Warren] Service worker registration failed:", error);
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);