import { supabase } from "../lib/supabase";
import type { Database } from "../types/database.types";

export type Announcement =
  Database["public"]["Tables"]["announcements"]["Row"];

export async function fetchAnnouncements() {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data ?? [];
}

export async function createAnnouncement(
  title: string,
  content: string,
  imageUrl?: string | null,
  documentUrl?: string | null,
  category = "general"
) {
  const { error } = await supabase
    .from("announcements")
    .insert({
      title,
      content,
      image_url: imageUrl,
      document_url: documentUrl,
      category,
    });

  if (error) throw error;
}

export async function deleteAnnouncement(
  id: string
) {
  const { error } = await supabase
    .from("announcements")
    .delete()
    .eq("id", id);

  if (error) throw error;
}