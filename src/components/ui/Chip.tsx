import type { HTMLAttributes, ReactNode } from "react";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "success" | "warning" | "outline" | "active";
  size?: "sm" | "md";
  icon?: ReactNode;
  onRemove?: () => void;
}

export function Chip({
  children,
  variant = "default",
  size = "md",
  icon,
  onRemove,
  className = "",
  ...props
}: ChipProps) {
  const base =
    "inline-flex items-center font-medium rounded-full transition-all duration-150 select-none";

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
  };

  const variantStyles = {
    default:
      "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    primary:
      "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/40",
    success:
      "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50",
    warning:
      "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/50",
    outline:
      "border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400",
    active:
      "bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/30",
  };

  return (
    <span className={`${base} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 hover:opacity-80 rounded-full p-0.5 transition"
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  );
}
