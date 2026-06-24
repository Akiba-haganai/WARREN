import { supabase } from "../lib/supabase";
import type { Database } from "../types/database.types";

type CommunityMessage = Database["public"]["Tables"]["community_messages"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type CommunityMessageWithProfile = CommunityMessage & {
  profiles: Pick<Profile, "username" | "avatar_url"> | null;
};

// Fetch messages with profile info
export async function fetchMessages(
  communityId: string,
  limit = 50
): Promise<CommunityMessageWithProfile[]> {
  const { data, error } = await supabase
    .from("community_messages")
    .select("*, profiles:user_id (username, avatar_url)")
    .eq("community_id", communityId)
    .order("created_at", { ascending: true })
    .limit(limit);
  if (error) throw error;

  return (data ?? []).map((msg: any) => ({
    ...msg,
    profiles: Array.isArray(msg.profiles) ? msg.profiles[0] ?? null : msg.profiles,
  })) as CommunityMessageWithProfile[];
}

// Send text message
export async function sendTextMessage(
  communityId: string,
  userId: string,
  content: string
): Promise<CommunityMessageWithProfile> {
  const { data, error } = await supabase
    .from("community_messages")
    .insert({ community_id: communityId, user_id: userId, content, type: "text" })
    .select("*, profiles:user_id (username, avatar_url)")
    .single();
  if (error) throw error;
  return {
    ...data,
    profiles: Array.isArray((data as any).profiles) ? (data as any).profiles[0] ?? null : (data as any).profiles,
  } as CommunityMessageWithProfile;
}

// Send image message (after upload)
export async function sendImageMessage(
  communityId: string,
  userId: string,
  imageUrl: string
): Promise<CommunityMessageWithProfile> {
  const { data, error } = await supabase
    .from("community_messages")
    .insert({ community_id: communityId, user_id: userId, type: "image", image_url: imageUrl })
    .select("*, profiles:user_id (username, avatar_url)")
    .single();
  if (error) throw error;
  return {
    ...data,
    profiles: Array.isArray((data as any).profiles) ? (data as any).profiles[0] ?? null : (data as any).profiles,
  } as CommunityMessageWithProfile;
}

// Send GIF (external URL)
export async function sendGifMessage(
  communityId: string,
  userId: string,
  gifUrl: string
): Promise<CommunityMessageWithProfile> {
  const { data, error } = await supabase
    .from("community_messages")
    .insert({ community_id: communityId, user_id: userId, type: "gif", image_url: gifUrl })
    .select("*, profiles:user_id (username, avatar_url)")
    .single();
  if (error) throw error;
  return {
    ...data,
    profiles: Array.isArray((data as any).profiles) ? (data as any).profiles[0] ?? null : (data as any).profiles,
  } as CommunityMessageWithProfile;
}

// Image compression helper
async function compressImage(file: File): Promise<File> {
  const imageCompression = (await import("browser-image-compression")).default;
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1280,
    useWebWorker: true,
    fileType: "image/webp" as const,
  };
  return imageCompression(file, options);
}

// Upload image to storage and return public URL
export async function uploadChatImage(file: File, userId: string): Promise<string> {
  const compressed = await compressImage(file);
  const filePath = `${userId}/${Date.now()}_${compressed.name}`;
  const { error } = await supabase.storage
    .from("community-chat-images")
    .upload(filePath, compressed);
  if (error) throw error;
  const { data } = supabase.storage.from("community-chat-images").getPublicUrl(filePath);
  return data.publicUrl;
}

// Real-time subscription
export function subscribeToMessages(
  communityId: string,
  callback: (msg: CommunityMessageWithProfile) => void
) {
  return supabase
    .channel(`community_messages:${communityId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "community_messages",
        filter: `community_id=eq.${communityId}`,
      },
      async (payload) => {
        const { data } = await supabase
          .from("community_messages")
          .select("*, profiles:user_id (username, avatar_url)")
          .eq("id", payload.new.id)
          .single();
        if (data) {
          callback({
            ...data,
            profiles: Array.isArray((data as any).profiles) ? (data as any).profiles[0] ?? null : (data as any).profiles,
          } as CommunityMessageWithProfile);
        }
      }
    )
    .subscribe();
}

// Delete message (optional)
export async function deleteMessage(messageId: string): Promise<void> {
  const { error } = await supabase.from("community_messages").delete().eq("id", messageId);
  if (error) throw error;
}