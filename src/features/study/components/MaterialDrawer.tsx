import { useEffect } from "react";
import type { StudyMaterial } from "../services/study.service";

interface Props {
  material: StudyMaterial;
  saved: boolean;
  subjectColor: string;
  meta: { color: string; bg: string; border: string; icon: string; label: string };
  onToggleSave: (materialId: string, saved: boolean) => void;
  onClose: () => void;
}

export function MaterialDrawer({ material, saved, subjectColor, meta, onToggleSave, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40" />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 rounded-t-[24px] max-h-[85dvh] overflow-y-auto border-t border-slate-200 dark:border-slate-700/60 animate-slide-up">
        <div className="w-9 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mt-3" />
        <div style={{ background: `${subjectColor}18`, borderBottom: `1px solid ${subjectColor}33` }} className="flex items-center justify-between px-4 py-3 mt-2">
          <span style={{ background: meta.bg, color: meta.color }} className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full">
            {meta.icon} {meta.label}
          </span>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm">✕</button>
        </div>
        <div className="px-5 pt-4 pb-10">
          <h2 className="text-xl font-black text-slate-900 dark:text-white leading-snug mb-3">{material.title}</h2>
          {/* ... rest of the drawer content, same as original but with callbacks ... */}
          <button
            onClick={() => onToggleSave(material.id, saved)}
            style={saved ? { borderColor: "#F59E0B", color: "#F59E0B" } : undefined}
            className="w-full py-3.5 rounded-2xl text-sm font-bold border transition-colors"
          >
            {saved ? "🔖  Saved" : "🏷️  Save for later"}
          </button>
        </div>
      </div>
    </>
  );
}