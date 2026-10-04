import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export interface SectionHeaderProps {
  title: string;
  icon?: ReactNode;
  href?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function SectionHeader({
  title,
  icon,
  href,
  actionText = "See all",
  onAction,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-2.5 ${className}`}>
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-slate-400 dark:text-slate-500">{icon}</span>}
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </h2>
      </div>
      {href ? (
        <Link
          to={href}
          className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
        >
          {actionText}
        </Link>
      ) : onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
        >
          {actionText}
        </button>
      ) : null}
    </div>
  );
}
