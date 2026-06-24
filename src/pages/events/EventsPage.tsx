import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { fetchEvents, toggleReminder, getReminderStatus } from "../../services/eventsService";
import { fetchCommunities } from "../../services/communityService";
import { useAuthStore } from "../../store/authStore";
import type { Database } from "../../types/database.types";
import { Clock, Bell, BellOff } from "lucide-react";
import { format } from "date-fns";

type Event = Database["public"]["Tables"]["events"]["Row"];
type Community = Database["public"]["Tables"]["communities"]["Row"];

export default function EventsPage() {
  const user = useAuthStore((s) => s.user);
  const [events, setEvents] = useState<Event[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState<Record<string, boolean>>({});
  const [communityFilter, setCommunityFilter] = useState<string>("all");

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetchCommunities().then(setCommunities).catch(console.error);
  }, []);

  useEffect(() => {
    if (!user || events.length === 0) return;
    const loadReminders = async () => {
      const status: Record<string, boolean> = {};
      await Promise.all(
        events.map(async (event) => {
          status[event.id] = await getReminderStatus(event.id, user.id);
        })
      );
      setReminders(status);
    };
    loadReminders();
  }, [user, events]);

  const handleToggleReminder = async (eventId: string) => {
    if (!user) return;
    const nowReminded = await toggleReminder(eventId, user.id);
    setReminders((prev) => ({ ...prev, [eventId]: nowReminded }));
  };

  const filteredEvents = communityFilter === "all"
    ? events
    : events.filter((e) => e.community_id === communityFilter);

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            📅 Campus Events
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Upcoming deadlines and events
          </p>
        </div>

        {/* Community filter */}
        {communities.length > 0 && (
          <div className="mb-4">
            <select
              value={communityFilter}
              onChange={(e) => setCommunityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border text-sm bg-white dark:bg-slate-800"
            >
              <option value="all">All Communities</option>
              {communities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12 opacity-60">
            <span className="text-5xl mb-3 block">📭</span>
            <p className="font-semibold">No upcoming events</p>
            <p className="text-sm mt-1">Check back soon or check your community pages.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-4"
              >
                <h3 className="font-bold text-slate-800 dark:text-slate-100">{event.title}</h3>
                {event.description && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{event.description}</p>
                )}
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {format(new Date(event.event_date), "PPp")}
                  </span>
                  {event.community_id && (
                    <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                      {communities.find((c) => c.id === event.community_id)?.name ?? "Community"}
                    </span>
                  )}
                </div>
                <div className="flex justify-end mt-3">
                  {user && (
                    <button
                      onClick={() => handleToggleReminder(event.id)}
                      className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition ${
                        reminders[event.id]
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {reminders[event.id] ? <Bell size={12} /> : <BellOff size={12} />}
                      {reminders[event.id] ? "Reminded" : "Remind me"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}