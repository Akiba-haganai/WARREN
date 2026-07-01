import { useMapStore } from "../store/map.store";
import { CATEGORIES } from "../utils/categories";

export function CategoryFilter() {
  const activeCategories = useMapStore((s) => s.activeCategories);
  const toggleCategory = useMapStore((s) => s.toggleCategory);
  const clearFilters = useMapStore((s) => s.clearFilters);

  return (
    <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
      <button
        onClick={clearFilters}
        className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
          activeCategories.size === 0
            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
        }`}
      >
        All
      </button>
      {CATEGORIES.map((cat) => {
        const active = activeCategories.has(cat.key);
        return (
          <button
            key={cat.key}
            onClick={() => toggleCategory(cat.key)}
            className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
              active ? `${cat.bg} ${cat.border}` : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
            }`}
            style={{ color: active ? cat.color : undefined }}
          >
            {cat.icon}
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}