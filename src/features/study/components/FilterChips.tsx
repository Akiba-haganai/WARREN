export { SearchBar } from "../../../components/common/SearchBar";
export { EmptyState } from "../../../components/common/EmptyState"; // if needed

export function ChipScroll({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</div>;
}

export function Chip({ active, accent, onClick, children }: { active: boolean; accent?: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={active && accent ? { background: accent, color: "#fff", borderColor: accent, boxShadow: `0 0 10px ${accent}55` } : undefined}
      className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 whitespace-nowrap ${
        active && !accent ? "bg-blue-600 dark:bg-cyan-500 text-white border-blue-600 dark:border-cyan-500" : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
      }`}
    >
      {children}
    </button>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 px-0.5">{children}</p>;
}
