import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive" | "gradient";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = "default", className = "", ...props }, ref) => {
    const base = "rounded-2xl transition-all duration-200 border";

    const variants = {
      default:
        "bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-slate-100",
      elevated:
        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-white/20 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none text-slate-900 dark:text-slate-100",
      interactive:
        "bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-white/20 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-800/80 hover:shadow-md cursor-pointer active:scale-[0.99] text-slate-900 dark:text-slate-100",
      gradient:
        "bg-gradient-to-br from-blue-600 to-cyan-500 border-transparent text-white shadow-md shadow-blue-500/20",
    };

    return (
      <div ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
