import { useEffect, useRef, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";
import { useAccessibilityStore } from "./store/accessibility.store";
import InstallBanner from "./components/pwa/InstallBanner";

export default function App() {
  const initAuth = useAuthStore((s) => s.initialize);
  const initTheme = useThemeStore((s) => s.initTheme);
  const initA11y = useAccessibilityStore((s) => s.init);
  const [ready, setReady] = useState(false);
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    try { localStorage.removeItem("warren-needs-recovery"); } catch (_) {}
    Promise.allSettled([initAuth(), initTheme(), initA11y()]).finally(() =>
      setReady(true)
    );
  }, [initAuth, initTheme, initA11y]);

  if (!ready) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-500">
        <div className="w-8 h-8 rounded-xl bg-blue-600 animate-bounce" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <InstallBanner />
    </QueryClientProvider>
  );
}