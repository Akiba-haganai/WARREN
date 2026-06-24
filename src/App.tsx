import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);
  const initializeTheme = useThemeStore((state) => state.initTheme);

  useEffect(() => {
    // App mounted successfully — clear the crash flag so the recovery
    // script in index.html doesn't trigger on the next load.
    try {
      localStorage.removeItem("warren-crash-flag");
    } catch (_) {}

    initializeAuth();
    initializeTheme();
  }, [initializeAuth, initializeTheme]);

  return <AppRouter />;
}