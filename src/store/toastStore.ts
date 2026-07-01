import { create } from "zustand";

interface Toast {
  message: string;
  type: "ok" | "err";
}

interface ToastStore {
  toast: Toast | null;
  showToast: (message: string, type?: "ok" | "err") => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toast: null,
  showToast: (message, type = "ok") => {
    set({ toast: { message, type } });
    setTimeout(() => set({ toast: null }), 3000);
  },
  hideToast: () => set({ toast: null }),
}));
