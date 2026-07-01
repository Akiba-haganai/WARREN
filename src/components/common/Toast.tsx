import { Check, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

interface Props {
  message: string;
  type?: "ok" | "err";
  onClose: () => void;
}

export function Toast({ message, type = "ok", onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl z-50 ${type === "ok" ? "bg-emerald-600" : "bg-red-600"}`}>
      {type === "ok" ? <Check size={13} /> : <AlertCircle size={13} />}
      {message}
      <button onClick={onClose} className="ml-1"><X size={12} /></button>
    </div>
  );
}