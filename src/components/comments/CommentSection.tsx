import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import { useAuthStore } from "../../store/authStore";
import { useUserRole } from "../../hooks/useUserRole";
import { Link } from "react-router-dom";
import {
  Send,
  Trash2,
  ImageIcon,
  ArrowBigUp,
  ArrowBigDown,
  X,
  Loader2,
} from "lucide-react";

interface Props {
  postId: string;
  postOwnerId?: string | null;
  onClose?: () => void;
}

interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string | null;
  image_url: string | null;
  created_at: string;
  parent_id?: string | null;
  profiles?: {
    username?: string;
    avatar_url?: string;
    role?: string;
  };
  upvotes: number;
  downvotes: number;
  userVote: "up" | "down" | null;
}

const MAX_COMMENT_LENGTH = 500;

export default function CommentSection({ postId, postOwnerId, onClose }: Props) {
  const user = useAuthStore((s) => s.user);
  const { role } = useUserRole();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const imagePreview = useMemo(() => {
    if (!imageFile) return null;
    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  const loadComments = useCallback(async () => {
    try {
      const { data: commentsData, error } = await supabase
        .from("comments")
        .select(`*, profiles(username, avatar_url, role)`)
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      const ids = commentsData?.map((c) => c.id) ?? [];
      let votes: any[] = [];
      if (ids.length) {
        const { data } = await supabase
          .from("comment_votes")
          .select("comment_id,user_id,vote_type")
          .in("comment_id", ids);
        votes = data ?? [];
      }

      const mapped: Comment[] = (commentsData ?? []).map((comment) => {
        const commentVotes = votes.filter((v) => v.comment_id === comment.id);
        return {
          ...comment,
          profiles: Array.isArray(comment.profiles)
            ? comment.profiles[0] ?? undefined
            : comment.profiles ?? undefined,
          upvotes: commentVotes.filter((v) => v.vote_type === "up").length,
          downvotes: commentVotes.filter((v) => v.vote_type === "down").length,
          userVote:
            commentVotes.find((v) => v.user_id === user?.id)?.vote_type ?? null,
        } as Comment;
      });

      setComments(mapped);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [postId, user?.id]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  useEffect(() => {
    const channel = supabase
      .channel(`comments-${postId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
          filter: `post_id=eq.${postId}`,
        },
        () => loadComments()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, loadComments]);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  async function handleSubmit() {
    if (sending || !user) return;
    if (!content.trim() && !imageFile) return;
    setSending(true);
    setError("");

    try {
      let imageUrl = null;
      if (imageFile) {
        const fileName = `${user.id}/${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("comment-images")
          .upload(fileName, imageFile, { upsert: false });
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("comment-images").getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      const { error: insertError } = await supabase.from("comments").insert({
        post_id: postId,
        user_id: user.id,
        content: content.trim(),
        image_url: imageUrl,
      });

      if (insertError) throw insertError;

      // Build a local comment object for instant UI update
      const newComment: Comment = {
        id: crypto.randomUUID(), // temporary ID – will be replaced when realtime fires
        post_id: postId,
        user_id: user.id,
        content: content.trim(),
        image_url: imageUrl,
        created_at: new Date().toISOString(),
        profiles: {
          username: user.user_metadata?.username || "You",
          avatar_url: user.user_metadata?.avatar_url || null,
          role: "student",
        },
        upvotes: 0,
        downvotes: 0,
        userVote: null,
      };

      setComments((prev) => [...prev, newComment]);
      setContent("");
      setImageFile(null);
    } catch (err: any) {
      setError(err?.message || "Failed to post comment");
    } finally {
      setSending(false);
    }
  }

  async function handleVote(commentId: string, type: "up" | "down") {
    if (!user) return;
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;
    const current = comment.userVote;

    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== commentId) return c;
        let up = c.upvotes;
        let down = c.downvotes;
        if (current === "up") up--;
        if (current === "down") down--;
        if (current !== type) {
          if (type === "up") up++;
          if (type === "down") down++;
        }
        return {
          ...c,
          upvotes: up,
          downvotes: down,
          userVote: current === type ? null : type,
        };
      })
    );

    if (current === type) {
      await supabase.from("comment_votes").delete().eq("comment_id", commentId).eq("user_id", user.id);
    } else {
      await supabase.from("comment_votes").upsert({ comment_id: commentId, user_id: user.id, vote_type: type });
    }
  }

  async function handleDelete(id: string) {
    setComments((prev) => prev.filter((c) => c.id !== id));
    await supabase.from("comments").delete().eq("id", id);
  }

  const canDelete = (commentUserId: string) =>
    user?.id === commentUserId || role === "admin" || role === "moderator" || user?.id === postOwnerId;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-800">
        <h3 className="font-semibold text-sm">Comments</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close comments"
            title="Close comments"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        {loading ? (
          <div className="text-center py-4 text-sm text-slate-500">Loading...</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-4 text-sm text-slate-500">No comments yet. Start the discussion!</div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className={`flex gap-2 group ${
                comment.parent_id
                  ? "ml-6 pl-3 border-l-2 border-slate-200 dark:border-slate-700"
                  : ""
              }`}
            >
              <Link to={`/profile/${comment.user_id}`} className="shrink-0 mt-0.5">
                {comment.profiles?.avatar_url ? (
                  <img src={comment.profiles.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold text-xs">
                    {comment.profiles?.username?.[0]?.toUpperCase() ?? "?"}
                  </div>
                )}
              </Link>

              <div className="flex-1 min-w-0">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl px-3 py-2">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Link to={`/profile/${comment.user_id}`} className="text-xs font-semibold hover:underline">
                      {comment.profiles?.username ?? "Anonymous"}
                    </Link>
                    <span className="text-[10px] text-slate-400">
                      {new Date(comment.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  {comment.content && <p className="text-sm leading-relaxed whitespace-pre-wrap">{comment.content}</p>}
                  {comment.image_url && (
                    <img src={comment.image_url} alt="" loading="lazy" className="mt-1 rounded-lg max-h-32 w-full object-cover" />
                  )}
                </div>

                <div className="flex items-center gap-3 mt-0.5 pl-0.5">
                  <button
                    onClick={() => handleVote(comment.id, "up")}
                    className={`flex items-center gap-0.5 text-[10px] ${
                      comment.userVote === "up" ? "text-emerald-500 font-semibold" : "text-slate-400"
                    }`}
                  >
                    <ArrowBigUp size={14} />
                    {comment.upvotes}
                  </button>
                  <button
                    onClick={() => handleVote(comment.id, "down")}
                    className={`flex items-center gap-0.5 text-[10px] ${
                      comment.userVote === "down" ? "text-red-500 font-semibold" : "text-slate-400"
                    }`}
                  >
                    <ArrowBigDown size={14} />
                    {comment.downvotes}
                  </button>
                  {canDelete(comment.user_id) && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="ml-auto text-red-400 hover:text-red-600 p-0.5 opacity-0 group-hover:opacity-100 transition"
                      aria-label="Delete comment"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={commentsEndRef} />
      </div>

      {error && <div className="px-3 py-1 text-xs text-red-500">{error}</div>}

      <div className="border-t border-slate-100 dark:border-slate-800 px-3 py-2">
        <div className="flex items-end gap-2">
          <textarea
            rows={1}
            value={content}
            maxLength={MAX_COMMENT_LENGTH}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a comment..."
            className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2 text-xs resize-none outline-none min-h-[36px] max-h-[80px]"
          />
          <label className="cursor-pointer p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
            <ImageIcon size={16} className="text-slate-500" />
          </label>
          <button
            onClick={handleSubmit}
            disabled={sending || (!content.trim() && !imageFile)}
            className="p-2 bg-blue-600 text-white rounded-full disabled:opacity-50 shrink-0"
            aria-label="Send comment"
          >
            {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          </button>
        </div>
        {imagePreview && (
          <div className="relative mt-2">
            <img src={imagePreview} alt="" className="h-16 rounded-lg object-cover" />
            <button
              onClick={() => setImageFile(null)}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"
              aria-label="Remove image"
              title="Remove image"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

