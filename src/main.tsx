import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import App from "./App";
import "./index.css";

registerSW({
  immediate: false,

  onNeedRefresh() {
    window.location.reload();
  },

  onOfflineReady() {
    console.log("[Warren] offline ready");
  },
});

const container = document.getElementById("root");

if (!container) throw new Error("Root missing");

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);