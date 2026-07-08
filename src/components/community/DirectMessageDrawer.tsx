import { useEffect, useRef, useState } from "react";
import { Send, ArrowLeft, Loader2 } from "lucide-react";
import {
  fetchConversation,
  sendDirectMessage,
  type DirectMessageWithProfile,
} from "../../features/messages/services/messages.service";
import { useAuthStore } from "../../store/authStore";
import { useToastStore } from "../../store/toastStore";

interface Props {
  open: boolean;
  onClose: () => void;
  receiverId: string;
  receiverName: string;
}

export default function DirectMessageDrawer({
  open,
  onClose,
  receiverId,
  receiverName,
}: Props) {
  const user = useAuthStore((s) => s.user);
  const { showToast } = useToastStore();
  const [messages, setMessages] = useState<DirectMessageWithProfile[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !user) return;
    setLoading(true);
    fetchConversation(user.id, receiverId)
      .then((msgs) => {
        setMessages(msgs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("[DM Drawer] fetchConversation failed", err);
        setLoading(false);
      });
  }, [open, user, receiverId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMsg.trim() || !user) return;
    setSending(true);
    try {
      const msg = await sendDirectMessage(user.id, receiverId, newMsg.trim());
      setMessages((prev) => [...prev, msg]);
      setNewMsg("");
    } catch (err) {
      showToast("Failed to send message", "err");
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl animate-slide-up flex flex-col shadow-2xl"
        style={{ maxHeight: "85vh", paddingBottom: "env(safe-area-inset-bottom, 16px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 min-h-[44px] border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close DM"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="font-bold text-lg">{receiverName}</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin" size={24} />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="text-4xl mb-3">💬</span>
              <p className="font-semibold text-slate-500">No messages yet</p>
              <p className="text-xs text-slate-400">Say hello to start the conversation!</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMine = msg.sender_id === user?.id;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      isMine
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-md"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <div
                      className={`text-[10px] mt-1 ${
                        isMine ? "text-blue-200" : "text-slate-400"
                      }`}
                    >
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input bar – sits above bottom nav */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 pb-6">
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Message..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3 min-h-[44px] outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!newMsg.trim() || sending}
            className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center bg-blue-600 text-white rounded-full disabled:opacity-50 transition-all duration-200 motion-safe:active:scale-[0.98] hover:shadow-md"
          >
            {sending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}