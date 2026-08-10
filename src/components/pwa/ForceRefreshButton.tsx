import { useState, useEffect } from "react";

// Injected by Vite define
declare const __APP_VERSION__: string;

export function ForceRefreshButton() {
  const [status, setStatus] = useState<"idle" | "clearing" | "done">("idle");
  const [liveVersion, setLiveVersion] = useState<string | null>(null);

  useEffect(() => {
    // Read-only diagnostic: fetch version.json to check if we are on the latest version
    const checkVersion = async () => {
      try {
        const res = await fetch(`/version.json?t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          if (data.version && data.version !== __APP_VERSION__) {
            setLiveVersion(data.version);
          }
        }
      } catch (err) {
        // network issue, ignore
      }
    };
    
    checkVersion();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") checkVersion();
    };
    
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  async function handleForceRefresh() {
    setStatus("clearing");
    try {
      if ("serviceWorker" in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }

      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }

      setStatus("done");
      setTimeout(() => window.location.reload(), 400);
    } catch (err) {
      console.error("Force refresh failed:", err);
      setStatus("idle");
      window.location.reload(); // fallback: reload anyway
    }
  }

  // Ensure this fails gracefully if __APP_VERSION__ isn't injected during dev
  const appVersion = typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "dev";

  return (
    <div className="border-t border-slate-100 dark:border-slate-800 pt-5 mt-5 px-1">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">App Version: {appVersion}</h3>
      {liveVersion ? (
        <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-200">
          <p className="font-semibold mb-1">Update stuck?</p>
          <p>Version {liveVersion} is available, but your browser is trapped on {appVersion}. Please tap the Force Refresh button below.</p>
        </div>
      ) : (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Having update issues? If the app seems stuck on an old version, force-clear the cache and reload.
        </p>
      )}
      
      <button
        onClick={handleForceRefresh}
        disabled={status !== "idle"}
        className="mt-3 w-full rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors disabled:opacity-50"
      >
        {status === "idle" && "Force Refresh App"}
        {status === "clearing" && "Clearing cache…"}
        {status === "done" && "Reloading…"}
      </button>
    </div>
  );
}
