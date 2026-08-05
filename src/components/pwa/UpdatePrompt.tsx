import { useRegisterSW } from "virtual:pwa-register/react";
import { RefreshCw, Sparkles, X } from "lucide-react";
import { useState } from "react";

export function UpdatePrompt() {
  const [dismissed, setDismissed] = useState(false);
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      if (registration) {
        // Poll for Service Worker updates every 60 seconds
        setInterval(() => {
          registration.update();
        }, 60 * 1000);
      }
    },
    onRegisterError(error) {
      console.error("[Campus PWA] Service worker registration error:", error);
    },
  });

  if (!needRefresh || dismissed) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md animate-slide-up">
      <div className="relative overflow-hidden rounded-2xl border border-blue-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 shadow-2xl backdrop-blur-md transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500" />

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
              <Sparkles className="h-5 w-5 animate-pulse text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                Update Available
              </p>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                A new version of Campus is ready
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => updateServiceWorker(true)}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-3.5 py-2 text-xs font-bold shadow-md shadow-blue-600/20 transition-all duration-150"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reload</span>
            </button>
            <button
              onClick={() => {
                setDismissed(true);
                setNeedRefresh(false);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Dismiss update prompt"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePrompt;
