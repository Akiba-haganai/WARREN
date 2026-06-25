import { useState, useEffect } from "react";
import { Download, X, Share } from "lucide-react";

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true;

    const dismissedAt = localStorage.getItem("pwa-install-dismissed-at");
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;

    const recentlyDismissed =
      dismissedAt &&
      Date.now() - parseInt(dismissedAt) < thirtyDays;

    // ❌ If installed or dismissed recently → do nothing
    if (isStandalone || recentlyDismissed) {
      return;
    }

    const ua = navigator.userAgent;
    const isIPadOS =
      navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1;

    const isIOS =
      /iPad|iPhone|iPod/.test(ua) || isIPadOS;

    if (isIOS) {
      setIsIOSDevice(true);

      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);

      return () => clearTimeout(timer);
    }

    // ANDROID / DESKTOP
    const handler = (e: Event) => {
      e.preventDefault();

      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // fallback: ALWAYS show banner after delay
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 3500);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (isIOSDevice) {
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
      return;
    }

    alert("Open browser menu → Install App / Add to Home Screen");
  };

  const handleDismiss = () => {
    localStorage.setItem(
      "pwa-install-dismissed-at",
      String(Date.now())
    );

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
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black">
                W
              </div>

              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase">
                  App Available
                </p>
                <p className="text-sm font-bold">
                  Install Warren App
                </p>
              </div>
            </div>

            <button
              onClick={handleInstall}
              className="flex items-center gap-1.5 rounded-2xl bg-blue-600 px-4 py-2 text-xs font-bold text-white"
            >
              <Download size={13} />
              Install
            </button>
          </div>

          <button
          aria-label="submit"
            onClick={handleDismiss}
            className="absolute top-3.5 right-3 p-1 text-slate-400"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* iOS Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40">
          <div className="bg-white dark:bg-slate-900 p-6 w-full rounded-t-3xl">
            <h3 className="font-bold mb-3">
              Install on iPhone / iPad
            </h3>

            <p className="text-sm mb-2">
              1. Tap Share <Share size={14} />
            </p>
            <p className="text-sm mb-2">
              2. Add to Home Screen
            </p>
            <p className="text-sm mb-4">
              3. Tap Add
            </p>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full bg-blue-600 text-white py-2 rounded-xl"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}