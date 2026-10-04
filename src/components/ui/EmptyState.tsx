import type { ReactNode } from "react";
import { Button } from "./Button";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionText,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 ${className}`}
    >
      {icon && (
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-3 text-xl">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">{title}</h3>
      {description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs leading-relaxed">
          {description}
        </p>
      )}
      {actionText && onAction && (
        <Button size="sm" variant="secondary" className="mt-4" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
