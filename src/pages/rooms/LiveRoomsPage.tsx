import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { fetchActiveRooms, fetchRoomMessages, sendRoomMessage, subscribeToRoomMessages, type LiveRoomMessage } from "../../services/liveRoomService";
import { useAuthStore } from "../../store/authStore";
import { Send, Clock, Loader2 } from "lucide-react";

export function LiveRoomsList() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    fetchActiveRooms().then(setRooms);
  }, []);

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-6">Live Rooms</h1>
        {rooms.length === 0 ? (
          <div className="text-center py-12 opacity-60">No active live rooms right now.</div>
        ) : (
          <div className="space-y-3">
            {rooms.map((room) => (
              <button key={room.id} onClick={() => navigate(`/live/${room.id}`)} className="w-full text-left bg-white dark:bg-slate-900 rounded-2xl p-4 border">
                <h3 className="font-semibold">{room.topic}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  <Clock size={12} className="inline mr-1" />
                  Expires {new Date(room.expires_at).toLocaleTimeString()}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

export function LiveRoomChat() {
  const { id } = useParams<{ id: string }>();
  const user = useAuthStore((s) => s.user);
  const [messages, setMessages] = useState<LiveRoomMessage[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<any>(null);

  useEffect(() => {
    if (!id) return;
    fetchRoomMessages(id).then((m) => { setMessages(m); setLoading(false); });
    channelRef.current = subscribeToRoomMessages(id, (msg) => setMessages((prev) => [...prev, msg]));
    return () => { channelRef.current?.unsubscribe(); };
  }, [id]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = async () => {
    if (!content.trim() || !id) return;
    await sendRoomMessage(id, content);
    setContent("");
  };

  return (
    <AppShell>
      <div className="flex flex-col h-full" style={{ minHeight: "100dvh" }}>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {loading ? <Loader2 className="animate-spin mx-auto" /> : messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.user_id === user?.id ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.user_id === user?.id ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}>
                <p className="text-xs font-semibold mb-1">{msg.profiles?.username ?? "Anonymous"}</p>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 border-t flex gap-2">
          <input value={content} onChange={(e) => setContent(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Type..." className="flex-1 p-2 rounded-xl border" />
          <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-full"><Send size={16} /></button>
        </div>
      </div>
    </AppShell>
  );
}