import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { supabase } from "../../lib/supabase";

export default function GlobalNotificationsPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!title.trim()) return;
    setSending(true);
    setError("");
    try {
      const { error } = await supabase.from("global_notifications").insert({
        title: title.trim(),
        body: body.trim() || null,
        data: { type: "update" }, // you can customize the data
      });
      if (error) throw error;
      navigate("/admin");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to send notification.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Send Global Notification</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 🚀 New Features Released!"
              className="w-full px-3 py-2 rounded-xl border"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Details about the update..."
              rows={3}
              className="w-full px-3 py-2 rounded-xl border resize-none"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={sending || !title.trim()}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send to All Users"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </AppShell>
  );
}