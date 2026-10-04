import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "./Button";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "Failed to load data. Please check your connection and try again.",
  onRetry,
  className = "",
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center p-6 text-center rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 text-red-700 dark:text-red-300 ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400 mb-2.5">
        <AlertCircle size={20} />
      </div>
      <h3 className="text-sm font-bold">{title}</h3>
      <p className="text-xs text-red-600/80 dark:text-red-400/80 mt-1 max-w-xs">{message}</p>
      {onRetry && (
        <Button
          size="sm"
          variant="outline"
          onClick={onRetry}
          icon={<RotateCcw size={13} />}
          className="mt-3.5 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-100/50"
        >
          Try again
        </Button>
      )}
    </div>
  );
}
