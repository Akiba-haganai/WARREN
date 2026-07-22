import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { supabase } from "../../lib/supabase";
import { Loader2, Mic } from "lucide-react";
import { useToastStore } from "../../store/toastStore";

interface Lecturer {
  id: string;
  username: string | null;
}

interface Community {
  id: string;
  name: string;
}

export default function CreateAMAPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();

  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    lecturerId: "",
    communityId: "",
    scheduledFor: "",
    durationMinutes: 60,
  });

  useEffect(() => {
    async function load() {
      const [lecturersRes, communitiesRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, username")
          .eq("is_lecturer", true)
          .order("username"),
        supabase.from("communities").select("id, name").order("name"),
      ]);

      setLecturers((lecturersRes.data ?? []) as Lecturer[]);
      setCommunities((communitiesRes.data ?? []) as Community[]);
      setLoadingData(false);
    }

    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.lecturerId || !form.communityId || !form.scheduledFor) {
      showToast("Please fill in all fields", "err");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("ama_sessions").insert({
        lecturer_id: form.lecturerId,
        community_id: form.communityId,
        scheduled_for: new Date(form.scheduledFor).toISOString(),
        duration_minutes: form.durationMinutes,
        status: "scheduled",
      });

      if (error) throw error;

      showToast("AMA session created!", "ok");
      navigate("/admin");
    } catch (err: any) {
      showToast(err.message || "Failed to create AMA session", "err");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-lg mx-auto px-4 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center">
            <Mic size={18} className="text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              Create AMA Session
            </h1>
            <p className="text-xs text-slate-400">Schedule a lecturer Q&amp;A</p>
          </div>
        </div>

        {loadingData ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-slate-400" size={28} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Lecturer */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Lecturer
              </label>
              <select
                value={form.lecturerId}
                onChange={(e) => setForm((f) => ({ ...f, lecturerId: e.target.value }))}
                required
                className="w-full min-h-[44px] px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">Select a lecturer…</option>
                {lecturers.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.username || l.id}
                  </option>
                ))}
              </select>
              {lecturers.length === 0 && (
                <p className="text-xs text-amber-500 mt-1">
                  No lecturers found. Make sure profiles have{" "}
                  <code className="font-mono">is_lecturer = true</code>.
                </p>
              )}
            </div>

            {/* Community */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Community
              </label>
              <select
                value={form.communityId}
                onChange={(e) => setForm((f) => ({ ...f, communityId: e.target.value }))}
                required
                className="w-full min-h-[44px] px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">Select a community…</option>
                {communities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Date &amp; Time
              </label>
              <input
                type="datetime-local"
                value={form.scheduledFor}
                onChange={(e) => setForm((f) => ({ ...f, scheduledFor: e.target.value }))}
                required
                className="w-full min-h-[44px] px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Duration (minutes)
              </label>
              <input
                type="number"
                min={15}
                max={240}
                step={15}
                value={form.durationMinutes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, durationMinutes: parseInt(e.target.value) || 60 }))
                }
                required
                className="w-full min-h-[44px] px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-violet-500"
              />
              <p className="text-xs text-slate-400 mt-1">
                The cron job will automatically move the session to{" "}
                <strong>live</strong> at start time and to <strong>ended</strong> after the
                duration.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full min-h-[48px] bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Mic size={18} />
              )}
              {submitting ? "Creating…" : "Create AMA Session"}
            </button>
          </form>
        )}
      </div>
    </AppShell>
  );
}
