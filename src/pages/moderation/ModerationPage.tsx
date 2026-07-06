import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { useUserRole } from "../../hooks/useUserRole";
import {
  fetchAllPostsForModeration,
  fetchAllCommentsForModeration,
  deletePost,
  deleteComment,
} from "../../features/posts/services/posts.service";
import type { PostWithProfile } from "../../features/posts/services/posts.service";
import { Trash2, AlertTriangle } from "lucide-react";

export default function ModerationPage() {
  const { role } = useUserRole();
  const [posts, setPosts] = useState<PostWithProfile[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"posts" | "comments">("posts");

  // Always call hooks – never early‑return before them
  const loadData = async () => {
    setLoading(true);
    const [p, c] = await Promise.all([
      fetchAllPostsForModeration(),
      fetchAllCommentsForModeration(),
    ]);
    setPosts(p);
    setComments(c);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeletePost = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;

    const deleted = posts.find((p) => p.id === id);
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));

    if (deleted?.user_id) {
      try {
        const { createNotification } = await import(
          "../../features/notifications/services/notifications.service"
        );
        await createNotification(
          deleted.user_id,
          "Your post was removed",
          `A moderator removed your post: "${deleted.content?.slice(0, 50)}…"`,
          "moderation"
        );
      } catch (err) {
        // Notifications should never break moderation actions.
        console.warn("Failed to notify post author", err);
      }
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (!confirm("Delete this comment permanently?")) return;

    const deleted = comments.find((c) => c.id === id);
    await deleteComment(id);
    setComments((prev) => prev.filter((c) => c.id !== id));

    if (deleted?.user_id) {
      try {
        const { createNotification } = await import(
          "../../features/notifications/services/notifications.service"
        );
        await createNotification(
          deleted.user_id,
          "Your comment was removed",
          `A moderator removed your comment: "${deleted.content?.slice(0, 50)}…"`,
          "moderation"
        );
      } catch (err) {
        console.warn("Failed to notify comment author", err);
      }
    }
  };

  // Only after all hooks, render the appropriate UI
  if (role !== "admin" && role !== "moderator") {
    return (
      <AppShell>
        <div className="p-6 text-center">
          <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
          <h1 className="text-xl font-bold">Access Denied</h1>
          <p className="opacity-70 mt-2">Only moderators and admins can view this page.</p>
        </div>
      </AppShell>
    );
  }

  if (loading) return (
    <AppShell>
      <div className="p-4 space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
        ))}
      </div>
    </AppShell>
  );

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Moderation</h1>

        <div className="flex bg-slate-200 dark:bg-slate-800 rounded-full p-1 mb-4">
          <button
            onClick={() => setTab("posts")}
            className={`flex-1 text-sm font-medium py-2 rounded-full transition ${
              tab === "posts" ? "bg-white dark:bg-slate-700 shadow-sm" : "text-slate-500"
            }`}
          >
            Posts ({posts.length})
          </button>
          <button
            onClick={() => setTab("comments")}
            className={`flex-1 text-sm font-medium py-2 rounded-full transition ${
              tab === "comments" ? "bg-white dark:bg-slate-700 shadow-sm" : "text-slate-500"
            }`}
          >
            Comments ({comments.length})
          </button>
        </div>

        {tab === "posts" && (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-slate-900 rounded-2xl p-4 flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm">{post.profiles?.username ?? "Anonymous"}</p>
                  <p className="text-xs opacity-70 line-clamp-2">{post.content}</p>
                </div>
                <button
                  aria-label="Delete post"
                  onClick={() => handleDeletePost(post.id)}
                  className="text-red-400 hover:text-red-600 ml-3 shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {posts.length === 0 && <p className="text-center opacity-60">No posts.</p>}
          </div>
        )}

        {tab === "comments" && (
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white dark:bg-slate-900 rounded-2xl p-4 flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm">{comment.profiles?.username ?? "Anonymous"}</p>
                  <p className="text-xs opacity-70">{comment.content}</p>
                </div>
                <button
                  aria-label="Delete comment"
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-400 hover:text-red-600 ml-3 shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {comments.length === 0 && <p className="text-center opacity-60">No comments.</p>}
          </div>
        )}
      </div>
    </AppShell>
  );
}