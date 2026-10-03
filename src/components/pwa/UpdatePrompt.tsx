import { useEffect, useRef } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { useToastStore } from "../../store/toastStore";

export function UpdatePrompt() {
  const { showToast } = useToastStore();
  const toastShown = useRef(false);

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return;
      // Check for updates on tab focus — but at most once per 5 minutes
      let lastCheck = 0;
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState !== "visible") return;
        const now = Date.now();
        if (now - lastCheck > 5 * 60 * 1000) {
          lastCheck = now;
          registration.update().catch(() => {});
        }
      });
    },
    onRegisterError(error) {
      console.error("[515 PWA] Service worker registration error:", error);
    },
  });

  useEffect(() => {
    if (!needRefresh || toastShown.current) return;
    toastShown.current = true;
    // Show a non-intrusive toast — do NOT auto-reload; let the user decide
    showToast("Update available — tap to refresh", "ok");
    // Expose the updater for the toast action (best-effort, no forced reload)
    (window as any).__waveApplyUpdate = () => updateServiceWorker(true);
  }, [needRefresh, showToast, updateServiceWorker]);

  return null;
}

export default UpdatePrompt;
