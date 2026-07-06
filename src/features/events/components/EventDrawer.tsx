import { useEffect, useMemo, useState } from "react";
import { Bell, BellOff, Clock, MapPin, X } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { getReminderStatus, toggleReminder } from "../../../services/eventsService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";

type Event = {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  community_id: string | null;
  created_by: string;
};

interface Props {
  event: Event | null;
  onClose: () => void;
}

export function EventDrawer({ event, onClose }: Props) {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const [communityName, setCommunityName] = useState<string>("");

  const eventDate = useMemo(() => {
    if (!event?.event_date) return null;
    const d = new Date(event.event_date);
    if (Number.isNaN(d.getTime())) return null;
    return d;
  }, [event?.event_date]);

  // Fetch reminder status
  const { data: isReminded, refetch } = useQuery({
    queryKey: ["eventReminder", event?.id, user?.id],
    queryFn: async () => {
      if (!event || !user) return false;
      return getReminderStatus(event.id, user.id);
    },
    enabled: !!event && !!user,
  });

  // Fetch community name if event has community_id
  useEffect(() => {
    let cancelled = false;

    async function loadCommunity() {
      if (!event?.community_id) return;
      const { data, error } = await supabase
        .from("communities")
        .select("name")
        .eq("id", event.community_id)
        .single();

      if (!cancelled && !error && data?.name) setCommunityName(data.name);
    }

    loadCommunity();
    return () => {
      cancelled = true;
    };
  }, [event?.community_id]);

  const handleToggleReminder = async () => {
    if (!event || !user) return;
    await toggleReminder(event.id, user.id);
    refetch();
    queryClient.invalidateQueries({ queryKey: ["eventReminder"] });
  };

  if (!event) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40" />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 rounded-t-[24px] max-h-[70vh] overflow-y-auto border-t border-slate-200 dark:border-slate-700/60 animate-slide-up">
        <div className="w-9 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mt-3" />

        <div className="flex items-center justify-between px-4 py-3 mt-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Event Details</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm"
            aria-label="Close drawer"
            type="button"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-5 pt-2 pb-10 space-y-4">
          <h3 className="text-xl font-black text-slate-900 dark:text-white leading-snug">{event.title}</h3>

          {event.description && (
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{event.description}</p>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Clock size={16} />
              <span>
                {eventDate
                  ? `${eventDate.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })} at ${eventDate.toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  : "—"}
              </span>
            </div>

            {communityName && (
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <MapPin size={16} />
                <span>{communityName}</span>
              </div>
            )}
          </div>

          {user ? (
            <button
              onClick={handleToggleReminder}
              type="button"
              className={`w-full py-3.5 rounded-2xl text-sm font-bold border transition-colors flex items-center justify-center gap-2 ${
                isReminded
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
              }`}
            >
              {isReminded ? (
                <>
                  <Bell size={16} /> Reminded
                </>
              ) : (
                <>
                  <BellOff size={16} /> Remind Me
                </>
              )}
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

