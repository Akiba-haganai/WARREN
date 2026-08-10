import { useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { useToastStore } from "../../store/toastStore";

export function UpdatePrompt() {
  const { showToast } = useToastStore();
  
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      if (registration) {
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") {
            registration.update();
          }
        });
        setInterval(() => {
          registration.update();
        }, 60_000);
      }
    },
    onRegisterError(error) {
      console.error("[Campus PWA] Service worker registration error:", error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      showToast("App updated — refreshing…", "ok");
      setTimeout(() => {
        updateServiceWorker(true);
      }, 1500);
    }
  }, [needRefresh, showToast, updateServiceWorker]);

  return null;
}

export default UpdatePrompt;
