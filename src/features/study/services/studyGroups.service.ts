import { supabase } from "../../../lib/supabase";
import type { Database } from "../../../types/database.types";

type StudyGroup = Database["public"]["Tables"]["study_groups"]["Row"];

export async function fetchStudyGroups(course?: string): Promise<StudyGroup[]> {
  let query = supabase.from("study_groups").select("*").order("created_at", { ascending: false });
  if (course) query = query.eq("course", course);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function createStudyGroup(
  name: string,
  course: string,
  description?: string,
  isPrivate = false
): Promise<StudyGroup> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("study_groups")
    .insert({ name, course, description, is_private: isPrivate, created_by: user.id })
    .select()
    .single();
  if (error) throw error;
  return data as StudyGroup;
}

export async function joinStudyGroup(groupId: string): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("study_group_members")
    .insert({ group_id: groupId, user_id: user.id });
  if (error) throw error;
}

export async function leaveStudyGroup(groupId: string): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("study_group_members")
    .delete()
    .eq("group_id", groupId)
    .eq("user_id", user.id);
  if (error) throw error;
}

export async function fetchGroupMembers(groupId: string): Promise<{ user_id: string; username: string | null }[]> {
  const { data, error } = await supabase
    .from("study_group_members")
    .select("user_id, profiles(username)")
    .eq("group_id", groupId);
  if (error) throw error;
  return (data ?? []).map((m: any) => ({ user_id: m.user_id, username: m.profiles?.username ?? null }));
}