import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCommunities, getUserMemberships } from "../../features/communities/services/communities.service";

import { Send, ArrowLeft, Loader2 } from "lucide-react";
import { fetchConversation, sendDirectMessage, type DirectMessageWithProfile } from "../../features/messages/services/messages.service";
import { useAuthStore } from "../../store/authStore";

import { useToastStore } from "../../store/toastStore";
interface Props {
  open: boolean;
  onClose: () => void;
  receiverId: string;
  receiverName: string;
}

export default function DirectMessageDrawer({ open, onClose, receiverId, receiverName }: Props) {
  const user = useAuthStore((s) => s.user);
  const { showToast } = useToastStore();
  const [messages, setMessages] = useState<DirectMessageWithProfile[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser = useAuthStore((s) => s.user);
  const { data: commonGroups } = useQuery({
    queryKey: ["commonGroups", currentUser?.id, receiverId],
    queryFn: async () => {
      if (!currentUser || !receiverId) return [];
      const [myMemberships, theirMemberships] = await Promise.all([
        getUserMemberships(currentUser.id),
        getUserMemberships(receiverId),
      ]);
      const commonIds = [...myMemberships].filter((id) => theirMemberships.has(id));
      if (commonIds.length === 0) return [];
      const allCommunities = await fetchCommunities();
      return allCommunities.filter((c) => commonIds.includes(c.id) && c.type === "study");
    },
    enabled: !!currentUser && !!receiverId,
  });


  useEffect(() => {
    if (!open || !user) return;
    setLoading(true);
    fetchConversation(user.id, receiverId)
      .then((msgs) => {
        setMessages(msgs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
      console.error(err);
      showToast("Failed to send message", "err");
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl animate-slide-up flex flex-col"
        style={{ maxHeight: "85vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 min-h-[44px] border-b border-slate-200 dark:border-slate-800">
          <button onClick={onClose} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Close DM">
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
          ) : (
            messages.map((msg) => (
              <DirectMessageBubble
                key={msg.id}
                message={msg}
                isMine={msg.sender_id === user?.id}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>


        {commonGroups && commonGroups.length > 0 && (
          <div className="px-4 py-2 bg-blue-50 dark:bg-blue-950/20 border-t border-blue-200 dark:border-blue-800">
            <p className="text-xs font-semibold">
              You're both in <span className="font-bold">{commonGroups[0].name}</span>
            </p>
            <button
              onClick={() => {
                const inviteUrl = `${window.location.origin}/community/${commonGroups[0].id}/join`;
                navigator.clipboard.writeText(inviteUrl);
                alert("Invite link copied!");
              }}
              className="text-xs text-blue-600 underline mt-1"
            >
              Copy invite link
            </button>
          </div>
        )}

        {/* Input */}

        <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
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

function DirectMessageBubble({ message, isMine }: { message: DirectMessageWithProfile; isMine: boolean }) {
  const senderName = message.profiles?.username ?? "Unknown";

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] ${isMine ? "order-2" : "order-1"}`}>
        {!isMine && (
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 block">
            {senderName}
          </span>
        )}
        <div
          className={`p-3 rounded-2xl text-sm ${
            isMine
              ? "bg-blue-600 text-white rounded-br-md"
              : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-md"
          }`}
        >
          <p>{message.content}</p>
          <div className={`text-[10px] mt-1 ${isMine ? "text-blue-200" : "text-slate-400"}`}>
            {new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>
    </div>
  );
}
