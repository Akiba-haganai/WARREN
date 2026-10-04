import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "./IconButton";

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  maxHeight?: string;
  className?: string;
}

export function Sheet({
  open,
  onClose,
  title,
  description,
  children,
  maxHeight = "max-h-[85vh]",
  className = "",
}: SheetProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full max-w-lg bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl rounded-t-3xl border-t border-white/40 dark:border-slate-700/50 shadow-2xl animate-in slide-in-from-bottom duration-300 ${maxHeight} overflow-hidden flex flex-col ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab bar */}
        <div className="w-10 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mt-2.5 mb-1" />

        {(title || description) && (
          <div className="flex items-start justify-between px-5 pt-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              {title && (
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {description}
                </p>
              )}
            </div>
            <IconButton
              size="sm"
              variant="ghost"
              aria-label="Close"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 -mr-1"
            >
              <X size={16} />
            </IconButton>
          </div>
        )}

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
