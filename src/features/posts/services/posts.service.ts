import { supabase } from "../../../lib/supabase";
import type { Database } from "../../../types/database.types";

export type PostWithProfile = Database["public"]["Tables"]["posts"]["Row"] & {
  profiles: {
    username: string | null;
    avatar_url: string | null;
    role: string | null;
  } | null;
  comments_count: number;
} & {
  is_anonymous?: boolean;
  voice_url?: string | null;
};

async function getCommentCounts(postIds: string[]): Promise<Record<string, number>> {
  if (postIds.length === 0) return {};
  const { data } = await supabase.from("comments").select("post_id").in("post_id", postIds);
  const counts: Record<string, number> = {};
  data?.forEach(({ post_id }) => {
    if (post_id) counts[post_id] = (counts[post_id] ?? 0) + 1;
  });
  return counts;
}

function normaliseProfile(raw: any) {
  return Array.isArray(raw.profiles) ? raw.profiles[0] ?? null : raw.profiles ?? null;
}

export async function fetchPosts({
  cursor,
  limit = 10,
  sortBy = "new",
}: { cursor?: string; limit?: number; sortBy?: "hot" | "new" } = {}) {
  let query = supabase
    .from("posts")
    .select("*, profiles(username, avatar_url, role)")
    .limit(limit + 1);

  if (sortBy === "hot") {
    query = query.order("score", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
    if (cursor) query = query.lt("created_at", cursor);
  }

  const { data, error } = await query;
  if (error) throw error;

  const rows = data ?? [];
  const hasMore = rows.length > limit;
  const posts = hasMore ? rows.slice(0, limit) : rows;
  const countMap = await getCommentCounts(posts.map((p) => p.id));

  const enriched = posts.map((post: any) => ({
    ...post,
    profiles: normaliseProfile(post),
    comments_count: countMap[post.id] ?? 0,
  }));

  return {
    data: enriched as PostWithProfile[],
    nextCursor: hasMore && sortBy === "new" ? enriched[enriched.length - 1].created_at : null,
  };
}

export async function fetchHotPosts(limit = 20) {
  const result = await fetchPosts({ limit, sortBy: "hot" });
  return result.data;
}

export async function fetchAnonymousPosts(limit = 20) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(username, avatar_url, role)")
    .eq("is_anonymous", true)
    .gte("created_at", twentyFourHoursAgo)
    .order("upvotes", { ascending: false })
    .limit(limit);
  if (error) throw error;
  const posts = data ?? [];
  const countMap = await getCommentCounts(posts.map((p) => p.id));
  return posts.map((post: any) => ({
    ...post,
    profiles: normaliseProfile(post),
    comments_count: countMap[post.id] ?? 0,
  })) as PostWithProfile[];
}

export async function createPost(
  userId: string,
  content: string,
  imageUrl?: string | null,
  voiceUrl?: string | null,
  isAnonymous?: boolean
) {
  const { data, error } = await supabase
    .from("posts")
    .insert({
      user_id: userId,
      content,
      image_url: imageUrl ?? null,
      voice_url: voiceUrl ?? null,
      is_anonymous: isAnonymous ?? false,
      upvotes: 0,
      downvotes: 0,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function votePost(postId: string, userId: string, type: "up" | "down") {
  const { data: existing, error: fetchErr } = await supabase
    .from("post_votes")
    .select("id, vote_type")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();
  if (fetchErr) throw fetchErr;

  if (existing?.vote_type === type) {
    await supabase.from("post_votes").delete().eq("id", existing.id);
    await supabase.rpc("decrement_vote", { p_post_id: postId, p_column: type === "up" ? "upvotes" : "downvotes" });
    return;
  }

  if (existing) {
    await supabase.from("post_votes").update({ vote_type: type }).eq("id", existing.id);
    const addCol = type === "up" ? "upvotes" : "downvotes";
    const removeCol = type === "up" ? "downvotes" : "upvotes";
    await supabase.rpc("increment", { table_name: "posts", column_name: addCol, row_id: postId });
    await supabase.rpc("decrement_vote", { p_post_id: postId, p_column: removeCol });
    return;
  }

  await supabase.from("post_votes").insert({ post_id: postId, user_id: userId, vote_type: type });
  const col = type === "up" ? "upvotes" : "downvotes";
  await supabase.rpc("increment", { table_name: "posts", column_name: col, row_id: postId });
}

export async function deletePost(postId: string) {
  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) throw error;
}

export function subscribeToPosts(callback: (payload: any) => void) {
  return supabase
    .channel("posts-live")
    .on("postgres_changes", { event: "*", schema: "public", table: "posts" }, callback)
    .subscribe();
}

export async function fetchAllPostsForModeration() {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(username, avatar_url, role)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((post: any) => ({
    ...post,
    profiles: normaliseProfile(post),
    comments_count: 0,
  })) as PostWithProfile[];
}

export async function fetchAllCommentsForModeration() {
  const { data, error } = await supabase
    .from("comments")
    .select("*, profiles(username, role)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function deleteComment(commentId: string) {
  const { error } = await supabase.from("comments").delete().eq("id", commentId);
  if (error) throw error;
}