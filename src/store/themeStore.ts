import { create } from "zustand";

interface ThemeStore {
  darkMode: boolean;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useThemeStore =
  create<ThemeStore>((set) => ({
    darkMode:
      localStorage.getItem("theme") ===
      "dark",

    toggleTheme: () =>
      set((state) => {
        const next =
          !state.darkMode;

        localStorage.setItem(
          "theme",
          next ? "dark" : "light"
        );

        document.documentElement.classList.toggle(
          "dark",
          next
        );

        return {
          darkMode: next,
        };
      }),

    initTheme: () => {
      const isDark =
        localStorage.getItem("theme") ===
        "dark";
      document.documentElement.classList.toggle(
        "dark",
        isDark
      );
    },
  }));