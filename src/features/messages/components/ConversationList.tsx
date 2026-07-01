import type { Conversation } from "../services/messages.service";

interface Props {
  conversations: Conversation[];
  onSelect: (conversation: Conversation) => void;
}

export function ConversationList({ conversations, onSelect }: Props) {
  if (conversations.length === 0) {
    return (
      <div className="text-center py-12 opacity-60">
        <p className="font-semibold">No messages yet</p>
        <p className="text-sm mt-1">Start a conversation from someone's profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {conversations.map((conv) => (
        <button
          key={conv.user_id}
          onClick={() => onSelect(conv)}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {conv.username?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm truncate">{conv.username ?? "Unknown"}</p>
              <span className="text-[10px] text-slate-400">
                {new Date(conv.last_message_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate mt-0.5">{conv.last_message}</p>
          </div>
          {conv.unread_count > 0 && (
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              {conv.unread_count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}