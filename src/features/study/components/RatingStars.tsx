interface Props {
  rating: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function RatingStars({ rating, interactive = false, onChange }: Props) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          className={`text-lg ${star <= rating ? "text-yellow-500" : "text-slate-300 dark:text-slate-600"} ${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}