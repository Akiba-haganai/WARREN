import { useEffect, useRef, useState } from "react";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";

import InstallPromptController from "./components/pwa/InstallPromptController";

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);
  const initializeTheme = useThemeStore((state) => state.initTheme);

  const [booting, setBooting] = useState(true);
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
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <InstallPromptController>
      <AppRouter />
    </InstallPromptController>
  );
}