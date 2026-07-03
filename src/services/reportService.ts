import { supabase } from "../lib/supabase";

export async function reportPost(postId: string, reporterId: string, reason: string) {
  const { error } = await supabase.from("reports").insert({
    post_id: postId,
    reporter_id: reporterId,
    reason,
  });
  if (error) throw error;
}

export async function reportMaterial(materialId: string, reporterId: string, reason: string) {
  const { error } = await supabase.from("reports").insert({
    material_id: materialId,
    reporter_id: reporterId,
    reason,
  });
  if (error) throw error;
}