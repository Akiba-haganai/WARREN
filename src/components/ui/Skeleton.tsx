import type { HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({
  variant = "rectangular",
  className = "",
  ...props
}: SkeletonProps) {
  const base = "animate-pulse bg-slate-200 dark:bg-slate-800";

  const variantStyles = {
    text: "h-3.5 w-full rounded",
    circular: "rounded-full shrink-0",
    rectangular: "rounded-xl",
  };

  return <div className={`${base} ${variantStyles[variant]} ${className}`} {...props} />;
}
