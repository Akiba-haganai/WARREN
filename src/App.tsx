import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);
  const initializeTheme = useThemeStore((state) => state.initTheme);

  useEffect(() => {
    // Clear the SW crash-recovery flag — if we reached this point,
    // the app loaded successfully and no recovery is needed.
    sessionStorage.removeItem("warren-sw-recovery");

    initializeAuth();
    initializeTheme();
  }, [initializeAuth, initializeTheme]);

  return <AppRouter />;
}