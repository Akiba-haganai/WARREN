import { supabase } from "../lib/supabase";

export async function savePost(
  userId: string,
  postId: string
) {
  const { error } = await supabase
    .from("saved_posts")
    .insert({
      user_id: userId,
      post_id: postId,
    });

  if (error) throw error;
}

export async function unsavePost(
  userId: string,
  postId: string
) {
  const { error } = await supabase
    .from("saved_posts")
    .delete()
    .eq("user_id", userId)
    .eq("post_id", postId);

  if (error) throw error;
}

export async function isPostSaved(
  userId: string,
  postId: string
) {
  const { data } = await supabase
    .from("saved_posts")
    .select("id")
    .eq("user_id", userId)
    .eq("post_id", postId)
    .maybeSingle();

  return !!data;
}

export async function getSavedPosts(
  userId: string
) {
  const { data, error } =
    await supabase
      .from("saved_posts")
      .select(`
        post_id,
        posts (
          *,
          profiles (
            username,
            avatar_url,
            role
          )
        )
      `)
      .eq("user_id", userId);

  if (error) throw error;

  return data ?? [];
}