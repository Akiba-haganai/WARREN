import type { MapPin as MapPinType } from "../../../types/map";
import { MapPin } from "lucide-react";
import { getCat } from "../utils/categories";
interface Props {
  results: MapPinType[];
  onSelect: (pin: MapPinType) => void;
}

export function SearchResults({ results, onSelect }: Props) {
  return (
    <div className="absolute left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-lg z-30 max-h-52 overflow-y-auto">
      {results.map((p) => {
        const cat = getCat(p.category);
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className="w-full flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
          >
            <span className="mt-0.5 p-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color + "22" }}>
              <MapPin size={13} style={{ color: cat.color }} />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">{p.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{p.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}