
import { supabase } from "../lib/supabase";

export const MAX_POSTS_PER_HOUR = 10;

export async function getPostLimitStatus(userId: string) {
  const oneHourAgo = new Date(
    Date.now() - 60 * 60 * 1000
  ).toISOString();

  const { count, error } = await supabase
    .from("posts")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId)
    .gte("created_at", oneHourAgo);

  if (error) throw error;

  const used = count ?? 0;

  return {
    used,
    remaining: Math.max(
      0,
      MAX_POSTS_PER_HOUR - used
    ),
    canPost: used < MAX_POSTS_PER_HOUR,
  };
}