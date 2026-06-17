import { create } from "zustand";

interface ThemeStore {
  darkMode: boolean;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  darkMode: false,

  toggleTheme: () =>
    set((state) => {
      const next = !state.darkMode;

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
    const savedTheme =
      localStorage.getItem("theme");

    const prefersDark =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

    const isDark =
      savedTheme === "dark"
        ? true
        : savedTheme === "light"
        ? false
        : prefersDark;

    document.documentElement.classList.toggle(
      "dark",
      isDark
    );

    set({
      darkMode: isDark,
    });
  },
}));