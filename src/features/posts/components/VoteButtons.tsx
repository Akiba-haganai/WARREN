import { ChevronUp, ChevronDown } from "lucide-react";

interface Props {
  upvotes: number;
  downvotes: number;
  userVote?: "up" | "down" | null;
  onVote: (type: "up" | "down") => void;
}

export function VoteButtons({ upvotes, downvotes, userVote, onVote }: Props) {
  return (
    <div className="flex items-center gap-0.5 text-slate-500 dark:text-slate-400">
      <button
        onClick={() => onVote("up")}
        className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 ${userVote === "up" ? "text-blue-600" : ""}`}
        aria-label="Upvote"
      >
        <ChevronUp size={18} />
      </button>
      <span className="text-xs font-medium tabular-nums w-8 text-center">
        {upvotes - downvotes}
      </span>
      <button
        onClick={() => onVote("down")}
        className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 ${userVote === "down" ? "text-red-500" : ""}`}
        aria-label="Downvote"
      >
        <ChevronDown size={18} />
      </button>
    </div>
  );
}