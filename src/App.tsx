import { useEffect, useRef, useState } from "react";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";
import InstallBanner from "./components/pwa/InstallBanner";

export default function App() {
  const initAuth = useAuthStore((s) => s.initialize);
  const initTheme = useThemeStore((s) => s.initTheme);
  const [ready, setReady] = useState(false);
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;

    // Clear recovery flag – we've successfully mounted!
    try {
      localStorage.removeItem("warren-needs-recovery");
    } catch (_) {}

    Promise.allSettled([initAuth(), initTheme()]).finally(() => setReady(true));
  }, [initAuth, initTheme]);

  if (!ready) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="w-10 h-10 rounded-2xl bg-blue-600 animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <AppRouter />
      <InstallBanner />
    </>
  );
}