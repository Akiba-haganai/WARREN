import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export function ProfileItem({ icon, label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-4 min-h-[44px] border-b border-slate-100 dark:border-slate-800 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 motion-safe:active:scale-[0.98]"
    >
      <div className="flex items-center gap-3 font-medium">
        {icon} <span>{label}</span>
      </div>
      <ChevronRight size={20} />
    </button>
  );
}