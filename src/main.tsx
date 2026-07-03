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

// ── PWA update handling ──────────────────────────────────────────────────
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
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </StrictMode>
);