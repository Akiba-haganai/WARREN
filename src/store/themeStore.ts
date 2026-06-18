import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>(
  (set, get) => ({
    theme: "light",

    setTheme: (theme) => {
      const html =
        document.documentElement;

      if (theme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }

      localStorage.setItem(
        "theme",
        theme
      );

      set({ theme });
    },

    toggleTheme: () => {
      const current =
        get().theme;

      get().setTheme(
        current === "dark"
          ? "light"
          : "dark"
      );
    },

    initTheme: () => {
      const savedTheme =
        localStorage.getItem(
          "theme"
        ) as Theme | null;

      const prefersDark =
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

      const theme =
        savedTheme ??
        (prefersDark
          ? "dark"
          : "light");

      const html =
        document.documentElement;

      if (theme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }

      set({ theme });
    },
  })
);