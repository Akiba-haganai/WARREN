import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useAuthStore } from "../../store/authStore";
import { fetchConversations, type Conversation } from "../../services/directMessageService";
import { MessageCircle } from "lucide-react";

export default function MessagesPage() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchConversations(user.id)
      .then(setConversations)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  // Open DM drawer via a dedicated chat page? We'll navigate to a conversation route
  const openConversation = (partnerId: string, partnerName: string) => {
    navigate(`/messages/${partnerId}`, { state: { username: partnerName } });
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>

        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-20 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />)}
          </div>
        ) : conversations.length === 0 ? (
          <div className="text-center py-12 opacity-60">
            <MessageCircle size={48} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No messages yet</p>
            <p className="text-sm mt-1">Start a conversation from someone's profile.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {conversations.map((conv) => (
              <button
                key={conv.user_id}
                onClick={() => openConversation(conv.user_id, conv.username ?? "Unknown")}
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
        )}
      </div>
    </AppShell>
  );
}