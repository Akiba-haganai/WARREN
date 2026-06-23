import { supabase } from '../lib/supabase';

export type StudyMaterial = {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  year_group: string; // e.g. "Year 1", "Year 2", "All Years"
  material_type: 'notes' | 'slides' | 'past_paper' | 'assignment' | 'resource' | 'video';
  file_url: string | null;
  external_url: string | null;
  thumbnail_url: string | null;
  uploaded_by: string;
  created_at: string;
  tags: string[] | null;
  download_count: number;
  is_pinned: boolean;
  // joined
  uploader_username?: string | null;
  uploader_avatar?: string | null;
};

export type StudyFilters = {
  search?: string;
  year_group?: string;
  subject?: string;
  material_type?: string;
};

// ─── Fetch materials with optional filters ────────────────────────────────────
export async function fetchStudyMaterials(filters: StudyFilters = {}): Promise<StudyMaterial[]> {
  let query = supabase
    .from('study_materials')
    .select(`
      *,
      profiles:uploaded_by (
        username,
        avatar_url
      )
    `)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false });

  if (filters.year_group && filters.year_group !== 'All') {
    query = query.or(`year_group.eq.${filters.year_group},year_group.eq.All Years`);
  }

  if (filters.subject && filters.subject !== 'All') {
    query = query.eq('subject', filters.subject);
  }

  if (filters.material_type && filters.material_type !== 'All') {
    query = query.eq('material_type', filters.material_type);
  }

  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,subject.ilike.%${filters.search}%`
    );
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data ?? []).map((item: any) => ({
    ...item,
    uploader_username: item.profiles?.username ?? null,
    uploader_avatar: item.profiles?.avatar_url ?? null,
  }));
}

// ─── Fetch distinct subjects for filter chips ─────────────────────────────────
export async function fetchSubjects(): Promise<string[]> {
  const { data, error } = await supabase
    .from('study_materials')
    .select('subject')
    .order('subject');
  if (error) throw error;
  const unique = [...new Set((data ?? []).map((d: any) => d.subject as string))];
  return unique;
}

// ─── Increment download count ─────────────────────────────────────────────────
export async function incrementDownloadCount(id: string) {
  await supabase.rpc('increment', {
    table_name: 'study_materials',
    column_name: 'download_count',
    row_id: id,
  });
}

// ─── Bookmark / saved material ────────────────────────────────────────────────
export async function saveMaterial(userId: string, materialId: string) {
  const { error } = await supabase
    .from('saved_materials')
    .insert({ user_id: userId, material_id: materialId });
  if (error) throw error;
}

export async function unsaveMaterial(userId: string, materialId: string) {
  const { error } = await supabase
    .from('saved_materials')
    .delete()
    .eq('user_id', userId)
    .eq('material_id', materialId);
  if (error) throw error;
}

export async function fetchSavedMaterialIds(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('saved_materials')
    .select('material_id')
    .eq('user_id', userId);
  if (error) throw error;
  return (data ?? []).map((d: any) => d.material_id as string);
}

// ─── Upload a new material (admin/moderator) ──────────────────────────────────
export async function uploadStudyMaterial(
  material: Omit<StudyMaterial, 'id' | 'created_at' | 'download_count' | 'uploader_username' | 'uploader_avatar'>
) {
  const { data, error } = await supabase
    .from('study_materials')
    .insert({ ...material, download_count: 0 })
    .select()
    .single();
  if (error) throw error;
  return data;
}