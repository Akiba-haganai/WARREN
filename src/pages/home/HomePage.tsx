import { useEffect, useRef, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import CreatePostSheet from "../../components/posts/CreatePostSheet";
import PostCard from "../../components/posts/PostCard";
import PostCardSkeleton from "../../components/posts/PostCardSkeleton";
import PullToRefresh from "../../components/ui/PullToRefresh";
import CommentSection from "../../components/comments/CommentSection";
import FeedToggle from "../../components/feed/FeedToggle";
import { Plus } from "lucide-react";

import { usePostStore } from "../../store/postStore";

export default function HomePage() {
  const {
    posts,
    loading,
    loadingMore,
    error,
    hasMore,
    sortMode,
    setSortMode,
    loadMore,
    refresh,
    vote,
    removePost,
    startRealtime,
    userVotes,
  } = usePostStore();

  const [openSheet, setOpenSheet] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [activeCommentPostOwner, setActiveCommentPostOwner] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const realtimeCleanup = useRef<(() => void) | null>(null);

  useEffect(() => {
    refresh();
    realtimeCleanup.current = startRealtime();
    return () => {
      realtimeCleanup.current?.();
    };
  }, []);

  useEffect(() => {
    if (sortMode !== "new" || !observerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore, loadMore, sortMode]);

  const handleVote = async (postId: string, type: "up" | "down") => {
    await vote(postId, type);
  };

  const handleDelete = async (postId: string) => {
    await removePost(postId);
  };

  // Get the currently active post object (for showing inside the drawer)
  const activePost = activeCommentPostId
    ? posts.find((p) => p.id === activeCommentPostId) ?? null
    : null;

  return (
    <>
      <AppShell>
        <PullToRefresh onRefresh={refresh}>
          <div className="px-4 pb-28">
            <div className="sticky top-0 z-20 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl pt-4 pb-3 mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Home Feed
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Live campus conversations
              </p>

              <div className="mt-4 rounded-2xl border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-900 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                      📜 Community Guidelines
                    </p>
                    <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">
                      Users are limited to 10 posts per hour to keep the feed high‑quality.
                    </p>
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

            {loading && posts.length === 0 && (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <PostCardSkeleton key={i} />
                ))}
              </div>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-4 rounded-2xl mb-4 text-sm flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            {!loading && posts.length === 0 && !error && (
              <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center space-y-3">
                <div className="text-6xl mb-3 animate-in fade-in zoom-in-95 duration-500">🎓</div>
                <h2 className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                  No posts yet
                </h2>
                <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                  Be the first student to start a conversation.
                </p>
              </div>
            )}

            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  userVote={userVotes[post.id] ?? null}
                  onVote={handleVote}
                  onDelete={handleDelete}
                  onCommentClick={() => {
                    setActiveCommentPostId(post.id);
                    setActiveCommentPostOwner(post.user_id);
                  }}
                  onPostClick={() => {
                    setActiveCommentPostId(post.id);
                    setActiveCommentPostOwner(post.user_id);
                  }}
                />
              ))}
            </div>

            {sortMode === "new" && (
              <>
                <div ref={observerRef} className="h-4" />
                {loadingMore && (
                  <div className="mt-4 space-y-4">
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                  </div>
                )}
              </>
            )}

            {!hasMore && posts.length > 0 && sortMode === "new" && (
              <p className="text-center text-sm text-slate-400 dark:text-slate-500 mt-8 pb-4">
                🎉 You're all caught up
              </p>
            )}
          </div>
        </PullToRefresh>
      </AppShell>

      <button
        onClick={() => setOpenSheet(true)}
        className="fixed bottom-24 right-5 z-40 min-h-[56px] min-w-[56px] px-5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all duration-200 motion-safe:active:scale-95 hover:shadow-xl"
      >
        <Plus size={24} />
        <span className="font-semibold text-base hidden sm:inline">Post</span>
      </button>

      <CreatePostSheet
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        onCreated={() => {
          setOpenSheet(false);
          refresh();
        }}
      />

      {activeCommentPostId && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => {
            setActiveCommentPostId(null);
            setActiveCommentPostOwner(null);
          }}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl p-4 animate-slide-up max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto max-h-[75vh]">
              {/* Show the full post content here */}
              {activePost && (
                <div className="mb-4">
                  <p className="text-sm sm:text-base whitespace-pre-wrap text-slate-700 dark:text-slate-200">
                    {activePost.content}
                  </p>
                  {activePost.image_url && (
                    <img
                      src={activePost.image_url}
                      alt="Post attachment"
                      className="w-full max-h-60 object-cover rounded-xl mt-3"
                    />
                  )}
                  {activePost.voice_url && (
                    <audio controls src={activePost.voice_url} className="w-full mt-2 h-8" />
                  )}
                </div>
              )}
              <CommentSection
                postId={activeCommentPostId}
                postOwnerId={activeCommentPostOwner}
                onClose={() => {
                  setActiveCommentPostId(null);
                  setActiveCommentPostOwner(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}