import { supabase } from "../../../lib/supabase";
import type { Database } from "../../../types/database.types";

export type StudyMaterial = Database["public"]["Tables"]["study_materials"]["Row"] & {
  uploader_username?: string | null;
  uploader_avatar?: string | null;
};

export type StudyFilters = {
  search?: string;
  year_group?: string;
  subject?: string;
  material_type?: string;
  programme?: string;
};

export type StarterPack = Database["public"]["Tables"]["starter_packs"]["Row"];

// ─── Helper ──────────────────────────────────────────────────────────────
function normalizeMaterial(item: any): StudyMaterial {
  return {
    ...item,
    uploader_username: item.profiles?.username ?? null,
    uploader_avatar: item.profiles?.avatar_url ?? null,
  };
}

// PostgREST treats , . ( ) as syntax characters inside a filter value.
// Wrapping the value in double quotes tells PostgREST to treat it as a
// literal string; embedded backslashes/quotes must be escaped first.
// This is safe to use around ilike patterns — the % wildcards inside the
// quoted string are still interpreted normally by ILIKE at the SQL level.
function escapeFilterValue(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

// tags.cs.{...} uses Postgres array-literal syntax, where { } and , are
// reserved. A search "word" typed by a user could still contain these
// (e.g. no space between tokens), so strip anything unsafe for a single
// array element rather than trying to escape it.
function escapeTagValue(value: string): string {
  return value.replace(/[{},]/g, "");
}

// ─── Core fetch ──────────────────────────────────────────────────────────
export async function fetchStudyMaterials(
  filters: StudyFilters = {},
  limit = 10,
  offset = 0
): Promise<StudyMaterial[]> {
  let query = supabase
    .from("study_materials")
    .select(`*, profiles:uploaded_by (username, avatar_url)`)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (filters.search) {
    const keywords = filters.search.trim().split(/\s+/).filter(Boolean);
    keywords.forEach((word) => {
      const pattern = escapeFilterValue(`%${word}%`);
      const tagWord = escapeTagValue(word);
      const tagClause = tagWord ? `,tags.cs.{${tagWord}}` : "";
      query = query.or(
        `title.ilike.${pattern},description.ilike.${pattern},subject.ilike.${pattern}${tagClause}`
      );
    });
  }

  if (filters.year_group && filters.year_group !== "All") {
    query = query.or(`year_group.eq.${filters.year_group},year_group.eq.All Years`);
  }
  if (filters.subject && filters.subject !== "All") {
    query = query.eq("subject", filters.subject);
  }
  if (filters.material_type && filters.material_type !== "All") {
    query = query.eq("material_type", filters.material_type);
  }
  if (filters.programme && filters.programme !== "All") {
    query = query.eq("programme", filters.programme);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(normalizeMaterial);
}

// ─── Related materials ────────────────────────────────────────────────────
export async function fetchRelatedMaterials(material: StudyMaterial, limit = 5): Promise<StudyMaterial[]> {
  const { data, error } = await supabase
    .from("study_materials")
    .select(`*, profiles:uploaded_by (username, avatar_url)`)
    .eq("subject", material.subject)
    .neq("id", material.id)
    .limit(limit)
    .order("download_count", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(normalizeMaterial);
}

// ─── Trending ─────────────────────────────────────────────────────────────
// Now paginated server-side via range() instead of always fetching the same
// fixed pool of 20 rows and slicing client-side. See useTrendingMaterials.
export async function fetchTrendingMaterials(limit = 10, offset = 0): Promise<StudyMaterial[]> {
  const { data, error } = await supabase
    .from("study_materials")
    .select(`*, profiles:uploaded_by (username, avatar_url)`)
    .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .order("trending_score", { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw error;
  return (data ?? []).map(normalizeMaterial);
}

// ─── Subjects ─────────────────────────────────────────────────────────────
export async function fetchSubjects(): Promise<string[]> {
  const { data, error } = await supabase.from("study_materials").select("subject").order("subject");
  if (error) throw error;
  return [...new Set((data ?? []).map((d) => d.subject))];
}

// ─── Save / Unsave ────────────────────────────────────────────────────────
export async function saveMaterial(userId: string, materialId: string) {
  const { error } = await supabase.from("saved_materials").insert({ user_id: userId, material_id: materialId });
  if (error) throw error;
}

export async function unsaveMaterial(userId: string, materialId: string) {
  const { error } = await supabase.from("saved_materials").delete().eq("user_id", userId).eq("material_id", materialId);
  if (error) throw error;
}

export async function fetchSavedMaterialIds(userId: string): Promise<string[]> {
  const { data, error } = await supabase.from("saved_materials").select("material_id").eq("user_id", userId);
  if (error) throw error;
  return (data ?? []).map((d) => d.material_id);
}

// ─── Ratings ─────────────────────────────────────────────────────────────
export async function rateMaterial(userId: string, materialId: string, rating: number, review?: string) {
  const { error } = await supabase.from("material_ratings").upsert({
    user_id: userId,
    material_id: materialId,
    rating,
    review,
  });
  if (error) throw error;
}

export async function fetchAverageRating(materialId: string): Promise<number> {
  const { data, error } = await supabase
    .from("material_ratings")
    .select("rating")
    .eq("material_id", materialId);
  if (error || !data?.length) return 0;
  return data.reduce((sum, r) => sum + r.rating, 0) / data.length;
}

// ─── Reactions ────────────────────────────────────────────────────────────
export async function toggleReaction(userId: string, materialId: string, emoji: string) {
  const { data: existing } = await supabase
    .from("material_reactions")
    .select("id")
    .eq("user_id", userId)
    .eq("material_id", materialId)
    .eq("emoji", emoji)
    .maybeSingle();
  if (existing) {
    await supabase.from("material_reactions").delete().eq("id", existing.id);
  } else {
    await supabase.from("material_reactions").insert({ user_id: userId, material_id: materialId, emoji });
  }
}

export async function fetchReactions(materialId: string) {
  const { data, error } = await supabase.from("material_reactions").select("emoji, user_id").eq("material_id", materialId);
  if (error) return [];
  return data;
}

// ─── Material views ───────────────────────────────────────────────────────
export async function recordMaterialView(userId: string, materialId: string) {
  try {
    const { error } = await supabase.from("material_views").insert({
      user_id: userId,
      material_id: materialId,
      viewed_at: new Date().toISOString(),
    });
    if (error) throw error;
  } catch (error: any) {
    if (error?.code === "23505") return;
    console.warn("Failed to record view", error);
  }
}

export async function fetchRecentlyViewed(userId: string, limit = 6): Promise<StudyMaterial[]> {
  const { data, error } = await supabase
    .from("material_views")
    .select(`material:material_id(*, profiles:uploaded_by (username, avatar_url))`)
    .eq("user_id", userId)
    .order("viewed_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map((v) => ({
    ...(v as any).material,
    uploader_username: (v as any).material.profiles?.username ?? null,
    uploader_avatar: (v as any).material.profiles?.avatar_url ?? null,
  }));
}

// ─── Starter packs ───────────────────────────────────────────────────────
export async function fetchStarterPacks(): Promise<StarterPack[]> {
  const { data, error } = await supabase.from("starter_packs").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as StarterPack[];
}

export async function fetchStarterPackMaterials(pack: StarterPack): Promise<StudyMaterial[]> {
  if (!pack.material_ids?.length) return [];
  const { data, error } = await supabase
    .from("study_materials")
    .select(`*, profiles:uploaded_by (username, avatar_url)`)
    .in("id", pack.material_ids);
  if (error) throw error;
  return (data ?? []).map(normalizeMaterial);
}

// ─── Credits / Premium ───────────────────────────────────────────────────
// Both awardCredits and spendCredits now go through single atomic RPCs
// instead of a client-side read-then-write, which was subject to a race
// condition (two concurrent calls could both read the same starting
// balance) and, in spendCredits' case, was calling the wrong RPC entirely
// and never actually deducting anything — see supabase_fixes.sql.
export async function awardCredits(userId: string, amount: number) {
  if (amount <= 0) return;
  const { error } = await supabase.rpc("award_credits", { p_user_id: userId, p_amount: amount });
  if (error) console.warn("Failed to award credits", error);
}

export async function spendCredits(userId: string, materialId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("spend_credits", {
    p_user_id: userId,
    p_material_id: materialId,
  });
  if (error) {
    console.warn("Failed to spend credits", error);
    return false;
  }
  return Boolean(data);
}

export async function fetchUnlockedMaterialIds(userId: string): Promise<string[]> {
  const { data } = await supabase.from("unlocked_materials").select("material_id").eq("user_id", userId);
  return (data ?? []).map((d) => d.material_id);
}

// ─── Versioning ──────────────────────────────────────────────────────────
export async function uploadNewVersion(materialId: string, fileUrl: string) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { data: versions } = await supabase
    .from("material_versions")
    .select("version_number")
    .eq("material_id", materialId)
    .order("version_number", { ascending: false })
    .limit(1);

  const nextVersion = (versions?.[0]?.version_number ?? 0) + 1;
  await supabase.from("material_versions").insert({
    material_id: materialId,
    file_url: fileUrl,
    version_number: nextVersion,
    uploaded_by: user.id,
  });
}

// ─── Leaderboard ─────────────────────────────────────────────────────────
export async function fetchLeaderboard(limit = 20) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, avatar_url, karma")
    .order("karma", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

// ─── Material Requests ────────────────────────────────────────────────────
export async function createMaterialRequest(userId: string, title: string, description?: string, subject?: string) {
  const { error } = await supabase.from("material_requests").insert({
    user_id: userId,
    title,
    description: description ?? null,
    subject: subject ?? null,
  });
  if (error) throw error;
}

export async function fetchMaterialRequests() {
  const { data, error } = await supabase
    .from("material_requests")
    .select("*, profiles:user_id (username)")
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) throw error;
  return data ?? [];
}

// ─── Material Rating (reviews list) ───────────────────────────────────────
export async function fetchMaterialRating(materialId: string) {
  const { data, error } = await supabase
    .from("material_ratings")
    .select("rating, review, user_id, created_at, profiles:user_id (username)")
    .eq("material_id", materialId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

// ─── Upload & Karma ──────────────────────────────────────────────────────
// Fixed: this used to loop `amount` times, firing one HTTP RPC call per
// karma point (awarding 50 karma = 50 sequential network requests). The
// underlying increment() RPC now accepts an `amount` parameter directly
// (see supabase_fixes.sql), so this is a single atomic call.
export async function awardKarma(userId: string, amount: number, _reason?: string) {
  if (amount <= 0) return;
  const { error } = await supabase.rpc("increment", {
    table_name: "profiles",
    column_name: "karma",
    row_id: userId,
    amount,
  });
  if (error) console.warn("Failed to award karma", error);
}

export async function uploadStudyMaterial(
  material: Omit<StudyMaterial, "id" | "created_at" | "download_count" | "uploader_username" | "uploader_avatar">
) {
  const { data, error } = await supabase
    .from("study_materials")
    .insert(material)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Increment download count ─────────────────────────────────────────────
export async function incrementDownloadCount(id: string) {
  await supabase.rpc("increment", { table_name: "study_materials", column_name: "download_count", row_id: id });
}