import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useDirectMessages } from "../../features/messages/hooks/useDirectMessages";
import { MessageBubble } from "../../features/messages/components/MessageBubble";
import { useAuthStore } from "../../store/authStore";
import { ArrowLeft, Send, Loader2 } from "lucide-react";

export default function ConversationPage() {
  const { partnerId } = useParams<{ partnerId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const partnerName = (location.state as any)?.username ?? "User";
  const currentUser = useAuthStore((s) => s.user);

  const { messages, isLoading, send, isSending } = useDirectMessages(partnerId);
  const [content, setContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!content.trim()) return;
    send(content.trim());
    setContent("");
  };

  return (
    <AppShell>
      <div className="flex flex-col h-full" style={{ minHeight: "100dvh" }}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
          <button onClick={() => navigate("/messages")} className="p-1" aria-label="Back">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-lg">{partnerName}</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {isLoading && <div className="flex justify-center py-8"><Loader2 className="animate-spin" size={24} /></div>}
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              content={msg.content}
              timestamp={msg.created_at}
              isMine={msg.sender_id === currentUser?.id}
              senderName={msg.profiles?.username ?? undefined}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-2">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!content.trim() || isSending}
            className="p-2 bg-blue-600 text-white rounded-full disabled:opacity-50"
            aria-label="Send message"
          >
            {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </AppShell>
  );
}