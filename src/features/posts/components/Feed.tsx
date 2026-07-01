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
}

export function Feed({ posts, isLoading, userVotes, onVote, onDelete, onCommentClick, onPostClick }: Props) {
  if (isLoading && posts.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => <PostCardSkeleton key={i} />)}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10 opacity-60">
        <p className="font-semibold">No posts yet</p>
        <p className="text-sm">Be the first to start a conversation.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          userVote={userVotes[post.id] ?? null}
          onVote={onVote}
          onDelete={onDelete}
          onCommentClick={() => onCommentClick(post)}
          onPostClick={() => onPostClick(post)}
        />
      ))}
    </div>
  );
}