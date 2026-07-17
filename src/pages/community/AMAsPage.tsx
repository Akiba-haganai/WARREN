import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AppShell from "../../components/layout/AppShell";
import { supabase } from "../../lib/supabase";
import { ArrowLeft, Clock } from "lucide-react";

export default function AMAsPage() {
  const { id: communityId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["amaSessions", communityId],
    queryFn: async () => {
      if (!communityId) return [];
      const { data } = await supabase
        .from("ama_sessions")
        .select("*, profiles:lecturer_id(username, avatar_url)")
        .eq("community_id", communityId)
        .order("scheduled_for", { ascending: false });
      return data ?? [];
    },
    enabled: !!communityId,
  });

  const [tab, setTab] = useState<"scheduled" | "live" | "ended">("scheduled");
  const filtered = useMemo(() => {
    if (tab === "scheduled") return sessions.filter((s: any) => s.status === "scheduled");
    if (tab === "live") return sessions.filter((s: any) => s.status === "live");
    return sessions.filter((s: any) => s.status === "ended");
  }, [sessions, tab]);

  return (
    <AppShell>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Ask Me Anything</h1>
        </div>

        <div className="flex gap-2 mb-4">
          {([
            { key: "scheduled", label: "Upcoming" },
            { key: "live", label: "Live" },
            { key: "ended", label: "Ended" },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`min-h-[36px] px-4 py-2 rounded-full text-sm font-semibold border ${
                tab === t.key
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 opacity-60">
            <p className="font-semibold">No AMA sessions scheduled yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((session: any) => (
              <button
                key={session.id}
                onClick={() => navigate(`/community/${communityId}/ama/${session.id}`)}
                className="w-full p-4 bg-white dark:bg-slate-900 rounded-2xl border text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {session.profiles?.username?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{session.profiles?.username ?? "Lecturer"}</p>
                    <p className="text-xs text-slate-500">AMA Session</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock size={12} />
                  {new Date(session.scheduled_for).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="mt-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      session.status === "live"
                        ? "bg-green-100 text-green-700"
                        : session.status === "ended"
                        ? "bg-slate-100 text-slate-500"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {session.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

