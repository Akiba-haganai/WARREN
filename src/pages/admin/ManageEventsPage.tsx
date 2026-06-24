import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { fetchEvents, deleteEvent } from "../../services/eventsService";
import type { Database } from "../../types/database.types";
import { Pencil, Trash2, Plus } from "lucide-react";
import { format } from "date-fns";

type Event = Database["public"]["Tables"]["events"]["Row"];

export default function ManageEventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await deleteEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Events</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {loading ? "Loading…" : `${events.length} event${events.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/events/new")}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-sm"
          >
            <Plus size={14} /> New Event
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <p className="text-center opacity-60 py-10">No events yet.</p>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">{event.title}</h3>
                  {event.description && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{event.description}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-2">
                    {format(new Date(event.event_date), "PPp")}
                  </p>
                </div>
                <div className="flex gap-2 ml-3 shrink-0">
                  <button
                    onClick={() => navigate(`/admin/events/edit/${event.id}`)}
                    className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                    aria-label="Edit event"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
                    aria-label="Delete event"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}