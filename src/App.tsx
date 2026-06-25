import { useEffect, useRef, useState } from "react";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";
import InstallPromptController from "./components/pwa/InstallPromptController";
import { initSyncEngine } from "./components/pwa/syncEngine";

export default function App() {
  const initAuth = useAuthStore((s) => s.initialize);
  const initTheme = useThemeStore((s) => s.initTheme);

  const [ready, setReady] = useState(false);
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;

    let alive = true;

    (async () => {
      try {
        await Promise.allSettled([initAuth(), initTheme()]);

        // IMPORTANT: delay prevents iOS blank flash crash
        requestAnimationFrame(() => {
          initSyncEngine();
          if (alive) setReady(true);
        });
      } catch (e) {
        console.error("[BOOT ERROR]", e);
        setReady(true);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (!ready) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="w-10 h-10 rounded-2xl bg-blue-600 animate-pulse" />
      </div>
    );
  }

  return (
    <InstallPromptController>
      <AppRouter />
    </InstallPromptController>
  );
}