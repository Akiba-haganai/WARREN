import { supabase } from "../lib/supabase";
import type { Community, CommunityType } from "../types/community";

// Fetch communities with optional filters
export async function fetchCommunities(
  type?: CommunityType | "all",
  parentId?: string | null,
  year?: string | null
): Promise<Community[]> {
  let query = supabase.from("communities").select("*").order("created_at", { ascending: false });

  if (type && type !== "all") {
    query = query.eq("type", type);
  }
  if (parentId !== undefined) {
    if (parentId === null) {
      query = query.is("parent_id", null); // top-level only
    } else {
      query = query.eq("parent_id", parentId);
    }
  }
  if (year) {
    query = query.eq("year", year);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Community[];
}

// Fetch all parent schools (for filters)
export async function fetchParentSchools(): Promise<Community[]> {
  return fetchCommunities("educational", null);
}

// Create a community
export async function createCommunity(
  data: Omit<Community, "id" | "created_by" | "created_at" | "updated_at">
): Promise<Community> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { data: result, error } = await supabase
    .from("communities")
    .insert({
      ...data,
      created_by: user.id,
    })
    .select()
    .single();
  if (error) throw error;
  return result as Community;
}

export async function updateCommunity(
  id: string,
  updates: Partial<Omit<Community, "id" | "created_by" | "created_at" | "updated_at">>
): Promise<Community> {
  const { data, error } = await supabase
    .from("communities")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Community;
}

export async function deleteCommunity(id: string): Promise<void> {
  const { error } = await supabase.from("communities").delete().eq("id", id);
  if (error) throw error;
}

// ── Membership ────────────────────────────────────────────────────────────────
export async function getMemberCounts(communityIds: string[]): Promise<Record<string, number>> {
  if (communityIds.length === 0) return {};
  const { data } = await supabase
    .from("community_members")
    .select("community_id")
    .in("community_id", communityIds);
  const counts: Record<string, number> = {};
  data?.forEach(m => { counts[m.community_id] = (counts[m.community_id] ?? 0) + 1; });
  return counts;
}

export async function getUserMemberships(userId: string): Promise<Set<string>> {
  const { data } = await supabase
    .from("community_members")
    .select("community_id")
    .eq("user_id", userId);
  return new Set(data?.map(m => m.community_id) ?? []);
}

export async function joinCommunity(communityId: string): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("community_members")
    .insert({ community_id: communityId, user_id: user.id });
  if (error) throw error;
}

export async function leaveCommunity(communityId: string): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("community_members")
    .delete()
    .eq("community_id", communityId)
    .eq("user_id", user.id);
  if (error) throw error;
}

// Kick a user (used by admin/mod/creator)
export async function kickMember(communityId: string, userId: string): Promise<void> {
  const { error } = await supabase
    .from("community_members")
    .delete()
    .eq("community_id", communityId)
    .eq("user_id", userId);
  if (error) throw error;
}

// Fetch members of a community (for manage members)
export async function fetchMembers(communityId: string): Promise<{ user_id: string; username: string | null; avatar_url: string | null }[]> {
  const { data, error } = await supabase
    .from("community_members")
    .select("user_id, profiles(username, avatar_url)")
    .eq("community_id", communityId);
  if (error) throw error;
  return (data ?? []).map((m: any) => ({
    user_id: m.user_id,
    username: m.profiles?.username ?? "Unknown",
    avatar_url: m.profiles?.avatar_url ?? null,
  }));
}