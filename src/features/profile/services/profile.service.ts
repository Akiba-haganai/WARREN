import { supabase } from "../../../lib/supabase";
import type { Database } from "../../../types/database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
  academic?: {
    university: string | null;
    course: string | null;
    year_of_study: number | null;
  } | null;
};

export async function fetchProfile(userId: string): Promise<Profile | null> {
  // Use 'any' cast on supabase early to prevent TS deep instantiation bugs with nested selects
  const query = (supabase as any)
    .from("profiles")
    .select("*, academic:student_academic_profile(*)");

  const { data, error } = await query
    .eq("id", userId)
    .single();
    
  if (error) throw error;
  
  // Format the academic array (if joined) to a single object
  const formattedData = {
    ...data,
    academic: Array.isArray(data.academic) ? data.academic[0] : data.academic
  } as Profile;

  return formattedData;
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