import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { fetchRecentActivity } from "../../services/profileService";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { MessageSquare } from "lucide-react";

export default function MyDiscussionsPage() {
  const { userId } = useParams<{ userId?: string }>();
  const currentUser = useAuthStore((s) => s.user);
  const targetUserId = userId || currentUser?.id;

  const [activities, setActivities] = useState<{ posts: any[]; comments: any[] }>({ posts: [], comments: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!targetUserId) return;
    fetchRecentActivity(targetUserId).then(setActivities).finally(() => setLoading(false));
  }, [targetUserId]);

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Discussions</h1>
        {loading ? (
          <p className="opacity-60">Loading...</p>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="font-semibold mb-2 flex items-center gap-2">
                <MessageSquare size={16} /> Posts
              </h2>
              {activities.posts.map((p) => (
                <div key={p.id} className="bg-white dark:bg-slate-900 rounded-xl p-3 mb-2">
                  <p className="text-sm">{p.content}</p>
                  <p className="text-xs opacity-60 mt-1">{new Date(p.created_at).toLocaleDateString()}</p>
                </div>
              ))}
              {activities.posts.length === 0 && <p className="text-sm opacity-60">No posts.</p>}
            </div>
            <div>
              <h2 className="font-semibold mb-2 flex items-center gap-2">
                <MessageSquare size={16} /> Comments
              </h2>
              {activities.comments.map((c) => (
                <div key={c.id} className="bg-white dark:bg-slate-900 rounded-xl p-3 mb-2">
                  <p className="text-sm">{c.content}</p>
                  <p className="text-xs opacity-60 mt-1">{new Date(c.created_at).toLocaleDateString()}</p>
                </div>
              ))}
              {activities.comments.length === 0 && <p className="text-sm opacity-60">No comments.</p>}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}