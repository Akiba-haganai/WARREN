import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { fetchStudyMaterials } from "../../study/services/study.service";
import type { StudyMaterial } from "../../study/services/study.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (material: StudyMaterial) => void;
}

export function ShareMaterialModal({ open, onClose, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);

  useEffect(() => {
    if (!open) return;
    fetchStudyMaterials({ search: query || undefined }).then(setMaterials);
  }, [query, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl p-5 animate-slide-up shadow-2xl max-h-[70vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Share Material</h2>
          <button aria-label="Close" onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <X size={20} />
          </button>
        </div>
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search materials..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 text-sm"
          />
        </div>
        <div className="overflow-y-auto flex-1 space-y-2">
          {materials.slice(0, 20).map((m) => (
            <button
              key={m.id}
              onClick={() => { onSelect(m); onClose(); }}
              className="w-full text-left p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border"
            >
              <p className="font-semibold text-sm truncate">{m.title}</p>
              <p className="text-xs text-slate-500">{m.subject} · {m.material_type}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}