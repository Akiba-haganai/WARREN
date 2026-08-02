import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
  Bookmark,
  Trash2,
  Share2,
  ShieldCheck,
  Smile,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "../../../lib/supabase";
import { getTier, TIER_COLORS } from "../../study/utils/tiers";
import { LecturerBadge } from "../../profile/components/LecturerBadge";

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
    karma?: number | null;
    is_lecturer?: boolean | null;
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
  onPostClick?: () => void;
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
  const [showReactions, setShowReactions] = useState(false);

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
          title: "Campus",
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

  // Total active reactions count (for the toggle button badge)
  const totalReactions = reactions.reduce((sum, r) => sum + r.count, 0);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white dark:bg-slate-900 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md motion-safe:active:scale-[0.99]">

      {/* ─── Header ────────────────────────────────────────────────────────── */}
      <div className="p-3 sm:p-4">
        <div className="flex items-start gap-3">
          {/* Avatar – 40px, matching major social apps */}
          <Link
            to={isAnonymous && !canSeeAuthor ? "#" : `/profile/${post.user_id}`}
            onClick={(e) => e.stopPropagation()}
            className="shrink-0"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                loading="lazy"
                className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
            ) : (
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
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
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="font-semibold text-slate-900 dark:text-white truncate max-w-[130px] text-sm">
                {displayName}
              </h3>
              {!isAnonymous && post.profiles?.karma !== undefined && (
                <span
                  style={{ backgroundColor: TIER_COLORS[getTier(post.profiles.karma ?? 0)] }}
                  className="px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white capitalize"
                >
                  {getTier(post.profiles.karma ?? 0)}
                </span>
              )}
              {!isAnonymous && post.profiles?.is_lecturer && <LecturerBadge />}
              {isAnonymous && (
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 dark:bg-purple-950/40 px-1.5 py-0.5 text-[9px] font-bold uppercase text-purple-600 dark:text-purple-400">
                  🎭 Anon
                </span>
              )}
              {isAnonymous && canSeeAuthor && (
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
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
            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
              <span>{displayRole}</span>
              <span>·</span>
              <span>
                {post.created_at
                  ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
                  : "just now"}
              </span>
            </div>
          </div>

          {/* Delete (owner/mod) — Report moved to ··· later */}
          {canDelete && onDelete && (
            <button
              onClick={() => onDelete(post.id)}
              aria-label="Delete post"
              className="p-2 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 min-w-[36px] min-h-[36px] flex items-center justify-center transition shrink-0"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>

        {/* Tappable content */}
        <div onClick={onPostClick} className="cursor-pointer mt-2">
          {post.content && (
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {post.content}
            </p>
          )}
        </div>
      </div>

      {/* ─── Image – aspect-ratio locked to prevent layout shift ─────────── */}
      {post.image_url && (
        <div
          className="border-y border-slate-100 dark:border-slate-800 cursor-pointer aspect-[4/3] overflow-hidden"
          onClick={handleImageClick}
        >
          <img
            src={post.image_url}
            alt="Post attachment"
            loading="lazy"
            className="w-full h-full object-cover bg-slate-100 dark:bg-slate-800"
          />
        </div>
      )}

      {/* Voice note */}
      {post.voice_url && (
        <div className="px-3 pt-2 pb-1">
          <audio controls src={post.voice_url} className="w-full h-8" />
        </div>
      )}

      {/* ─── Action bar: vote left | comment + share + save right ────────── */}
      <div className="flex items-center justify-between px-3 py-2.5">
        {/* Left: votes */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onVote(post.id, "up")}
            aria-label="Upvote"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 motion-safe:active:scale-95 ${
              userVote === "up"
                ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <ArrowBigUp size={20} />
            <span>{post.upvotes ?? 0}</span>
          </button>

          <button
            onClick={() => onVote(post.id, "down")}
            aria-label="Downvote"
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 motion-safe:active:scale-95 ${
              userVote === "down"
                ? "bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <ArrowBigDown size={20} />
            <span>{post.downvotes ?? 0}</span>
          </button>
        </div>

        {/* Right: comment, share, save, react */}
        <div className="flex items-center gap-1">
          <button
            onClick={onCommentClick}
            aria-label="Comments"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-sm text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <MessageCircle size={18} />
            <span className="font-semibold text-xs">{post.comments_count ?? 0}</span>
          </button>

          <button
            onClick={handleShare}
            disabled={sharing}
            aria-label="Share post"
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 hover:text-cyan-600 transition disabled:opacity-50"
          >
            <Share2 size={18} />
          </button>

          <button
            onClick={handleSaveToggle}
            aria-label={saved ? "Unsave post" : "Save post"}
            className={`p-2 rounded-full transition ${
              saved
                ? "text-amber-500"
                : "text-slate-500 dark:text-slate-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:text-amber-500"
            }`}
          >
            <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
          </button>

          {/* Reaction toggle – shows count badge when reactions exist */}
          <button
            onClick={() => setShowReactions((v) => !v)}
            aria-label="React to post"
            className={`flex items-center gap-1 p-2 rounded-full text-sm transition ${
              showReactions
                ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Smile size={18} />
            {totalReactions > 0 && (
              <span className="text-xs font-semibold">{totalReactions}</span>
            )}
          </button>

          {/* Report (subtle, still accessible) */}
          <button
            onClick={handleReport}
            aria-label="Report post"
            className="p-2 rounded-full text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>
          </button>
        </div>
      </div>

      {/* ─── Emoji reactions – collapsed by default ────────────────────────── */}
      {showReactions && (
        <div className="px-3 pb-3 flex items-center gap-1.5 flex-wrap border-t border-slate-100 dark:border-slate-800 pt-2">
          {["❤️", "😂", "😮", "😢", "😡"].map((emoji) => {
            const reaction = reactions.find((r) => r.emoji === emoji);
            const count = reaction?.count ?? 0;
            const active = reaction?.userReacted ?? false;
            return (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className={`flex items-center gap-1 text-sm font-medium px-2.5 py-1.5 min-h-[36px] rounded-full transition-all duration-200 motion-safe:active:scale-95 ${
                  active
                    ? "bg-slate-200 dark:bg-slate-700 shadow-sm scale-105"
                    : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
                aria-label={`React with ${emoji}`}
              >
                <span>{emoji}</span>
                {count > 0 && <span className="text-xs text-slate-500 dark:text-slate-400">{count}</span>}
              </button>
            );
          })}
        </div>
      )}
    </article>
  );
}