import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import "./index.css";
import App from "./App";

const updateSW = registerSW({
  immediate: true,

  onNeedRefresh() {
    const shouldUpdate = window.confirm(
      "A new version of Warren is available. Update now?"
    );

    if (shouldUpdate) {
      updateSW(true);
    }
  },

  onOfflineReady() {
    console.log(
      "Warren is ready for offline use."
    );
  },
});

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <App />
  </StrictMode>
);