import { useEffect, useState } from "react";
import { Flag } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import { supabase } from "../../lib/supabase";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const { data, error } = await supabase
          .from("reports")
          .select("*, posts(content, user_id)")
          .order("created_at", { ascending: false });
        if (error) console.error(error);
        setReports(data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  return (
    <AppShell>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Reports</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          {loading ? "Loading…" : `${reports.length} report${reports.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Skeletons */}
      {loading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 animate-pulse">
              <div className="h-4 w-32 bg-slate-100 dark:bg-slate-700 rounded mb-3" />
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded mb-2" />
              <div className="h-3 w-3/4 bg-slate-100 dark:bg-slate-700 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && reports.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <span className="text-5xl">✅</span>
          <p className="text-base font-bold text-slate-500 dark:text-slate-400">No reports</p>
          <p className="text-sm text-slate-400 dark:text-slate-500">The community looks clean.</p>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-3">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4"
          >
            {/* Reason */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
                <Flag size={12} className="text-red-500 dark:text-red-400" />
              </div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
                {report.reason}
              </span>
              {report.created_at && (
                <span className="ml-auto text-[11px] text-slate-400 dark:text-slate-500 shrink-0">
                  {timeAgo(report.created_at)}
                </span>
              )}
            </div>

            {/* Reported post content */}
            {report.posts?.content && (
              <div className="bg-slate-50 dark:bg-slate-700/40 rounded-xl px-3 py-2 mt-2">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {report.posts.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </AppShell>
  );
}