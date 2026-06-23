import { useEffect, useRef, useState } from "react";


import AppShell from "../../components/layout/AppShell";
import CreatePostSheet from "../../components/posts/CreatePostSheet";
import PostCard from "../../components/posts/PostCard";
import PostCardSkeleton from "../../components/posts/PostCardSkeleton";
import PullToRefresh from "../../components/ui/PullToRefresh";
import CommentSection from "../../components/comments/CommentSection";
import FeedToggle from "../../components/feed/FeedToggle";
import FeedAd from "../../components/ads/FeedAd";
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
    userVotes, // reactive user votes map
  } = usePostStore();

  const [openSheet, setOpenSheet] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const realtimeCleanup = useRef<(() => void) | null>(null);

  // Fetch initial posts and start real-time subscription
  useEffect(() => {
    refresh();
    realtimeCleanup.current = startRealtime();
    return () => {
      realtimeCleanup.current?.();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Infinite scroll observer for "new" mode
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

  return (
    <>
      <AppShell>
        <PullToRefresh onRefresh={refresh}>
          <div className="px-4 pb-28">
            {/* Sticky header with info and toggle */}
            <div className="sticky top-0 z-20 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl pt-4 pb-3 mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Home Feed
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Live campus conversations
              </p>

              {/* Guidelines card – prettier */}
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

              {/* Feed toggle */}
              <div className="mt-4">
                <FeedToggle active={sortMode} onChange={setSortMode} />
              </div>
            </div>

            {/* Skeleton loading */}
            {loading && posts.length === 0 && (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <PostCardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-4 rounded-2xl mb-4 text-sm flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Empty state */}
            {!loading && posts.length === 0 && !error && (
              <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
                <div className="text-5xl mb-3">🎓</div>
                <h2 className="font-bold text-lg text-slate-900 dark:text-white">
                  No posts yet
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Be the first student to start a conversation.
                </p>
              </div>
            )}

            {/* Posts list */}
            <div className="space-y-4">
              {posts.map((post, index) => (
                <div key={post.id}>
                  <PostCard
                    post={post}
                    userVote={userVotes[post.id] ?? null}
                    onVote={handleVote}
                    onDelete={handleDelete}
                    onCommentClick={() => setActiveCommentPostId(post.id)}
                  />
                  {/* Insert ad after every 7 posts */}
                  {(index + 1) % 7 === 0 && (
                    <div className="mt-4">
                      <FeedAd />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Infinite scroll sentinel + loading skeletons for "new" mode */}
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

            {/* End‑of‑feed message */}
            {!hasMore && posts.length > 0 && sortMode === "new" && (
              <p className="text-center text-sm text-slate-400 dark:text-slate-500 mt-8 pb-4">
                🎉 You're all caught up
              </p>
            )}
          </div>
        </PullToRefresh>
      </AppShell>

      {/* Floating “Post” button */}
      <button
        onClick={() => setOpenSheet(true)}
        className="fixed bottom-24 right-5 z-40 h-14 px-5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-500/30 flex items-center gap-2 hover:scale-105 transition-all active:scale-95 animate-bounce-subtle"
      >
        <Plus size={20} />
        <span className="font-semibold text-sm">Post</span>
      </button>

      {/* Create post sheet */}
      <CreatePostSheet
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        onCreated={() => {
          setOpenSheet(false);
          refresh();
        }}
      />

      {/* Comment section drawer */}
      {activeCommentPostId && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setActiveCommentPostId(null)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl p-4 animate-slide-up max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto max-h-[75vh]">
              <CommentSection
                postId={activeCommentPostId}
                onClose={() => setActiveCommentPostId(null)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}