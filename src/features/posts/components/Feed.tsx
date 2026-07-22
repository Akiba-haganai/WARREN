import PostCard from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";
import type { PostWithProfile } from "../services/posts.service";

interface Props {
  posts: PostWithProfile[];
  isLoading: boolean;
  userVotes: Record<string, "up" | "down" | null>;
  onVote: (postId: string, type: "up" | "down") => void;
  onDelete: (postId: string) => void;
  onCommentClick: (post: PostWithProfile) => void;
  onPostClick: (post: PostWithProfile) => void;
  onOpenComposer?: () => void;
  currentUserName?: string;
  currentUserAvatar?: string | null;
  currentUserInitial?: string;
}

export function Feed({
  posts,
  isLoading,
  userVotes,
  onVote,
  onDelete,
  onCommentClick,
  onPostClick,
  onOpenComposer,
  currentUserName,
  currentUserAvatar,
  currentUserInitial,
}: Props) {
  if (isLoading && posts.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => <PostCardSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ─── "What's on your mind?" composer prompt ─── */}
      {onOpenComposer && (
        <div
          onClick={onOpenComposer}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onOpenComposer()}
          className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 shadow-sm cursor-pointer hover:shadow-md active:scale-[0.99] transition-all duration-150"
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
            {currentUserAvatar ? (
              <img
                src={currentUserAvatar}
                alt={currentUserName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{currentUserInitial ?? "?"}</span>
            )}
          </div>

          {/* Prompt text */}
          <span className="flex-1 text-sm text-slate-400 dark:text-slate-500">
            What's on your mind{currentUserName ? `, ${currentUserName}` : ""}?
          </span>

          {/* Subtle post button hint */}
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-3 py-1.5 rounded-full shrink-0">
            Post
          </span>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="text-center py-10 opacity-60">
          <p className="font-semibold">No posts yet</p>
          <p className="text-sm">Be the first to start a conversation.</p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            userVote={userVotes[post.id] ?? null}
            onVote={onVote}
            onDelete={onDelete}
            onCommentClick={() => onCommentClick(post)}
            onPostClick={() => onPostClick(post)}
          />
        ))
      )}
    </div>
  );
}