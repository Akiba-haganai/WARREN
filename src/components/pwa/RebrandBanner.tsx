import { useRebrandNotice } from "./useRebrandNotice";

export function RebrandBanner() {
  const { showBanner, dismiss } = useRebrandNotice();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white p-4 shadow-xl flex items-start gap-3 border border-slate-700">
      <div className="flex-1 text-sm">
        <p className="font-bold text-base">We've updated our icon! 🎉</p>
        <p className="text-slate-300 mt-1 leading-relaxed">
          Your home screen icon may be out of date since we changed our name to "Wave". Please remove this app and add it to your home screen again to get the latest icon.
        </p>
      </div>
      <button
        onClick={dismiss}
        className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg px-3 py-2 text-sm font-semibold shrink-0 transition-colors"
      >
        Got it
      </button>
    </div>
  );
}
