import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { useAuthStore } from "../../store/authStore";
import { getSavedPosts } from "../../services/savedPostsService";
import PostCard from "../../components/posts/PostCard";
import { Bookmark } from "lucide-react";

export default function SavedPostsPage() {
  const user = useAuthStore((s) => s.user);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getSavedPosts(user.id)
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const handleUnsave = (postId: string) => {
    setPosts((prev) => prev.filter((item) => item.posts.id !== postId));
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-2">Saved Posts</h1>
        <p className="text-sm opacity-70 mb-6">Your bookmarked posts</p>

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <Bookmark size={48} className="mx-auto opacity-30 mb-3" />
            <p className="opacity-60">No saved posts yet</p>
            <p className="text-sm opacity-50 mt-1">Bookmark posts to save them for later</p>
          </div>
        )}

        <div className="space-y-4">
          {posts.map((item) => (
            <PostCard
              key={item.posts.id}
              post={{
                ...item.posts,
                comments_count: 0,
              }}
              userVote={null}
              onVote={() => {}}
              onDelete={() => handleUnsave(item.posts.id)}
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}