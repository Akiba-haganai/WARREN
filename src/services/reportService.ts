import { supabase } from "../lib/supabase";

export async function reportPost(
  postId: string,
  reporterId: string,
  reason: string
) {
  const { error } = await supabase
    .from("reports")
    .insert({
      post_id: postId,
      reporter_id: reporterId,
      reason,
    });

  if (error) throw error;
}