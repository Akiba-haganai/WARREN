import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useAuthStore } from "../../store/authStore";
import {
  fetchMessages,
  sendTextMessage,
  sendImageMessage,
  sendGifMessage,
  uploadChatImage,
  subscribeToMessages,
  type CommunityMessageWithProfile,
} from "../../services/communityChatService";
import { ArrowLeft, Send, Image as ImageIcon, Loader2, Link } from "lucide-react";

import DirectMessageDrawer from "../../components/community/DirectMessageDrawer";
import { useToastStore } from "../../store/toastStore";

export default function CommunityChatPage() {
  const { id: communityId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = useAuthStore((s) => s.user);
  const { showToast } = useToastStore();
  const [messages, setMessages] = useState<CommunityMessageWithProfile[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<ReturnType<typeof subscribeToMessages> | null>(null);

  const dmUserIdFromParam = searchParams.get("dm");
  const [directMessageUser, setDirectMessageUser] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    if (dmUserIdFromParam && communityId) {
      navigate(`/community/${communityId}/chat`, { replace: true });
      setDirectMessageUser({ id: dmUserIdFromParam, name: "User" });
    }
  }, [dmUserIdFromParam, communityId, navigate]);

  useEffect(() => {
    if (!communityId || !user) return;
    fetchMessages(communityId)
      .then((msgs) => {
        setMessages(msgs);
        setLoading(false);
      })
      .catch(console.error);
  }, [communityId, user]);

  useEffect(() => {
    if (!communityId) return;
    channelRef.current = subscribeToMessages(communityId, (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });
    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [communityId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMsg.trim() || !user || !communityId) return;
    setSending(true);
    try {
      if (
        /^https?:\/\/\S+\.(gif|webp)(\?.*)?$/i.test(newMsg.trim()) &&
        (newMsg.includes("giphy") || newMsg.includes("tenor"))
      ) {
        await sendGifMessage(communityId, user.id, newMsg.trim());
      } else {
        await sendTextMessage(communityId, user.id, newMsg.trim());
      }
      setNewMsg("");
    } catch (err) {
      console.error(err);
      showToast("Failed to send message", "err");
    } finally {
      setSending(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !communityId) return;
    setSending(true);
    try {
      const imageUrl = await uploadChatImage(file, user.id);
      await sendImageMessage(communityId, user.id, imageUrl);
    } catch (err) {
      console.error(err);
      showToast("Failed to upload image", "err");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const openDirectMessage = (userId: string, username: string) => {
    setDirectMessageUser({ id: userId, name: username });
  };

  const handleCopyInvite = () => {
    const inviteUrl = `${window.location.origin}/community/${communityId}/join`;
    navigator.clipboard.writeText(inviteUrl);
    alert("Invite link copied! Share it with your friends.");
  };

  if (!communityId) return null;


  return (
    <AppShell>
      <div className="flex flex-col h-full" style={{ minHeight: "100dvh" }}>
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
          <button onClick={() => navigate(-1)} className="p-1" aria-label="Go back">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-lg flex-1">Chat</h1>
          <button onClick={handleCopyInvite} className="p-1" aria-label="Copy invite link">
            <Link size={20} />
          </button>
        </div>


        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {loading && (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin" size={24} />
            </div>
          )}
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isMine={msg.user_id === user?.id}
              onDirectMessage={openDirectMessage}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-2">
          <label className="p-2 cursor-pointer" aria-label="Upload image">
            <ImageIcon size={20} />
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
          <textarea
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2 resize-none outline-none"
            aria-label="Message input"
          />
          <button
            onClick={handleSend}
            disabled={!newMsg.trim() || sending}
            className="p-2 bg-blue-600 text-white rounded-full disabled:opacity-50"
            aria-label="Send message"
          >
            {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>

      {/* Direct Message Drawer */}
      {directMessageUser && (
        <DirectMessageDrawer
          open={!!directMessageUser}
          onClose={() => setDirectMessageUser(null)}
          receiverId={directMessageUser.id}
          receiverName={directMessageUser.name}
        />
      )}
    </AppShell>
  );
}

// ── Message Bubble ────────────────────────────────────────────────────────────
function MessageBubble({
  message,
  isMine,
  onDirectMessage,
}: {
  message: CommunityMessageWithProfile;
  isMine: boolean;
  onDirectMessage: (userId: string, username: string) => void;
}) {
  const username = message.profiles?.username ?? "Anonymous";
  const avatar = message.profiles?.avatar_url;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] ${isMine ? "order-2" : "order-1"}`}>
        {!isMine && (
          <div className="flex items-center gap-2 mb-1">
            {avatar ? (
              <img src={avatar} className="w-5 h-5 rounded-full object-cover" alt={username} />
            ) : (
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                {username[0]?.toUpperCase()}
              </div>
            )}
            <button
              onClick={() => onDirectMessage(message.user_id, username)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              aria-label={`Message ${username}`}
            >
              {username}
            </button>
          </div>
        )}
        <div
          className={`p-3 rounded-2xl text-sm ${
            isMine
              ? "bg-blue-600 text-white rounded-br-md"
              : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-md"
          }`}
        >
          {message.type === "text" && <p>{message.content}</p>}
          {message.type === "image" && message.image_url && (
            <img src={message.image_url} alt="Shared" className="rounded-lg max-h-60 w-full object-cover" />
          )}
          {message.type === "gif" && message.image_url && (
            <img src={message.image_url} alt="GIF" className="rounded-lg max-h-60 w-full object-cover" />
          )}
          {message.type === "sticker" && message.sticker_url && (
            <img src={message.sticker_url} alt="Sticker" className="w-24 h-24 object-contain" />
          )}
          {message.type === "voice" && message.voice_url && (
            <audio controls className="max-w-full mt-1">
              <source src={message.voice_url} />
            </audio>
          )}
          <div className={`text-[10px] mt-1 ${isMine ? "text-blue-200" : "text-slate-400"}`}>
            {new Date(message.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}