import type { StudyMaterial } from "../services/study.service";
import { TYPE_META } from "../constants";

interface Props {
  material: StudyMaterial;
  saved: boolean;
  subjectColor: string;
  onToggleSave: (materialId: string, saved: boolean) => void;
  onOpen: (material: StudyMaterial) => void;
}

export function MaterialCard({ material, saved, subjectColor, onToggleSave, onOpen }: Props) {
  const meta = TYPE_META[material.material_type] ?? TYPE_META["resource"];
  const timeAgo = new Date(material.created_at).toLocaleDateString();

  return (
    <div
      onClick={() => onOpen(material)}
      style={{ borderLeftColor: subjectColor }}
      className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 border-l-[3px] rounded-2xl p-4 cursor-pointer active:scale-[0.99] transition-transform duration-100"
    >
      <div className="flex items-center justify-between mb-2">
        <span
          style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}33` }}
          className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full"
        >
          {meta.icon} {meta.label}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSave(material.id, saved); }}
          className="text-lg leading-none p-0.5"
          aria-label={saved ? "Unsave" : "Save"}
        >
          {saved ? "🔖" : "🏷️"}
        </button>
      </div>
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug mb-1 line-clamp-2">{material.title}</h3>
      {material.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-2 line-clamp-2">{material.description}</p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span style={{ background: `${subjectColor}18`, color: subjectColor }} className="text-[11px] font-bold px-2 py-0.5 rounded-full">{material.subject}</span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-full px-2 py-0.5">{material.year_group}</span>
        </div>
        <span className="text-[11px] text-slate-400">{material.download_count > 0 && `⬇ ${material.download_count} · `}{timeAgo}</span>
      </div>
    </div>
  );
}