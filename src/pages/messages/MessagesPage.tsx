import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useConversations } from "../../features/messages/hooks/useConversations";
import { ConversationList } from "../../features/messages/components/ConversationList";

export default function MessagesPage() {
  const navigate = useNavigate();
  const { data: conversations = [], isLoading } = useConversations();

  const handleSelect = (conv: any) => {
    navigate(`/messages/${conv.user_id}`, { state: { username: conv.username ?? "Unknown" } });
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        {isLoading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-20 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />)}
          </div>
        ) : (
          <ConversationList conversations={conversations} onSelect={handleSelect} />
        )}
      </div>
    </AppShell>
  );
}