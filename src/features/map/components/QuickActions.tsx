import { QUICK, getCat } from "../utils/categories";
import { useMapStore } from "../store/map.store";

export function QuickActions() {
  const activeCategories = useMapStore((s) => s.activeCategories);

  const handleQuick = (category: string) => {
    useMapStore.setState({ activeCategories: new Set([category as any]), activePin: null });
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      {QUICK.map((q) => {
        const cat = getCat(q.category);
        const active = activeCategories.has(q.category) && activeCategories.size === 1;
        return (
          <button
            key={q.label}
            onClick={() => handleQuick(q.category)}
            className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0 ${
              active ? `${cat.bg} ${cat.border}` : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
            }`}
            style={{ color: active ? cat.color : undefined }}
          >
            {cat.icon}
            {q.label}
          </button>
        );
      })}
    </div>
  );
}