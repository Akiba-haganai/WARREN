import { useEffect, useState, useRef, useCallback } from "react";
import { toast } from "sonner";

import AppShell from "../../components/layout/AppShell";
import CreatePostSheet from "../../components/posts/CreatePostSheet";
import PostCard from "../../components/posts/PostCard";
import PostCardSkeleton from "../../components/posts/PostCardSkeleton";
import PullToRefresh from "../../components/ui/PullToRefresh";
import CommentSection from "../../components/comments/CommentSection";
import FeedToggle from "../../components/feed/FeedToggle";
import FeedAd from "../../components/ads/FeedAd";

import { Plus } from "lucide-react";

import {
  fetchPosts,
  fetchHotPosts,
  subscribeToPosts,
  votePost,
  deletePost,
} from "../../services/postsService";

import type { PostWithProfile } from "../../services/postsService";
import { supabase } from "../../lib/supabase";

export default function HomePage() {
  const [openSheet, setOpenSheet] =
    useState(false);

  const [posts, setPosts] =
    useState<PostWithProfile[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [error, setError] =
    useState("");

  const [cursor, setCursor] =
    useState<string>();

  const [hasMore, setHasMore] =
    useState(true);

  const [sortMode, setSortMode] =
    useState<"hot" | "new">("hot");

  const [
    activeCommentPostId,
    setActiveCommentPostId,
  ] = useState<string | null>(null);

  const observerRef =
    useRef<HTMLDivElement | null>(null);

  const mountedRef =
    useRef(true);

  const refreshingRef =
    useRef(false);

  const votedPostsRef =
    useRef<Set<string>>(new Set());

  const loadPosts = useCallback(
    async (refetch = false) => {
      try {
        if (!mountedRef.current)
          return;

        if (sortMode === "hot") {
          setLoading(true);

          const data =
            await fetchHotPosts(20);

          if (!mountedRef.current)
            return;

          setPosts(data);
          setHasMore(false);
          setError("");

          return;
        }

        if (refetch) {
          setLoading(true);
          setPosts([]);
          setCursor(undefined);
          setHasMore(true);
        }

        const {
          data,
          nextCursor,
        } = await fetchPosts({
          cursor: refetch
            ? undefined
            : cursor,
          sortBy: "new",
        });

        if (!mountedRef.current)
          return;

        if (refetch) {
          setPosts(data);
        } else {
          setPosts((prev) => [
            ...prev,
            ...data,
          ]);
        }

        setCursor(
          nextCursor ?? undefined
        );

        setHasMore(
          Boolean(nextCursor)
        );

        setError("");
      } catch (err: any) {
        console.error(err);

        setError(
          err?.message ||
            "Failed to load posts"
        );
      } finally {
        if (mountedRef.current) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    },
    [cursor, sortMode]
  );

  const handleRefresh =
    async () => {
      if (refreshingRef.current)
        return;

      refreshingRef.current =
        true;

      try {
        await loadPosts(true);

        toast.success(
          "Feed refreshed"
        );
      } finally {
        refreshingRef.current =
          false;
      }
    };

  useEffect(() => {
    mountedRef.current = true;

    loadPosts(true);

    return () => {
      mountedRef.current = false;
    };
  }, [sortMode]);

  useEffect(() => {
    const channel =
      subscribeToPosts(
        (payload: any) => {
          const post =
            payload?.new;

          if (!post) return;

          setPosts((prev) => {
            const exists =
              prev.some(
                (p) =>
                  p.id ===
                  post.id
              );

            if (exists)
              return prev;

            return [
              post,
              ...prev,
            ];
          });
        }
      );

    return () => {
      supabase.removeChannel(
        channel
      );
    };
  }, []);

  useEffect(() => {
    if (
      sortMode !== "new" ||
      !observerRef.current
    ) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          const entry =
            entries[0];

          if (
            entry.isIntersecting &&
            hasMore &&
            !loading &&
            !loadingMore
          ) {
            setLoadingMore(true);
            loadPosts(false);
          }
        },
        {
          threshold: 0.1,
        }
      );

    observer.observe(
      observerRef.current
    );

    return () => {
      observer.disconnect();
    };
  }, [
    hasMore,
    loading,
    loadingMore,
    loadPosts,
    sortMode,
  ]);

  const handleVote = async (
  id: string,
  type: "up" | "down"
) => {
  const user =
    (await supabase.auth.getUser())
      .data.user;

  if (!user) {
    toast.error(
      "Please sign in to vote"
    );
    return;
  }

  if (
    votedPostsRef.current.has(id)
  ) {
    return;
  }

  votedPostsRef.current.add(id);

  try {
    await votePost(
      id,
      user.id,
      type
    );

    const updatedPosts =
      await (
        sortMode === "hot"
          ? fetchHotPosts(20)
          : fetchPosts({
              sortBy: "new",
            }).then(
              (r) => r.data
            )
      );

    if (mountedRef.current) {
      setPosts(updatedPosts);
    }
  } catch (error) {
    console.error(error);

    toast.error(
      "Failed to vote"
    );
  } finally {
    votedPostsRef.current.delete(
      id
    );
  }
};

  const handleDelete = async (
    postId: string
  ) => {
    const backup =
      [...posts];

    setPosts((prev) =>
      prev.filter(
        (p) => p.id !== postId
      )
    );

    try {
      await deletePost(postId);
    } catch {
      setPosts(backup);
    }
  };

  return (
    <>
      <AppShell>
        <PullToRefresh
          onRefresh={
            handleRefresh
          }
        >
          <div className="px-4 pb-28">
            <div className="sticky top-0 z-20 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl py-3 mb-4">
              <h1 className="text-2xl font-bold">
                Home Feed
              </h1>

              <p className="text-sm opacity-70">
                Live campus feed
              </p>

              <div className="mt-3 rounded-2xl border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                      Community
                      Guidelines
                    </p>

                    <p className="text-xs opacity-70 mt-1">
                      Users are limited
                      to 10 posts per
                      hour to reduce
                      spam and improve
                      feed quality.
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      10
                    </p>

                    <p className="text-xs opacity-70">
                      posts/hr
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <FeedToggle
                  active={sortMode}
                  onChange={
                    setSortMode
                  }
                />
              </div>
            </div>

            {loading &&
              posts.length ===
                0 && (
                <div className="space-y-4">
                  {[...Array(3)].map(
                    (_, i) => (
                      <PostCardSkeleton
                        key={i}
                      />
                    )
                  )}
                </div>
              )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-3 rounded-2xl mb-4">
                {error}
              </div>
            )}

            {!loading &&
              posts.length ===
                0 && (
                <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
                  <div className="text-5xl mb-3">
                    🎓
                  </div>

                  <h2 className="font-bold text-lg">
                    No posts yet
                  </h2>

                  <p className="text-sm opacity-70 mt-2">
                    Be the first
                    student to start
                    a conversation.
                  </p>
                </div>
              )}

            <div className="space-y-4">
  {posts.map((post, index) => (
    <div key={post.id}>
      <PostCard
        post={post}
        onVote={handleVote}
        onDelete={handleDelete}
        onCommentClick={() =>
          setActiveCommentPostId(
            post.id
          )
        }
      />

      {(index + 1) % 7 === 0 && (
        <div className="mt-4">
          <FeedAd />
        </div>
      )}
    </div>
  ))}
</div>

            {sortMode ===
              "new" && (
              <>
                <div
                  ref={
                    observerRef
                  }
                  className="h-4"
                />

                {loadingMore && (
                  <div className="mt-4 space-y-4">
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                  </div>
                )}
              </>
            )}

            {!hasMore &&
              posts.length >
                0 &&
              sortMode ===
                "new" && (
                <p className="text-center text-sm opacity-60 mt-6">
                  You're all
                  caught up 🎉
                </p>
              )}
          </div>
        </PullToRefresh>
      </AppShell>

      {activeCommentPostId && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
          onClick={() =>
            setActiveCommentPostId(
              null
            )
          }
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl p-4 animate-slide-up max-h-[80vh] overflow-hidden"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="overflow-y-auto max-h-[75vh]">
              <CommentSection
                postId={
                  activeCommentPostId
                }
                onClose={() =>
                  setActiveCommentPostId(
                    null
                  )
                }
              />
            </div>
          </div>
        </div>
      )}

      <CreatePostSheet
        open={openSheet}
        onClose={() =>
          setOpenSheet(false)
        }
        onCreated={() => {
          setOpenSheet(false);
          loadPosts(true);
        }}
      />

      <button
        onClick={() =>
          setOpenSheet(true)
        }
        className="fixed bottom-24 right-5 z-40 h-14 px-5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl flex items-center gap-2 hover:scale-105 transition-all active:scale-95 animate-bounce-subtle"
      >
        <Plus size={20} />
        Post
      </button>
    </>
  );
}