import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import AppShell from "../../components/layout/AppShell";
import { usePosts } from "../../features/posts/hooks/usePosts";
import { usePostVote } from "../../features/posts/hooks/usePostVote";
import { deletePost } from "../../features/posts/services/posts.service";
import { usePostsStore } from "../../features/posts/store/posts.store";
import { Feed } from "../../features/posts/components/Feed";

import CommentSection from "../../components/comments/CommentSection";
import FeedToggle from "../../components/feed/FeedToggle";
import { ChevronRight, Calendar, BookOpen, Megaphone, TrendingUp, MessageSquare } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useCurrentProfile } from "../../hooks/useCurrentProfile";
import { useContinueLearning } from "../../features/study/hooks/useContinueLearning";
import { useCramPlans } from "../../features/cram/hooks/useCramPlans";
import { fetchAnnouncements } from "../../services/announcementService";

export default function HomePage() {
  const currentUser = useAuthStore((s) => s.user);
  const currentUserId = currentUser?.id;
  const { data: currentProfile } = useCurrentProfile();

  const sortMode = usePostsStore((s) => s.sortMode);
  const setSortMode = usePostsStore((s) => s.setSortMode);
  const { posts, isLoading, isError, error, refetch } = usePosts();
  const voteMutation = usePostVote();

  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [activeCommentPostOwner, setActiveCommentPostOwner] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const postId = searchParams.get("post");
    if (!postId) return;
    const found = posts.find((p) => p.id === postId);
    if (found) {
      setActiveCommentPostId(found.id);
      setActiveCommentPostOwner(found.user_id);
      searchParams.delete("post");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, posts, setSearchParams]);

  const activePost = activeCommentPostId
    ? posts.find((p) => p.id === activeCommentPostId) ?? null
    : null;

  const handleVote = (postId: string, type: "up" | "down") =>
    voteMutation.mutate({ postId, type });

  const handleDelete = async (postId: string) => {
    if (!confirm("Delete this post?")) return;
    await deletePost(postId);
    refetch();
  };



  // ── Data for the study-first home ─────────────────────────────────────
  const { data: continueLearning } = useContinueLearning();
  const { data: cramPlans } = useCramPlans();
  const activePlan = cramPlans?.find((p) => p.status === "active") ?? null;

  const { data: recommended } = useQuery({
    queryKey: ["homeRecommended", currentUserId],
    queryFn: async () => {
      if (!currentUserId) return null;

      const [{ data: views }, { data: plans }, { data: academic }] = await Promise.all([
        supabase
          .from("material_views")
          .select("material:material_id(course_code, subject)")
          .eq("user_id", currentUserId)
          .order("viewed_at", { ascending: false })
          .limit(10),
        supabase
          .from("cram_plans")
          .select("course_key")
          .eq("user_id", currentUserId)
          .not("course_key", "is", null)
          .limit(3),
        (supabase.from as any)("student_academic_profile")
          .select("course, university")
          .eq("user_id", currentUserId)
          .maybeSingle(),
      ]);

      const courseKeys = new Set<string>();
      if (academic?.course) courseKeys.add(academic.course);
      (views ?? []).forEach((v: any) => {
        const m = Array.isArray(v.material) ? v.material[0] : v.material;
        const key = m?.course_code ?? m?.subject;
        if (key) courseKeys.add(key);
      });
      (plans ?? []).forEach((p: any) => p.course_key && courseKeys.add(p.course_key));

      if (courseKeys.size > 0) {
        const { data } = await supabase
          .from("study_materials")
          .select("id, title, course_code, paper_type, summary")
          .eq("processing_status", "done")
          .or(Array.from(courseKeys).map((k) => `course_code.eq.${k},subject.eq.${k}`).join(","))
          .order("trending_score", { ascending: false, nullsFirst: false })
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (data) return { ...data, isPersonalized: true };
      }

      const { data } = await supabase
        .from("study_materials")
        .select("id, title, course_code, paper_type, summary")
        .eq("processing_status", "done")
        .order("trending_score", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      return data ? { ...data, isPersonalized: false } : null;
    },
    enabled: !!currentUserId,
  });

  const { data: topPost } = useQuery({
    queryKey: ["homeTopPost"],
    queryFn: async () => {
      const { data } = await supabase
        .from("posts")
        .select("id, content, profiles(username)")
        .order("upvotes", { ascending: false })
        .limit(1)
        .maybeSingle();
      return data;
    },
  });

  const { data: latestAnnouncement } = useQuery({
    queryKey: ["homeAnnouncement"],
    queryFn: async () => {
      const list = await fetchAnnouncements();
      return (list ?? [])[0] ?? null;
    },
  });

  const { data: userVotes = {} } = useQuery({
    queryKey: ["userVotes", currentUserId, posts.map((p) => p.id)],
    queryFn: async () => {
      if (!currentUserId || posts.length === 0) return {};
      const { data } = await supabase
        .from("post_votes")
        .select("post_id, vote_type")
        .eq("user_id", currentUserId)
        .in("post_id", posts.map((p) => p.id));
      const votes: Record<string, "up" | "down" | null> = {};
      (data ?? []).forEach((v) => {
        votes[v.post_id] = v.vote_type as "up" | "down";
      });
      return votes;
    },
    enabled: !!currentUserId && posts.length > 0,
  });

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const firstName = currentProfile?.username?.split(" ")[0] ?? "";

  const continueList = (continueLearning ?? []).slice(0, 3);
  const daysToExam = activePlan
    ? Math.max(0, Math.ceil((new Date(activePlan.exam_date).getTime() - Date.now()) / 86400000))
    : null;

  const hasStudyContent = continueList.length > 0 || !!activePlan;

  const currentUserName = currentProfile?.username ?? currentUser?.user_metadata?.username ?? "";
  const currentUserAvatar = currentProfile?.avatar_url ?? currentUser?.user_metadata?.avatar_url ?? null;
  const currentUserInitial = currentUserName?.[0]?.toUpperCase() ?? "?";

  return (
    <>
      <AppShell>
        <div className="px-4 pb-28 overflow-y-auto">
          {/* Greeting */}
          <div className="pt-4 pb-3">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {greeting}{firstName ? `, ${firstName}` : ""}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {daysToExam !== null && daysToExam <= 14
                ? `${daysToExam} ${daysToExam === 1 ? "day" : "days"} to your ${activePlan?.subject} exam`
                : "Find the paper. Understand it. Plan the cram."}
            </p>
          </div>

          {/* 1. Continue studying */}
          {continueList.length > 0 && (
            <section className="mb-5">
              <SectionHeader
                icon={<BookOpen size={14} />}
                title="Continue studying"
                href="/study"
              />
              <div className="space-y-2">
                {continueList.map((m) => (
                  <Link
                    key={m.id}
                    to={`/study?material=${m.id}`}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-800 transition"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center shrink-0 text-lg">
                      {emojiFor(m.paper_type ?? m.material_type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{m.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {[m.course_code ?? m.subject, m.paper_type].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 shrink-0" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 2. Your week */}
          {activePlan && (
            <section className="mb-5">
              <SectionHeader icon={<Calendar size={14} />} title="Your week" href="/study" />
              <Link
                to="/study"
                className="block p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md"
              >
                <p className="text-[11px] font-bold uppercase tracking-wider opacity-80">
                  Cram plan
                </p>
                <p className="text-lg font-black mt-1">{activePlan.subject}</p>
                <p className="text-sm opacity-90 mt-0.5">
                  Exam {new Date(activePlan.exam_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  {daysToExam !== null ? ` · ${daysToExam} ${daysToExam === 1 ? "day" : "days"} left` : ""}
                </p>
              </Link>
            </section>
          )}

          {/* 3. For you */}
          {(recommended || topPost) && (
            <section className="mb-5">
              <SectionHeader
                icon={<TrendingUp size={14} />}
                title={recommended?.isPersonalized ? "For your course" : "Recommended"}
                href="/study"
              />
              <div className="space-y-2">
                {recommended && (
                  <Link
                    to={`/papers/${recommended.id}`}
                    className="block p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-800 transition"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full">
                        {recommended.isPersonalized ? "Your course" : "Trending paper"}
                      </span>
                      {recommended.course_code && (
                        <span className="text-[11px] text-slate-500">{recommended.course_code}</span>
                      )}
                    </div>
                    <p className="text-sm font-bold leading-snug">{recommended.title}</p>
                    {recommended.summary && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{recommended.summary}</p>
                    )}
                  </Link>
                )}
                {topPost && (
                  <Link
                    to="/community"
                    className="block p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-800 transition"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <MessageSquare size={12} className="text-slate-400" />
                      <span className="text-[11px] text-slate-500">
                        {(Array.isArray((topPost as any).profiles)
                          ? (topPost as any).profiles[0]?.username
                          : (topPost as any).profiles?.username) ?? "Anonymous"}
                      </span>
                    </div>
                    <p className="text-sm leading-snug line-clamp-2">{topPost.content}</p>
                  </Link>
                )}
              </div>
            </section>
          )}

          {/* 4. Campus */}
          {latestAnnouncement && (
            <section className="mb-5">
              <SectionHeader
                icon={<Megaphone size={14} />}
                title="Campus"
                href="/announcements"
              />
              <Link
                to="/announcements"
                className="block p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 hover:border-amber-300 transition"
              >
                <p className="text-sm font-bold leading-snug">
                  {latestAnnouncement.title ?? "Announcement"}
                </p>
                {(latestAnnouncement as any).content && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                    {(latestAnnouncement as any).content}
                  </p>
                )}
              </Link>
            </section>
          )}

          {/* Empty-state fallback for brand-new users */}
          {!hasStudyContent && (
            <section className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
              <p className="text-[11px] font-bold uppercase tracking-wider opacity-80">
                Get started
              </p>
              <h2 className="text-lg font-black mt-1">Find your course papers</h2>
              <p className="text-sm opacity-90 mt-1">
                Browse materials, or plan a cram for your next exam.
              </p>
              <div className="flex gap-2 mt-4">
                <Link
                  to="/study"
                  className="flex-1 py-2.5 rounded-xl bg-white text-blue-700 text-xs font-bold text-center"
                >
                  Open Study
                </Link>
                <Link
                  to="/community"
                  className="flex-1 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white text-xs font-bold text-center"
                >
                  Communities
                </Link>
              </div>
            </section>
          )}

          {/* Feed */}
          <section>
            <div className="sticky top-0 z-20 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl pt-2 pb-3 -mx-4 px-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold">Campus feed</h2>
              </div>
              <FeedToggle active={sortMode} onChange={setSortMode} />
            </div>

            {isError && (
              <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-4 rounded-2xl mb-4 text-sm">
                {error?.message}
              </div>
            )}

            <Feed
              posts={posts}
              isLoading={isLoading}
              userVotes={userVotes}
              onVote={handleVote}
              onDelete={handleDelete}
              onCommentClick={(post) => {
                setActiveCommentPostId(post.id);
                setActiveCommentPostOwner(post.user_id);
              }}
              onPostClick={(post) => {
                setActiveCommentPostId(post.id);
                setActiveCommentPostOwner(post.user_id);
              }}
              currentUserName={currentUserName}
              currentUserAvatar={currentUserAvatar}
              currentUserInitial={currentUserInitial}
            />
          </section>
        </div>
      </AppShell>


      {activeCommentPostId && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => {
            setActiveCommentPostId(null);
            setActiveCommentPostOwner(null);
          }}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl animate-slide-up max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {activePost && (
              <div className="px-4 pt-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {activePost.profiles?.username?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {activePost.profiles?.username ?? "Anonymous"}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 whitespace-pre-wrap">
                      {activePost.content}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex-1 overflow-y-auto">
              <CommentSection
                postId={activeCommentPostId}
                postOwnerId={activeCommentPostOwner}
                onClose={() => {
                  setActiveCommentPostId(null);
                  setActiveCommentPostOwner(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ───────────────────────────────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-2.5">
      <div className="flex items-center gap-1.5">
        <span className="text-slate-400">{icon}</span>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
          {title}
        </h2>
      </div>
      {href && (
        <Link to={href} className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
          See all
        </Link>
      )}
    </div>
  );
}

function emojiFor(type?: string | null): string {
  if (type === "exam" || type === "past_paper") return "📄";
  if (type === "test") return "📝";
  if (type === "notes") return "📘";
  if (type === "solutions") return "✅";
  if (type === "slides") return "🖼️";
  if (type === "assignment") return "✏️";
  if (type === "video") return "🎬";
  return "📁";
}
