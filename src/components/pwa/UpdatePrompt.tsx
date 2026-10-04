import { useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { RefreshCw, Sparkles, X } from "lucide-react";

export function UpdatePrompt() {
  const [dismissed, setDismissed] = useState(false);
  const [updating, setUpdating] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
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

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await updateServiceWorker(true);
    } catch {
      window.location.reload();
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    setNeedRefresh(false);
  };

  if (!needRefresh || dismissed) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-20 left-4 right-4 z-[90] max-w-sm mx-auto p-3.5 rounded-2xl bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 backdrop-blur-2xl border border-white/20 dark:border-slate-800/20 shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-4 duration-300"
      style={{
        marginBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-blue-500/20 dark:bg-blue-600/20 flex items-center justify-center shrink-0">
          <Sparkles size={16} className="text-cyan-400 dark:text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold leading-tight truncate">New version available</p>
          <p className="text-[11px] opacity-80 leading-tight truncate">Tap update for latest fixes</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={handleUpdate}
          disabled={updating}
          className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50"
        >
          {updating ? (
            <RefreshCw size={12} className="animate-spin" />
          ) : null}
          <span>{updating ? "Updating…" : "Update"}</span>
        </button>
        <button
          onClick={handleDismiss}
          className="p-1 rounded-full opacity-60 hover:opacity-100 transition"
          aria-label="Dismiss update"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

export default UpdatePrompt;
