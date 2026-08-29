import { Check, X, Clock } from "lucide-react";
import { usePendingPins } from "../hooks/usePendingPins";

export function ModerationQueue() {
  const { pendingPins, isLoading, approve, isApproving, reject, isRejecting } = usePendingPins();

  if (isLoading) {
    return <p className="text-sm text-slate-400 text-center py-6">Loading pending submissions…</p>;
  }

  if (pendingPins.length === 0) {
    return <p className="text-sm text-slate-400 text-center py-6">No pending submissions.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {pendingPins.map((pin) => (
        <div key={pin.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950">
          <div className="mb-2">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{pin.title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{pin.description}</p>
            <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
              <Clock size={10} /> suggested by {pin.suggester_username ?? "a student"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => approve(pin.id)}
              disabled={isApproving || isRejecting}
              className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
            >
              <Check size={14} /> Approve
            </button>
            <button
              onClick={() => reject(pin.id)}
              disabled={isApproving || isRejecting}
              className="flex-1 flex items-center justify-center gap-1.5 bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950 disabled:opacity-50 text-red-600 text-xs font-semibold py-2 rounded-lg transition-colors"
            >
              <X size={14} /> Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
