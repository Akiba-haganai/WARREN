import { useState, useEffect } from "react";
import { Download, X, Share } from "lucide-react";

/**
 * InstallBanner – shows a floating banner for Android/Desktop,
 * and an iOS instruction modal when on iPhone/iPad.
 *
 * Uses localStorage with a 30‑day dismissal.
 */

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    // Already installed?
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true;
    if (standalone) return;

    // Dismissed recently?
    const dismissedAt = localStorage.getItem("pwa-install-dismissed-at");
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    if (dismissedAt && Date.now() - parseInt(dismissedAt) < thirtyDays) return;

    // iOS detection
    const ua = navigator.userAgent;
    const isIPadOS =
      navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    const ios = /iPad|iPhone|iPod/.test(ua) || isIPadOS;

    if (ios) {
      setIsIOS(true);
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }

    // Android / Desktop
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    // Fallback if the event never fires
    const fallback = setTimeout(() => {
      if (!deferredPrompt) setShowBanner(true);
    }, 3000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(fallback);
    };
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback: generic install hint
      alert("You can install this app from your browser menu.");
      setShowBanner(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa-install-dismissed-at", String(Date.now()));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Floating Banner */}
      <div className="fixed bottom-24 left-4 right-4 z-50">
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 p-4 pr-10 shadow-2xl backdrop-blur-md">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500" />

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black shadow-md shadow-blue-500/20">
                W
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                  App Available
                </p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Install Campus
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Add to home screen for native experience
                </p>
              </div>
            </div>

            <button
              onClick={handleInstall}
              className="flex items-center gap-1.5 rounded-2xl bg-blue-600 dark:bg-blue-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 shrink-0"
            >
              <Download size={13} />
              Install
            </button>
          </div>

          <button
            onClick={handleDismiss}
            className="absolute top-3.5 right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors duration-150"
            aria-label="Dismiss banner"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* iOS Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/40 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowIOSModal(false)} />
          <div className="relative w-full max-w-lg rounded-t-[32px] border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 pb-8 shadow-2xl animate-slide-up text-left">
            <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                  Install on iPhone / iPad
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Add Campus to your home screen in 3 steps
                </p>
              </div>
              <button
                aria-label="Close"
                onClick={() => setShowIOSModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors duration-150"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 py-2">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-sm font-bold border border-blue-100 dark:border-blue-900/30">1</div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Tap the Share button</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                    Click the share button{" "}
                    <span className="inline-flex p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      <Share size={12} />
                    </span>{" "}
                    at the bottom of Safari.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-sm font-bold border border-blue-100 dark:border-blue-900/30">2</div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Select "Add to Home Screen"</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Scroll down the share sheet and tap <strong>"Add to Home Screen"</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-sm font-bold border border-blue-100 dark:border-blue-900/30">3</div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Confirm by tapping "Add"</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Tap <strong>"Add"</strong> in the top‑right corner to complete.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-6 w-full rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 py-3 text-sm font-bold text-slate-800 dark:text-slate-200 transition-colors duration-200"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}