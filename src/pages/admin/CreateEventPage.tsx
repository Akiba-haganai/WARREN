import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { createEvent, updateEvent, fetchEvents } from "../../services/eventsService";
import { supabase } from "../../lib/supabase";
import type { Database } from "../../types/database.types";

type EventInsert = Database["public"]["Tables"]["events"]["Insert"];

export default function CreateEventPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [communityId, setCommunityId] = useState<string | null>(null);
  const [notifyAll, setNotifyAll] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      const events = await fetchEvents();
      const event = events.find((e) => e.id === id);
      if (event) {
        setTitle(event.title);
        setDescription(event.description ?? "");
        setEventDate(new Date(event.event_date).toISOString().slice(0, 16));
        setCommunityId(event.community_id ?? null);
      } else {
        navigate("/admin/events");
      }
    })();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !eventDate) return;
    setSaving(true);
    setError("");

    try {
      const payload: EventInsert = {
        title: title.trim(),
        description: description.trim() || null,
        event_date: new Date(eventDate).toISOString(),
        community_id: communityId,
        created_by: "", // will be set by the service
      };

      if (isEdit && id) {
        await updateEvent(id, payload);
      } else {
        await createEvent(payload);
      }

      // Optional global notification
      if (notifyAll) {
        await supabase.from("global_notifications").insert({
          title: `📅 New Event: ${title.trim()}`,
          body: description.trim() || "Check the Events page for details.",
          data: { type: "event", event_date: new Date(eventDate).toISOString() },
        });
      }

      navigate("/admin/events");
    } catch (err: any) {
      setError(err.message || "Failed to save event");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {isEdit ? "Edit Event" : "Create Event"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Exam Registration Deadline"
              className="w-full px-3 py-2 rounded-xl border"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Date & Time *</label>
            <input
              type="datetime-local"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="More details about the event..."
              rows={3}
              className="w-full px-3 py-2 rounded-xl border resize-none"
            />
          </div>

          {/* Notify all users */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Send notification to all users</span>
            <button
              type="button"
              onClick={() => setNotifyAll(!notifyAll)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifyAll ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  notifyAll ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          <button
            type="submit"
            disabled={saving || !title.trim() || !eventDate}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold disabled:opacity-50"
          >
            {saving ? "Saving..." : isEdit ? "Update Event" : "Create Event"}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </AppShell>
  );
}