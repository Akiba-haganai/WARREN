import { supabase } from "../lib/supabase";
import type { Database } from "../types/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchUserStats(userId: string) {
  const { count: postCount } = await supabase
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  const { count: commentCount } = await supabase
    .from("comments")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  const { data: upvotes } = await supabase
    .from("posts")
    .select("upvotes")
    .eq("user_id", userId);

  const totalUpvotes = upvotes?.reduce((sum, p) => sum + (p.upvotes ?? 0), 0) ?? 0;

  return {
    posts: postCount ?? 0,
    comments: commentCount ?? 0,
    karma: totalUpvotes,
  };
}

export async function fetchRecentActivity(userId: string) {
  const { data: posts } = await supabase
    .from("posts")
    .select("id, content, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: comments } = await supabase
    .from("comments")
    .select("id, content, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  return { posts: posts ?? [], comments: comments ?? [] };
}