import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);
  const initializeTheme = useThemeStore((state) => state.initTheme);

  useEffect(() => {
    // Clear recovery flag – we've successfully mounted!
    try {
      localStorage.removeItem("warren-needs-recovery");
    } catch (_) {}

    initializeAuth();
    initializeTheme();
  }, [initializeAuth, initializeTheme]);

  return <AppRouter />;
}