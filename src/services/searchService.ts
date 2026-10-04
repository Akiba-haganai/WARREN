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

export async function searchMaterials(query: string) {
  if (!query.trim()) return [];

  const { data, error } = await supabase
    .from("study_materials")
    .select("id, title, course_code, subject, paper_type, academic_year, summary")
    .or(`title.ilike.%${query}%,course_code.ilike.%${query}%,subject.ilike.%${query}%`)
    .limit(20);

  if (error) throw error;

  return data ?? [];
}