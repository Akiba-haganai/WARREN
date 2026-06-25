import { useEffect, useRef, useState } from "react";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);
  const initializeTheme = useThemeStore((state) => state.initTheme);

  const [booting, setBooting] = useState(true);

  // prevents double initialization (important in PWA + StrictMode)
  const hasBooted = useRef(false);

  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    let mounted = true;

    const boot = async () => {
      try {
        await Promise.all([
          initializeAuth(),
          initializeTheme(),
        ]);
      } catch (err) {
        console.error("[App boot error]", err);
      } finally {
        if (mounted) setBooting(false);
      }
    };

    boot();

    return () => {
      mounted = false;
    };
  }, [initializeAuth, initializeTheme]);

  if (booting) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-3 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          <p className="text-sm text-slate-500">
            Starting Warren...
          </p>
        </div>
      </div>
    );
  }

  return <AppRouter />;
}