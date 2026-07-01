import { MessageCircle, Trash2 } from "lucide-react";
import type { PostWithProfile } from "../services/posts.service";
import { VoteButtons } from "./VoteButtons";

interface Props {
  post: PostWithProfile;
  userVote?: "up" | "down" | null;
  canDelete?: boolean;
  onVote: (type: "up" | "down") => void;
  onDelete: (postId: string) => void;
  onCommentClick: () => void;
  onPostClick: () => void;
}

export function FeedItem({ post, userVote, canDelete, onVote, onDelete, onCommentClick, onPostClick }: Props) {
  const username = post.profiles?.username ?? "Anonymous";
  const avatar = post.profiles?.avatar_url;
  const timeAgo = post.created_at ? new Date(post.created_at).toLocaleDateString() : "";

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-start gap-3">
        {avatar ? (
          <img src={avatar} alt={username} className="w-9 h-9 rounded-full object-cover shrink-0" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
            {username[0]?.toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">{username}</span>
            <span className="text-xs text-slate-400">{timeAgo}</span>
            {post.is_anonymous && <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded-full">Anon</span>}
          </div>
          <div onClick={onPostClick} className="cursor-pointer">
            <p className="text-sm whitespace-pre-wrap">{post.content}</p>
            {post.image_url && <img src={post.image_url} alt="Post" className="mt-2 rounded-xl max-h-60 w-full object-cover" />}
            {post.voice_url && <audio controls src={post.voice_url} className="mt-2 w-full h-8" />}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <VoteButtons upvotes={post.upvotes ?? 0} downvotes={post.downvotes ?? 0} userVote={userVote} onVote={onVote} />
            <button onClick={onCommentClick} className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600">
              <MessageCircle size={15} />
              <span>{post.comments_count}</span>
            </button>
            {canDelete && (
              <button onClick={() => onDelete(post.id)} className="ml-auto text-red-400 hover:text-red-600">
                <Trash2 size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}