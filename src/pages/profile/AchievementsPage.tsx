import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { supabase } from "../../lib/supabase";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Trophy } from "lucide-react";

export default function AchievementsPage() {
  const { userId } = useParams<{ userId?: string }>();
  const currentUser = useAuthStore((s) => s.user);
  const targetUserId = userId || currentUser?.id;

  const [karma, setKarma] = useState(0);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!targetUserId) return;

    // fetch total karma from profiles
    supabase
      .from("profiles")
      .select("karma")
      .eq("id", targetUserId)
      .single()
      .then(({ data }) => {
        if (data) setKarma(data.karma);
      });

    // fetch karma events
    supabase
      .from("karma_events")
      .select("*")
      .eq("user_id", targetUserId)
      .order("created_at", { ascending: false })
      .limit(30)
      .then(({ data }) => setEvents(data ?? []));
  }, [targetUserId]);

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-2">Achievements</h1>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center mb-6">
          <Trophy size={40} className="mx-auto text-yellow-500 mb-2" />
          <p className="text-3xl font-black">{karma} ⚡</p>
          <p className="text-sm opacity-60">Total Karma</p>
        </div>
        <h2 className="font-bold mb-3">Karma History</h2>
        <div className="space-y-2">
          {events.map((e) => (
            <div
              key={e.id}
              className="bg-white dark:bg-slate-900 rounded-xl p-3 flex justify-between"
            >
              <div>
                <p className="text-sm font-medium capitalize">{e.reason.replace(/_/g, " ")}</p>
                <p className="text-xs opacity-60">{new Date(e.created_at).toLocaleDateString()}</p>
              </div>
              <span className="font-bold text-sm text-green-600">+{e.amount}</span>
            </div>
          ))}
          {events.length === 0 && <p className="text-sm opacity-60">No karma events yet.</p>}
        </div>
      </div>
    </AppShell>
  );
}