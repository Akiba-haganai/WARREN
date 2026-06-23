import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Trash2 } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import { fetchAnnouncements, deleteAnnouncement } from "../../services/announcementService";

const CATEGORY_META: Record<string, { label: string; color: string; bg: string }> = {
  general:   { label: "General",   color: "text-slate-600 dark:text-slate-400",   bg: "bg-slate-100 dark:bg-slate-700/60"   },
  academic:  { label: "Academic",  color: "text-blue-600 dark:text-blue-400",     bg: "bg-blue-50 dark:bg-blue-900/20"      },
  events:    { label: "Events",    color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-900/20"  },
  sports:    { label: "Sports",    color: "text-emerald-600 dark:text-emerald-400",bg: "bg-emerald-50 dark:bg-emerald-900/20"},
  emergency: { label: "Emergency", color: "text-red-600 dark:text-red-400",       bg: "bg-red-50 dark:bg-red-900/20"        },
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d < 1) return "Today";
  if (d === 1) return "Yesterday";
  return `${d}d ago`;
}

export default function ManageAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAnnouncements()
      .then(setAnnouncements)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this announcement?")) return;
    setDeletingId(id);
    try {
      await deleteAnnouncement(id);
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Announcements</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {loading ? "Loading…" : `${announcements.length} bulletin${announcements.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Link
          to="/admin/announcements/new"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 dark:bg-cyan-500 text-white text-xs font-bold"
        >
          <PlusCircle size={14} />
          New
        </Link>
      </div>

      {/* Skeletons */}
      {loading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 animate-pulse">
              <div className="h-4 w-24 bg-slate-100 dark:bg-slate-700 rounded-full mb-3" />
              <div className="h-5 w-3/4 bg-slate-100 dark:bg-slate-700 rounded mb-2" />
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && announcements.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <span className="text-5xl">📢</span>
          <p className="text-base font-bold text-slate-500 dark:text-slate-400">No announcements yet</p>
          <Link to="/admin/announcements/new" className="text-sm text-blue-600 dark:text-cyan-400 font-semibold">
            Create the first one →
          </Link>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-3">
        {announcements.map((a) => {
          const meta = CATEGORY_META[a.category] ?? CATEGORY_META["general"];
          return (
            <div
              key={a.id}
              className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
                      {meta.label}
                    </span>
                    {a.created_at && (
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        {timeAgo(a.created_at)}
                      </span>
                    )}
                    {a.pinned && (
                      <span className="text-[11px] text-amber-600 dark:text-amber-400">📌</span>
                    )}
                  </div>
                  <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug mb-1 line-clamp-1">
                    {a.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {a.content}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(a.id)}
                  disabled={deletingId === a.id}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 disabled:opacity-40"
                  aria-label="Delete announcement"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}