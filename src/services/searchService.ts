import { supabase } from "../lib/supabase";

export async function searchPosts(query: string) {
  if (!query.trim()) return [];

  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      profiles (
        username,
        avatar_url,
        role
      )
    `)
    .ilike("content", `%${query}%`)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw error;

  return data ?? [];
}

export async function searchUsers(query: string) {
  if (!query.trim()) return [];

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .ilike("username", `%${query}%`)
    .limit(25);

  if (error) throw error;

  return data ?? [];
}