import { supabase } from "../lib/supabase";

export async function uploadCommentImage(
  file: File,
  userId: string
) {
  const ext =
    file.name.split(".").pop();

  const path =
    `${userId}/${crypto.randomUUID()}.${ext}`;

  const { error } =
    await supabase.storage
      .from("comment-images")
      .upload(path, file);

  if (error) throw error;

  const { data } =
    supabase.storage
      .from("comment-images")
      .getPublicUrl(path);

  return data.publicUrl;
}

// Lightweight passthrough image compressor (no-op) used by UploadMaterialPage.
export async function compressImage(file: File): Promise<File> {
  return file;
}