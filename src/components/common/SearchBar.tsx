import { Search, X, SlidersHorizontal } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  onFilterClick?: () => void;
}

export function SearchBar({ value, onChange, onClear, placeholder = "Search papers, notes, course codes or topics", onFilterClick }: Props) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />
        {value && (
          <button onClick={onClear} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" aria-label="Clear search">
            <X size={14} />
          </button>
        )}
      </div>
      {onFilterClick && (
        <button
          onClick={onFilterClick}
          className="flex-shrink-0 w-[42px] h-[42px] flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-300 dark:hover:border-cyan-700 transition-colors"
          aria-label="Filter options"
        >
          <SlidersHorizontal size={18} />
        </button>
      )}
    </div>
  );
}