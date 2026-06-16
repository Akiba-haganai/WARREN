import { useState, useEffect } from "react";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
  Bookmark,
  Trash2,
  Flag,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import type { PostWithProfile } from "../../services/postsService";
import { useUserRole } from "../../hooks/useUserRole";
import { useAuthStore } from "../../store/authStore";
import { reportPost } from "../../services/reportService";
import { savePost, unsavePost, isPostSaved } from "../../services/savedPostsService";

interface Props {
  post: PostWithProfile;
  onVote: (
    id: string,
    type: "up" | "down"
  ) => void;
  onDelete?: (
    id: string
  ) => void;
  onCommentClick?: () => void;
}

export default function PostCard({
  post,
  onVote,
  onDelete,
  onCommentClick,
}: Props) {
  const { role } =
    useUserRole();

  const user =
    useAuthStore(
      (s) => s.user
    );

  const isOwner =
    user?.id ===
    post.user_id;

  const canDelete =
    isOwner ||
    role === "moderator" ||
    role === "admin";

  const handleReport =
    async () => {
      if (!user) {
        alert(
          "Please sign in to report posts."
        );
        return;
      }

      const reason =
        prompt(
          "Reason for reporting?"
        );

      if (!reason?.trim())
        return;

      try {
        await reportPost(
          post.id,
          user.id,
          reason.trim()
        );

        alert(
          "Report submitted."
        );
      } catch (error) {
        console.error(
          error
        );

        alert(
          "Failed to submit report."
        );
      }
    };

  const handleShare =
    async () => {
      const shareUrl = `${window.location.origin}/post/${post.id}`;

      try {
        if (
          navigator.share
        ) {
          await navigator.share(
            {
              title:
                "Warren",
              text:
                post.content ?? undefined,
              url: shareUrl,
            }
          );
        } else {
          await navigator.clipboard.writeText(
            shareUrl
          );

          alert(
            "Link copied to clipboard."
          );
        }
      } catch (
        error
      ) {
        console.error(
          error
        );
      }
    };

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    isPostSaved(user.id, post.id).then(setSaved).catch(() => {});
  }, [user, post.id]);

  const handleSaveToggle = async () => {
    if (!user) {
      alert("Please sign in to save posts.");
      return;
    }

    try {
      if (saved) {
        await unsavePost(user.id, post.id);
        setSaved(false);
      } else {
        await savePost(user.id, post.id);
        setSaved(true);
      }
    } catch {
      // revert on failure
      setSaved((prev) => !prev);
    }
  };

  const displayName =
    post.profiles
      ?.username ??
    "Anonymous";

  const displayRole =
    post.profiles?.role ??
    "student";

  return (
    <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">

      <div className="p-5">

        <div className="flex items-start gap-3">

          <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold shadow-md shrink-0">
            {displayName
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">

            <div className="flex items-center gap-2 flex-wrap">

              <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                {displayName}
              </h3>

              {displayRole ===
                "admin" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400 text-[10px] font-bold uppercase">
                  <ShieldCheck size={10} />
                  Admin
                </span>
              )}

              {displayRole ===
                "moderator" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 text-[10px] font-bold uppercase">
                  <ShieldCheck size={10} />
                  Moderator
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1 text-xs opacity-60">

              <span>
                {displayRole}
              </span>

              <span>
                •
              </span>

              <span>
                {post.created_at
                  ? formatDistanceToNow(
                      new Date(
                        post.created_at
                      ),
                      {
                        addSuffix: true,
                      }
                    )
                  : "just now"}
              </span>

            </div>
          </div>

          <div className="flex items-center gap-1">

            <button
              onClick={
                handleReport
              }
              aria-label="Report post"
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Flag
                size={16}
              />
            </button>

            {canDelete &&
              onDelete && (
                <button
                  onClick={() =>
                    onDelete(
                      post.id
                    )
                  }
                  aria-label="Delete post"
                  className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-500 hover:text-red-500 transition-colors"
                >
                  <Trash2
                    size={
                      16
                    }
                  />
                </button>
              )}

          </div>
        </div>

        {post.content && (
          <p className="mt-4 text-sm leading-relaxed whitespace-pre-wrap text-slate-700 dark:text-slate-200">
            {
              post.content
            }
          </p>
        )}
      </div>

      {post.image_url && (
        <div className="border-y border-slate-100 dark:border-slate-800">
          <img
            src={
              post.image_url
            }
            alt="Post attachment"
            loading="lazy"
            className="w-full max-h-[500px] object-cover"
          />
        </div>
      )}

      <div className="p-4">

        <div className="grid grid-cols-5 gap-2">

          <button
            onClick={() =>
              onVote(
                post.id,
                "up"
              )
            }
            className="flex items-center justify-center gap-1 rounded-2xl py-2 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 transition-colors"
          >
            <ArrowBigUp
              size={18}
            />
            <span className="text-xs font-semibold">
              {post.upvotes ??
                0}
            </span>
          </button>

          <button
            onClick={() =>
              onVote(
                post.id,
                "down"
              )
            }
            className="flex items-center justify-center gap-1 rounded-2xl py-2 bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 transition-colors"
          >
            <ArrowBigDown
              size={18}
            />
            <span className="text-xs font-semibold">
              {post.downvotes ??
                0}
            </span>
          </button>

          <button
            onClick={
              onCommentClick
            }
            className="flex items-center justify-center gap-1 rounded-2xl py-2 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 transition-colors"
          >
            <MessageCircle
              size={18}
            />
            <span className="text-xs font-semibold">
              {post.comments_count ??
                0}
            </span>
          </button>

          <button
          aria-label="share"
            onClick={
              handleShare
            }
            className="flex items-center justify-center rounded-2xl py-2 bg-slate-50 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 hover:text-cyan-600 transition-colors"
          >
            <Share2
              size={18}
            />
          </button>

          <button
            aria-label={saved ? "Unsave post" : "Save post"}
            onClick={handleSaveToggle}
            className={`flex items-center justify-center rounded-2xl py-2 transition-colors ${
              saved
                ? "bg-amber-50 dark:bg-amber-950/30 text-amber-600"
                : "bg-slate-50 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-600"
            }`}
          >
            <Bookmark
              size={18}
              fill={saved ? "currentColor" : "none"}
            />
          </button>

        </div>
      </div>

    </article>
  );
}
