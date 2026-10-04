import React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      icon,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none";

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-sm shadow-blue-500/20 focus-visible:ring-blue-500",
      secondary:
        "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 focus-visible:ring-slate-400",
      outline:
        "border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 focus-visible:ring-blue-500",
      ghost:
        "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 focus-visible:ring-slate-400",
      danger:
        "bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-500/20 focus-visible:ring-red-500",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 rounded-xl gap-1.5 min-h-[36px]",
      md: "text-sm px-4 py-2.5 rounded-xl gap-2 min-h-[44px]",
      lg: "text-base px-5 py-3 rounded-2xl gap-2.5 min-h-[50px]",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          icon && <span className="shrink-0">{icon}</span>
        )}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
