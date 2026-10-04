import { useEffect, useRef } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";
import { useAccessibilityStore } from "./store/accessibility.store";
import InstallBanner from "./components/pwa/InstallBanner";
import UpdatePrompt from "./components/pwa/UpdatePrompt";
import { RebrandBanner } from "./components/pwa/RebrandBanner";

export default function App() {
  const initAuth = useAuthStore((s) => s.initialize);
  const initTheme = useThemeStore((s) => s.initTheme);
  const initA11y = useAccessibilityStore((s) => s.init);
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    initTheme();
    initA11y();
    initAuth();
  }, [initAuth, initTheme, initA11y]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <InstallBanner />
      <UpdatePrompt />
      <RebrandBanner />
    </QueryClientProvider>
  );
}