import React from "react";
import { Loader2 } from "lucide-react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  variant?: "ghost" | "secondary" | "primary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      variant = "ghost",
      size = "md",
      loading = false,
      disabled = false,
      className = "",
      type = "button",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";

    const variantStyles = {
      ghost:
        "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-slate-400",
      secondary:
        "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 focus-visible:ring-slate-400",
      primary:
        "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm hover:shadow focus-visible:ring-blue-500",
      outline:
        "border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400 focus-visible:ring-blue-500",
      danger:
        "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 focus-visible:ring-red-500",
    };

    const sizeStyles = {
      sm: "w-8 h-8 rounded-lg min-w-[32px] min-h-[32px]",
      md: "w-10 h-10 rounded-xl min-w-[40px] min-h-[40px]",
      lg: "w-12 h-12 rounded-2xl min-w-[48px] min-h-[48px]",
    };

    return (
      <button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        disabled={disabled || loading}
        aria-busy={loading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin shrink-0" /> : children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
