import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useAuthStore } from "../../store/authStore";
import { useUserRole } from "../../hooks/useUserRole";
import { Send, Trash2 } from "lucide-react";

interface Props {
  postId: string;
  onClose?: () => void;
}

const COMMENT_LIMIT = 30;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_COMMENT_LENGTH = 500;

export default function CommentSection({ postId }: Props) {
  const [comments, setComments] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const user = useAuthStore((s) => s.user);
  const { role } = useUserRole();

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select(
          `
          id,
          content,
          created_at,
          user_id,
          profiles (
            username,
            role
          )
        `
        )
        .eq("post_id", postId)
        .order("created_at", {
          ascending: true,
        });

      if (error) throw error;

      setComments(data ?? []);
    } catch (error) {
      console.error("Failed to load comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();

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
        () => {
          loadComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  const handleSubmit = async () => {
    if (sending) return;

    const trimmedContent = content.trim();

    if (
      !user ||
      trimmedContent.length < 2 ||
      trimmedContent.length > MAX_COMMENT_LENGTH
    ) {
      return;
    }

    const key = `comment_limit_${user.id}`;

    const stored = JSON.parse(
      localStorage.getItem(key) || "[]"
    ) as number[];

    const now = Date.now();

    const validComments = stored.filter(
      (time) => now - time < WINDOW_MS
    );

    if (
      validComments.length >=
      COMMENT_LIMIT
    ) {
      alert(
        "You have reached the limit of 30 comments per hour. Please try again later."
      );
      return;
    }

    try {
      setSending(true);

      const { error } = await supabase
        .from("comments")
        .insert({
          post_id: postId,
          user_id: user.id,
          content: trimmedContent,
        });

      if (error) throw error;

      validComments.push(now);

      localStorage.setItem(
        key,
        JSON.stringify(validComments)
      );

      setContent("");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.message ??
          "Failed to post comment"
      );
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (
    commentId: string
  ) => {
    const confirmed = confirm(
      "Delete this comment?"
    );

    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

      if (error) throw error;
    } catch (error: any) {
      alert(
        error?.message ??
          "Failed to delete comment"
      );
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-sm opacity-60">
        Loading comments...
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-start gap-3"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 text-white flex items-center justify-center text-xs font-bold shadow-sm shrink-0">
              {comment.profiles?.username
                ?.charAt(0)
                .toUpperCase() ?? "?"}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                  {comment.profiles?.username ??
                    "Anonymous"}
                </span>

                {comment.profiles?.role &&
                  comment.profiles.role !==
                    "student" && (
                    <span
                      className={`text-[8px] font-bold tracking-wider px-1.5 py-0.5 rounded-full uppercase border ${
                        comment.profiles.role ===
                        "admin"
                          ? "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50"
                          : "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50"
                      }`}
                    >
                      {comment.profiles.role}
                    </span>
                  )}
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 whitespace-pre-wrap break-words">
                {comment.content}
              </p>
            </div>

            {(user?.id ===
              comment.user_id ||
              role === "moderator" ||
              role === "admin") && (
              <button
                aria-label="Delete comment"
                onClick={() =>
                  handleDelete(comment.id)
                }
                className="text-slate-400 hover:text-rose-500 p-1 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-center text-sm opacity-50 py-4">
            No comments yet. Be the first
            to reply!
          </p>
        )}
      </div>

      <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
        <div className="flex-1">
          <input
            value={content}
            maxLength={
              MAX_COMMENT_LENGTH
            }
            onChange={(e) => {
              if (
                e.target.value.length <=
                MAX_COMMENT_LENGTH
              ) {
                setContent(
                  e.target.value
                );
              }
            }}
            placeholder="Write a comment..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 dark:focus:border-cyan-400"
          />

          <div className="mt-1 text-right text-[11px] opacity-50">
            {content.length}/
            {MAX_COMMENT_LENGTH}
          </div>
        </div>

        <button
          aria-label="Submit comment"
          onClick={handleSubmit}
          disabled={
            sending ||
            content.trim().length < 2
          }
          className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl px-4 py-2.5 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform duration-200 disabled:opacity-50 disabled:hover:scale-100"
        >
          {sending ? (
            <div className="text-xs">
              Sending...
            </div>
          ) : (
            <Send size={15} />
          )}
        </button>
      </div>
    </div>
  );
}