import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { supabase } from "../../../lib/supabase";

import { useUserRole } from "../../../hooks/useUserRole";
import { useAuthStore } from "../../../store/authStore";
import { reportPost } from "../../../services/reportService";
import {
  savePost,
  unsavePost,
  isPostSaved,
} from "../../../services/savedPostsService";
import { useToastStore } from "../../../store/toastStore";

interface Post {
  id: string;
  user_id: string | null;
  content: string | null;
  image_url: string | null;
  voice_url?: string | null;
  is_anonymous?: boolean | null;
  upvotes: number | null;
  downvotes: number | null;
  created_at: string | null;
  profiles: {
    username: string | null;
    avatar_url: string | null;
    role: string | null;
  } | null;
  comments_count: number;
}

interface Reaction {
  emoji: string;
  count: number;
  userReacted: boolean;
}

interface Props {
  post: Post;
  userVote: "up" | "down" | null;
  onVote: (id: string, type: "up" | "down") => void;
  onDelete?: (id: string) => void;
  onCommentClick?: () => void;
  onPostClick?: () => void;   // Tapping the content or image opens the post detail
}

export default function PostCard({
  post,
  userVote,
  onVote,
  onDelete,
  onCommentClick,
  onPostClick,
}: Props) {
  const { role } = useUserRole();
  const user = useAuthStore((s) => s.user);
  const { showToast } = useToastStore();
  const isOwner = user?.id === post.user_id;
  const canDelete = isOwner || role === "moderator" || role === "admin";
  const [saved, setSaved] = useState(false);
  const [sharing, setSharing] = useState(false);

  const isAnonymous = post.is_anonymous ?? false;
  const canSeeAuthor = role === "admin" || role === "moderator";

  const displayName = isAnonymous && !canSeeAuthor
    ? "Anonymous 🎭"
    : (post.profiles?.username ?? "Anonymous");
  const displayRole = isAnonymous && !canSeeAuthor
    ? "anonymous"
    : (post.profiles?.role ?? "student");
  const avatarUrl = isAnonymous && !canSeeAuthor
    ? null
    : post.profiles?.avatar_url;

  const [reactions, setReactions] = useState<Reaction[]>([]);

  const fetchReactions = async () => {
    const { data, error } = await supabase
      .from("post_reactions")
      .select("emoji, user_id")
      .eq("post_id", post.id);
    if (error) return;
    const counts: Record<string, { count: number; userReacted: boolean }> = {};
    (data ?? []).forEach((r: any) => {
      if (!counts[r.emoji]) counts[r.emoji] = { count: 0, userReacted: false };
      counts[r.emoji].count++;
      if (r.user_id === user?.id) counts[r.emoji].userReacted = true;
    });
    setReactions(
      Object.entries(counts).map(([emoji, { count, userReacted }]) => ({
        emoji,
        count,
        userReacted,
      }))
    );
  };

  useEffect(() => {
    if (!user) return;
    isPostSaved(user.id, post.id).then(setSaved).catch((err) => { console.error("Failed to check saved status", err); });
    fetchReactions();
  }, [user, post.id]);

  const handleReaction = async (emoji: string) => {
    if (!user) { showToast("Sign in to react", "err"); return; }
    const existing = reactions.find((r) => r.emoji === emoji && r.userReacted);
    if (existing) {
      await supabase
        .from("post_reactions")
        .delete()
        .eq("post_id", post.id)
        .eq("user_id", user.id)
        .eq("emoji", emoji);
    } else {
      await supabase
        .from("post_reactions")
        .insert({ post_id: post.id, user_id: user.id, emoji });
    }
    fetchReactions();
  };

  const handleReport = async () => {
    if (!user) { showToast("Please sign in to report posts.", "err"); return; }
    const reason = prompt("Reason for reporting?");
    if (!reason?.trim()) return;
    try {
      await reportPost(post.id, user.id, reason.trim());
      showToast("Report submitted.");
    } catch (error) {
      console.error(error);
      showToast("Failed to submit report.", "err");
    }
  };

  const handleShare = async () => {
    if (sharing) return;
    const shareUrl = `${window.location.origin}/post/${post.id}`;
    try {
      if (navigator.share) {
        setSharing(true);
        await navigator.share({
          title: "Warren",
          text: post.content ?? undefined,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        showToast("Link copied to clipboard.");
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        console.error(error);
      }
    } finally {
      setSharing(false);
    }
  };

  const handleSaveToggle = async () => {
    if (!user) { showToast("Please sign in to save posts.", "err"); return; }
    try {
      if (saved) {
        await unsavePost(user.id, post.id);
        setSaved(false);
      } else {
        await savePost(user.id, post.id);
        setSaved(true);
      }
    } catch {
      setSaved((prev) => !prev);
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post.image_url) {
      window.open(post.image_url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-sm transition-all duration-200 ease-in-out hover:shadow-md motion-safe:active:scale-[0.99]">
      {/* ─── Header (not tappable for post detail) ────────────────────────── */}
      <div className="p-2.5 sm:p-3">
        <div className="flex items-start gap-2">
          <Link
            to={isAnonymous && !canSeeAuthor ? "#" : `/profile/${post.user_id}`}
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 mt-0.5"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                loading="lazy"
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
            ) : (
              <div
                className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-sm ${
                  isAnonymous && !canSeeAuthor
                    ? "bg-purple-500 text-white"
                    : "bg-gradient-to-br from-blue-600 to-cyan-500 text-white"
                }`}
              >
                {isAnonymous && !canSeeAuthor ? "?" : displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1">
              <h3 className="font-semibold text-slate-900 dark:text-white truncate max-w-[100px] text-[11px] sm:text-xs">
                {displayName}
              </h3>
              {isAnonymous && (
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 dark:bg-purple-950/40 px-1.5 py-0.5 text-[9px] font-bold uppercase text-purple-600 dark:text-purple-400">
                  🎭 Anon
                </span>
              )}
              {isAnonymous && canSeeAuthor && (
                <span className="text-[9px] text-slate-500 dark:text-slate-400">
                  (by {post.profiles?.username ?? "Unknown"})
                </span>
              )}
              {!isAnonymous && displayRole === "admin" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 dark:bg-red-950/40 px-1.5 py-0.5 text-[9px] font-bold uppercase text-red-600 dark:text-red-400">
                  <ShieldCheck size={9} /> Admin
                </span>
              )}
              {!isAnonymous && displayRole === "moderator" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-950/40 px-1.5 py-0.5 text-[9px] font-bold uppercase text-amber-600 dark:text-amber-400">
                  <ShieldCheck size={9} /> Mod
                </span>
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
              <span>{displayRole}</span>
              <span>·</span>
              <span>
                {post.created_at
                  ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
                  : "just now"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-0.5 ml-1">
            <button
              onClick={handleReport}
              aria-label="Report post"
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-w-[36px] min-h-[36px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center transition"
            >
              <Flag size={16} />
            </button>
            {canDelete && onDelete && (
              <button
                onClick={() => onDelete(post.id)}
                aria-label="Delete post"
                className="p-1.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 min-w-[36px] min-h-[36px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center transition"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Tappable content – opens post detail */}
        <div onClick={onPostClick} className="cursor-pointer">
          {post.content && (
            <p className="mt-1.5 whitespace-pre-wrap break-words text-[11px] sm:text-xs leading-snug text-slate-700 dark:text-slate-200">
              {post.content}
            </p>
          )}
        </div>
      </div>

      {/* Tappable image – opens full screen */}
      {post.image_url && (
        <div className="border-y border-slate-100 dark:border-slate-800 cursor-pointer" onClick={handleImageClick}>
          <img
            src={post.image_url}
            alt="Post attachment"
            loading="lazy"
            className="w-full max-h-[320px] object-cover bg-slate-100 dark:bg-slate-800"
          />
        </div>
      )}

      {/* Voice note */}
      {post.voice_url && (
        <div className="px-2.5 pt-1.5 pb-0.5">
          <audio controls src={post.voice_url} className="w-full h-7" />
        </div>
      )}

      {/* ─── Action bar ────────────────────────────────────────────────────── */}
      <div className="px-1.5 py-1.5 sm:px-2 sm:py-1.5 grid grid-cols-5 gap-1">
        <button
          onClick={() => onVote(post.id, "up")}
          className={`flex items-center justify-center gap-1 rounded-xl py-2 min-h-[44px] text-[11px] transition-all duration-200 motion-safe:active:scale-[0.98] ${
            userVote === "up"
              ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold shadow-sm"
              : "bg-slate-50/80 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-slate-600 dark:text-slate-300"
          }`}
          aria-label="Upvote"
        >
          <ArrowBigUp size={16} />
          <span className="font-semibold">{post.upvotes ?? 0}</span>
        </button>

        <button
          onClick={() => onVote(post.id, "down")}
          className={`flex items-center justify-center gap-1 rounded-xl py-2 min-h-[44px] text-[11px] transition-all duration-200 motion-safe:active:scale-[0.98] ${
            userVote === "down"
              ? "bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 font-semibold shadow-sm"
              : "bg-slate-50/80 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-600 dark:text-slate-300"
          }`}
          aria-label="Downvote"
        >
          <ArrowBigDown size={16} />
          <span className="font-semibold">{post.downvotes ?? 0}</span>
        </button>

        <button
          onClick={onCommentClick}
          className="flex items-center justify-center gap-1 rounded-xl py-2 min-h-[44px] text-[11px] bg-slate-50/80 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-600 dark:hover:text-blue-400 text-slate-600 dark:text-slate-300 transition-all duration-200 motion-safe:active:scale-[0.98]"
          aria-label="Comments"
        >
          <MessageCircle size={16} />
          <span className="font-semibold">{post.comments_count ?? 0}</span>
        </button>

        <button
          onClick={handleShare}
          aria-label="Share post"
          disabled={sharing}
          className="flex items-center justify-center rounded-xl py-2 min-h-[44px] text-[11px] bg-slate-50/80 dark:bg-slate-800/80 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-600 dark:text-slate-300 transition-all duration-200 motion-safe:active:scale-[0.98] disabled:opacity-50"
        >
          <Share2 size={16} />
        </button>

        <button
          onClick={handleSaveToggle}
          aria-label={saved ? "Unsave post" : "Save post"}
          className={`flex items-center justify-center rounded-xl py-2 min-h-[44px] text-[11px] transition-all duration-200 motion-safe:active:scale-[0.98] ${
            saved
              ? "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 shadow-sm"
              : "bg-slate-50/80 dark:bg-slate-800/80 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:text-amber-600 dark:hover:text-amber-400 text-slate-600 dark:text-slate-300"
          }`}
        >
          <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* ─── Quick emoji reactions ──────────────────────────────────────────── */}
      <div className="px-2.5 pb-2 flex items-center gap-1 flex-wrap">
        {["❤️", "😂", "😮", "😢", "😡"].map((emoji) => {
          const reaction = reactions.find((r) => r.emoji === emoji);
          const count = reaction?.count ?? 0;
          const active = reaction?.userReacted ?? false;
          return (
            <button
              key={emoji}
              onClick={() => handleReaction(emoji)}
              className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 min-h-[36px] min-w-[44px] rounded-full transition-all duration-200 motion-safe:active:scale-[0.98] ${
                active
                  ? "bg-slate-200 dark:bg-slate-700 shadow-sm"
                  : "bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
              aria-label={`React with ${emoji}`}
            >
              <span className="text-xs">{emoji}</span>
              {count > 0 && <span className="text-slate-500">{count}</span>}
            </button>
          );
        })}
      </div>
    </article>
  );
}