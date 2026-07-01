import { Check, AlertCircle } from "lucide-react";
import { useMapStore } from "../store/map.store";

export function MapToast() {
  const toast = useMapStore((s) => s.toast);
  if (!toast) return null;

  return (
    <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl z-[60] transition-all duration-300 ${toast.type === "ok" ? "bg-emerald-600" : "bg-red-600"}`}>
      {toast.type === "ok" ? <Check size={13} /> : <AlertCircle size={13} />}
      {toast.message}
    </div>
  );
}