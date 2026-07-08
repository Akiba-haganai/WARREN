import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import AppShell from "../../components/layout/AppShell";
import { usePosts } from "../../features/posts/hooks/usePosts";
import { usePostVote } from "../../features/posts/hooks/usePostVote";
import { deletePost } from "../../features/posts/services/posts.service";
import { usePostsStore } from "../../features/posts/store/posts.store";
import { Feed } from "../../features/posts/components/Feed";
import CreatePostSheet from "../../features/posts/components/CreatePostSheet";
import CommentSection from "../../components/comments/CommentSection";
import FeedToggle from "../../components/feed/FeedToggle";
import { Plus } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export default function HomePage() {
  const currentUser = useAuthStore((s) => s.user);
  const sortMode = usePostsStore((s) => s.sortMode);
  const setSortMode = usePostsStore((s) => s.setSortMode);
  const { posts, isLoading, isError, error, refetch } = usePosts();
  const voteMutation = usePostVote();

  const [openSheet, setOpenSheet] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [activeCommentPostOwner, setActiveCommentPostOwner] = useState<string | null>(null);

  const activePost = activeCommentPostId ? posts.find((p) => p.id === activeCommentPostId) ?? null : null;

  const handleVote = (postId: string, type: "up" | "down") => {
    voteMutation.mutate({ postId, type });
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Delete this post?")) return;
    await deletePost(postId);
    refetch();
  };

  const currentUserId = currentUser?.id;
  const { data: userVotes = {} } = useQuery({
    queryKey: ["userVotes", currentUserId, posts.map(p => p.id)],
    queryFn: async () => {
      if (!currentUserId || posts.length === 0) return {};
      const { data } = await supabase
        .from("post_votes")
        .select("post_id, vote_type")
        .eq("user_id", currentUserId)
        .in("post_id", posts.map(p => p.id));
      const votes: Record<string, "up" | "down" | null> = {};
      (data ?? []).forEach(v => { votes[v.post_id] = v.vote_type as "up" | "down"; });
      return votes;
    },
    enabled: !!currentUserId && posts.length > 0,
  });

  return (
    <>
      <AppShell>
        <div className="px-4 pb-28">
          <div className="sticky top-0 z-20 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl pt-4 pb-3 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Home Feed</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Live campus conversations</p>
            <div className="mt-4 rounded-2xl border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-900 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">📜 Community Guidelines</p>
                  <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">Users are limited to 10 posts per hour to keep the feed high‑quality.</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">10</p>
                  <p className="text-xs text-blue-600/70 dark:text-blue-400/70">posts/hr</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <FeedToggle active={sortMode} onChange={setSortMode} />
            </div>
          </div>

          {isError && <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-4">{error?.message}</div>}

          <Feed
            posts={posts}
            isLoading={isLoading}
            userVotes={userVotes}
            onVote={handleVote}
            onDelete={handleDelete}
            onCommentClick={(post) => {
              setActiveCommentPostId(post.id);
              setActiveCommentPostOwner(post.user_id);
            }}
            onPostClick={(post) => {
              setActiveCommentPostId(post.id);
              setActiveCommentPostOwner(post.user_id);
            }}
          />
        </div>
      </AppShell>

      {/* FAB */}
      <button
        onClick={() => setOpenSheet(true)}
        className="fixed bottom-24 right-5 z-50 min-h-[56px] min-w-[56px] px-5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-transform duration-150 ease-out hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/40 touch-manipulation"
      >
        <Plus size={24} />
        <span className="font-semibold text-base hidden sm:inline">Post</span>
      </button>


      <CreatePostSheet open={openSheet} onClose={() => setOpenSheet(false)} onCreated={() => { setOpenSheet(false); refetch(); }} />

      {activeCommentPostId && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm" onClick={() => { setActiveCommentPostId(null); setActiveCommentPostOwner(null); }}>
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl p-4 animate-slide-up max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-y-auto max-h-[75vh]">
              {activePost && (
                <div className="mb-4">
                  <p className="text-sm whitespace-pre-wrap">{activePost.content}</p>
                  {activePost.image_url && <img src={activePost.image_url} alt="Post" className="w-full max-h-60 object-cover rounded-xl mt-3" />}
                  {activePost.voice_url && <audio controls src={activePost.voice_url} className="w-full mt-2 h-8" />}
                </div>
              )}
              <CommentSection postId={activeCommentPostId} postOwnerId={activeCommentPostOwner} onClose={() => { setActiveCommentPostId(null); setActiveCommentPostOwner(null); }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}