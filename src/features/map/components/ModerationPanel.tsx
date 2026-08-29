import { useState } from "react";
import { ClipboardList, X } from "lucide-react";
import { usePendingPins } from "../hooks/usePendingPins";
import { ModerationQueue } from "./ModerationQueue";

export function ModerationPanel() {
  const [open, setOpen] = useState(false);
  const { pendingPins } = usePendingPins();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-sm transition-all"
      >
        <ClipboardList size={14} />
        Pending ({pendingPins.length})
      </button>

      {open && (
        <div className="fixed inset-0 z-30 flex items-end sm:items-center sm:justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative w-full sm:max-w-md max-h-[80vh] overflow-y-auto bg-white dark:bg-slate-950 rounded-t-2xl sm:rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Pending Submissions</h2>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-slate-400">
                <X size={18} />
              </button>
            </div>
            <ModerationQueue />
          </div>
        </div>
      )}
    </>
  );
}
