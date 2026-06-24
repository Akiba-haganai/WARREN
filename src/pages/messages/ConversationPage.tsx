import { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useAuthStore } from "../../store/authStore";
import { fetchConversation, sendDirectMessage, type DirectMessageWithProfile } from "../../services/directMessageService";
import { ArrowLeft, Send, Loader2 } from "lucide-react";

export default function ConversationPage() {
  const { partnerId } = useParams<{ partnerId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const partnerName = (location.state as any)?.username ?? "User";

  const [messages, setMessages] = useState<DirectMessageWithProfile[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!partnerId || !user) return;
    fetchConversation(user.id, partnerId).then((msgs) => {
      setMessages(msgs);
      setLoading(false);
    });
  }, [partnerId, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!content.trim() || !partnerId || !user) return;
    setSending(true);
    try {
      const msg = await sendDirectMessage(user.id, partnerId, content.trim());
      setMessages((prev) => [...prev, msg]);
      setContent("");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <AppShell>
      <div className="flex flex-col h-full" style={{ minHeight: "100dvh" }}>
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
          <button onClick={() => navigate("/messages")} className="p-1" aria-label="Back to messages">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-lg">{partnerName}</h1>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="animate-spin" size={24} /></div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender_id === user?.id ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender_id === user?.id
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-md"
                }`}>
                  <p>{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender_id === user?.id ? "text-blue-200" : "text-slate-400"}`}>
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
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
            disabled={!content.trim() || sending}
            className="p-2 bg-blue-600 text-white rounded-full disabled:opacity-50"
            aria-label="Send message"
          >
            {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </AppShell>
  );
}