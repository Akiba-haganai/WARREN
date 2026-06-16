import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";

import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";

export default function App() {
  const initializeAuth =
    useAuthStore(
      (state) => state.initialize
    );

  const initializeTheme =
    useThemeStore(
      (state) => state.initTheme
    );

  useEffect(() => {
    initializeAuth();
    initializeTheme();
  }, []);

  return <AppRouter />;
}