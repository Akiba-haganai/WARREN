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

const container = document.getElementById("root");
if (!container) throw new Error("[Warren] Root element not found.");

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);