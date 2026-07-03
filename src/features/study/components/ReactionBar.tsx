const EMOJIS = ["❤️", "🙏", "🔥", "💡", "🎉"];

interface Props {
  reactions: { emoji: string; user_id: string }[];
  currentUserId?: string;
  onToggle: (emoji: string) => void;
}

export function ReactionBar({ reactions, currentUserId, onToggle }: Props) {
  const counts = EMOJIS.map((emoji) => ({
    emoji,
    count: reactions.filter((r) => r.emoji === emoji).length,
    active: reactions.some((r) => r.emoji === emoji && r.user_id === currentUserId),
  }));

  return (
    <div className="flex gap-2 mt-3">
      {counts.map(({ emoji, count, active }) => (
        <button
          key={emoji}
          onClick={() => onToggle(emoji)}
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${active ? "bg-blue-100 dark:bg-blue-900/30" : "bg-slate-100 dark:bg-slate-800"}`}
        >
          <span>{emoji}</span>
          <span className="text-xs">{count}</span>
        </button>
      ))}
    </div>
  );
}