import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useDirectMessages } from "../../features/messages/hooks/useDirectMessages";
import { useAuthStore } from "../../store/authStore";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import type { DirectMessageWithProfile } from "../../features/messages/services/messages.service";

function DMBubble({ message, isMine }: { message: DirectMessageWithProfile; isMine: boolean }) {
  const username = message.profiles?.username ?? "Unknown";
  const avatar = message.profiles?.avatar_url;
  const time = new Date(message.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col h-full">
      <div className={`max-w-[80%] ${isMine ? "order-2" : "order-1"}`}>
        {!isMine && (
          <div className="flex items-center gap-1 mb-0.5">
            {avatar ? (
              <img src={avatar} className="w-5 h-5 rounded-full object-cover" alt={username} />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center text-[10px] font-bold">
                {username[0]?.toUpperCase()}
              </div>
            )}
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{username}</span>
          </div>
        )}

        <div
          className={`p-2.5 rounded-2xl text-sm ${
            isMine
              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-md"
              : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-md"
          }`}
        >
          <p>{message.content}</p>
          <div className={`text-[10px] mt-1 ${isMine ? "text-blue-200" : "text-slate-400"}`}>{time}</div>
        </div>
      </div>
    </div>
  );
}

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
    <AppShell hideTopNav hideBottomNav>
      <div className="h-dvh flex flex-col">
        {/* Chat header (non-sticky; AppShell chrome is hidden) */}
        <div className="shrink-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 px-3 py-2 max-w-lg mx-auto w-full">
            <button
              onClick={() => navigate("/messages")}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Back"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-lg truncate flex-1">{partnerName}</h1>
          </div>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 space-y-2 max-w-lg mx-auto w-full">
          {isLoading && (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin" size={24} />
            </div>
          )}

          {messages.map((msg) => (
            <DMBubble key={msg.id} message={msg} isMine={msg.sender_id === currentUser?.id} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Composer */}
        <div className="shrink-0 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 px-3 py-2 pb-[env(safe-area-inset-bottom)] max-w-lg mx-auto w-full">
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2 text-sm outline-none"
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
      </div>
    </AppShell>
  );
}

