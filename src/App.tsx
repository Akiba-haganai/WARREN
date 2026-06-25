import { useEffect, useState } from "react";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);
  const initializeTheme = useThemeStore((state) => state.initTheme);

  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const boot = async () => {
      try {
        await Promise.all([
          initializeAuth(),
          initializeTheme(),
        ]);
      } finally {
        setBooting(false);
      }
    };

    boot();
  }, [initializeAuth, initializeTheme]);

  if (booting) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <AppRouter />;
}