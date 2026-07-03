import { useEffect, useState } from "react";
import { Flag, MessageCircle } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

interface Report {
  id: string;
  post_id: string | null;      // nullable in DB
  reporter_id: string;
  reason: string;
  created_at: string | null;
  material_id?: string | null;
}

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
}

interface PostContent {
  id: string;
  content: string | null;
  user_id: string | null;      // nullable in DB
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function ReportsPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [reporters, setReporters] = useState<Record<string, Profile>>({});
  const [posts, setPosts] = useState<Record<string, PostContent>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const { data, error } = await supabase
          .from("reports")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error(error);
          setLoading(false);
          return;
        }

        const reportsList = data ?? [];
        setReports(reportsList as Report[]);

        // Collect unique reporter IDs
        const reporterIds = [...new Set(reportsList.map((r) => r.reporter_id))];
        // Collect unique post IDs, filter out nulls
        const postIds = [...new Set(reportsList.map((r) => r.post_id).filter((id): id is string => id !== null))];

        if (reporterIds.length > 0) {
          const { data: users } = await supabase
            .from("profiles")
            .select("id, username, avatar_url")
            .in("id", reporterIds);
          const map: Record<string, Profile> = {};
          (users ?? []).forEach((u) => {
            map[u.id] = u;
          });
          setReporters(map);
        }

        if (postIds.length > 0) {
          const { data: postsData } = await supabase
            .from("posts")
            .select("id, content, user_id")
            .in("id", postIds);
          const map: Record<string, PostContent> = {};
          (postsData ?? []).forEach((p) => {
            map[p.id] = p as PostContent;
          });
          setPosts(map);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  const handleMessageReporter = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Reports
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          {loading ? "Loading…" : `${reports.length} report${reports.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {loading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 animate-pulse"
            >
              <div className="h-4 w-32 bg-slate-100 dark:bg-slate-700 rounded mb-3" />
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded mb-2" />
              <div className="h-3 w-3/4 bg-slate-100 dark:bg-slate-700 rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && reports.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <span className="text-5xl">✅</span>
          <p className="text-base font-bold text-slate-500 dark:text-slate-400">No reports</p>
          <p className="text-sm text-slate-400 dark:text-slate-500">The community looks clean.</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {reports.map((report) => {
          const reporter = reporters[report.reporter_id];
          const post = report.post_id ? posts[report.post_id] : null;

          return (
            <div
              key={report.id}
              className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                    <Flag size={12} className="text-red-500" />
                  </div>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {report.reason}
                  </span>
                </div>
                {report.created_at && (
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    {timeAgo(report.created_at)}
                  </span>
                )}
              </div>

              {reporter && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center text-[10px] font-bold">
                    {reporter.username?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Reported by {reporter.username ?? "Anonymous"}
                  </span>
                  <button
                    onClick={() => handleMessageReporter(report.reporter_id)}
                    className="ml-auto p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg"
                    title="Message reporter"
                    aria-label="Message reporter"
                  >
                    <MessageCircle size={14} />
                  </button>
                </div>
              )}

              {post?.content && (
                <div className="bg-slate-50 dark:bg-slate-700/40 rounded-xl px-3 py-2 mt-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {post.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}