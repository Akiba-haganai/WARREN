import { create } from "zustand";

type FontSize = "normal" | "large" | "x-large";

interface AccessibilityState {
  fontSize: FontSize;
  highContrast: boolean;
  setFontSize: (size: FontSize) => void;
  toggleHighContrast: () => void;
  init: () => void;
}

export const useAccessibilityStore = create<AccessibilityState>((set, get) => ({
  fontSize: "normal",
  highContrast: false,

  setFontSize: (size) => {
    const root = document.documentElement;
    root.classList.remove("text-large", "text-x-large");
    if (size !== "normal") root.classList.add(`text-${size}`);
    localStorage.setItem("fontSize", size);
    set({ fontSize: size });
  },

  toggleHighContrast: () => {
    const next = !get().highContrast;
    const root = document.documentElement;
    if (next) root.classList.add("high-contrast");
    else root.classList.remove("high-contrast");
    localStorage.setItem("highContrast", String(next));
    set({ highContrast: next });
  },

  init: () => {
    const savedFont = localStorage.getItem("fontSize") as FontSize | null;
    const savedContrast = localStorage.getItem("highContrast") === "true";
    if (savedFont) {
      const root = document.documentElement;
      if (savedFont !== "normal") root.classList.add(`text-${savedFont}`);
      set({ fontSize: savedFont });
    }
    if (savedContrast) {
      document.documentElement.classList.add("high-contrast");
      set({ highContrast: true });
    }
  },
}));