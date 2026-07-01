interface Props {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
      <p className="text-red-500 font-medium">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="text-sm text-blue-600 underline">
          Retry
        </button>
      )}
    </div>
  );
}