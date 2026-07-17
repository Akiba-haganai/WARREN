import { supabase } from "../lib/supabase";
import type { Database } from "../types/database.types";

type CommunityMessage = Database["public"]["Tables"]["community_messages"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type CommunityMessageWithProfile = CommunityMessage & {
  profiles: Pick<Profile, "username" | "avatar_url" | "role"> | null;
  is_announcement?: boolean;
  file_name?: string;
};

// ── Fetch messages with profile info ─────────────────────────────────────
export async function fetchMessages(
  communityId: string,
  limit = 50
): Promise<CommunityMessageWithProfile[]> {
  const { data, error } = await supabase
    .from("community_messages")
    .select("*, profiles:user_id (username, avatar_url, role)")
    .eq("community_id", communityId)
    .order("created_at", { ascending: true })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map((msg: any) => ({
    ...msg,
    profiles: Array.isArray(msg.profiles) ? msg.profiles[0] ?? null : msg.profiles,
  })) as CommunityMessageWithProfile[];
}

// ── Send text message (with optional type for polls) ─────────────────────
export async function sendTextMessage(
  communityId: string,
  userId: string,
  content: string,
  parentId?: string,
  isAnnouncement?: boolean,
  messageType: "text" | "poll" = "text"
): Promise<CommunityMessageWithProfile> {
  const { data, error } = await supabase
    .from("community_messages")
    .insert({
      community_id: communityId,
      user_id: userId,

      // For polls we store the poll_id inside `content` (existing app convention)
      // while still setting message.type = "poll".
      content,
      type: messageType,
      parent_id: parentId ?? null,
      is_announcement: isAnnouncement ?? false,

      // If the table has a dedicated poll_id column, populate it.
      // (This keeps poll rendering working without breaking text messages.)
      poll_id: messageType === "poll" ? content : null,
    } as any)
    .select("*, profiles:user_id (username, avatar_url, role)")
    .single();
  if (error) throw error;
  return {
    ...data,
    profiles: Array.isArray((data as any).profiles)
      ? (data as any).profiles[0] ?? null
      : (data as any).profiles,
  } as CommunityMessageWithProfile;
}

// ── Send image message ───────────────────────────────────────────────────
export async function sendImageMessage(
  communityId: string,
  userId: string,
  imageUrl: string,
  parentId?: string,
  isAnnouncement?: boolean
): Promise<CommunityMessageWithProfile> {
  const { data, error } = await supabase
    .from("community_messages")
    .insert({
      community_id: communityId,
      user_id: userId,
      type: "image",
      image_url: imageUrl,
      parent_id: parentId ?? null,
      is_announcement: isAnnouncement ?? false,
    })
    .select("*, profiles:user_id (username, avatar_url, role)")
    .single();
  if (error) throw error;
  return {
    ...data,
    profiles: Array.isArray((data as any).profiles)
      ? (data as any).profiles[0] ?? null
      : (data as any).profiles,
  } as CommunityMessageWithProfile;
}

// ── Send GIF ─────────────────────────────────────────────────────────────
export async function sendGifMessage(
  communityId: string,
  userId: string,
  gifUrl: string
): Promise<CommunityMessageWithProfile> {
  const { data, error } = await supabase
    .from("community_messages")
    .insert({ community_id: communityId, user_id: userId, type: "gif", image_url: gifUrl })
    .select("*, profiles:user_id (username, avatar_url, role)")
    .single();
  if (error) throw error;
  return {
    ...data,
    profiles: Array.isArray((data as any).profiles)
      ? (data as any).profiles[0] ?? null
      : (data as any).profiles,
  } as CommunityMessageWithProfile;
}

// ── Image compression helper ─────────────────────────────────────────────
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

// ── Upload chat image ────────────────────────────────────────────────────
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

// ── Real-time subscription ───────────────────────────────────────────────
export function subscribeToMessages(
  communityId: string,
  callback: (msg: CommunityMessageWithProfile) => void
) {
  const channel = supabase
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
          .select("*, profiles:user_id (username, avatar_url, role)")
          .eq("id", payload.new.id)
          .single();
        if (data) {
          callback({
            ...data,
            profiles: Array.isArray((data as any).profiles)
              ? (data as any).profiles[0] ?? null
              : (data as any).profiles,
          } as CommunityMessageWithProfile);
        }
      }
    )
    .subscribe();
  return channel;
}

// ── Delete message ───────────────────────────────────────────────────────
export async function deleteMessage(messageId: string): Promise<void> {
  const { error } = await supabase.from("community_messages").delete().eq("id", messageId);
  if (error) throw error;
}

// ── Mark messages as read (FIXED) ────────────────────────────────────────
export async function markMessagesAsRead(communityId: string, userId: string) {
  // 1. Fetch already‑read message IDs for this user
  const { data: alreadyRead } = await supabase
    .from("message_reads")
    .select("message_id")
    .eq("user_id", userId);
  const readIds = (alreadyRead ?? []).map((r) => r.message_id);

  // 2. Fetch all message IDs in the community
  const { data: allMessages } = await supabase
    .from("community_messages")
    .select("id")
    .eq("community_id", communityId);

  // 3. Messages not yet read, limited to 100
  const unreadIds = (allMessages ?? [])
    .filter((m) => !readIds.includes(m.id))
    .slice(0, 100);
  if (unreadIds.length === 0) return;

  // 4. Upsert read receipts
  const rows = unreadIds.map((m) => ({ user_id: userId, message_id: m.id }));
  await supabase.from("message_reads").upsert(rows);
}

// ── Notify mentioned users ───────────────────────────────────────────────
export async function notifyMentions(senderId: string, content: string) {
  const matches = content.match(/<@([a-f0-9-]+)>/g);
  if (!matches) return;
  const userIds = matches.map((m) => m.slice(2, -1));
  const { data: users } = await supabase.from("profiles").select("id, username").in("id", userIds);
  for (const id of userIds) {
    if (id === senderId) continue;
    await supabase.from("notifications").insert({
      user_id: id,
      title: "You were mentioned",
      body: `${users?.find((u) => u.id === id)?.username || "Someone"} mentioned you in a chat`,
      type: "mention",
    });
  }
}

// ── Create poll ──────────────────────────────────────────────────────────
export async function createPoll(communityId: string, question: string, options: string[]) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");
  const { data: poll } = await supabase
    .from("chat_polls")
    .insert({ community_id: communityId, question, created_by: user.id })
    .select()
    .single();
  if (poll) {
    const optionRows = options.map((text) => ({ poll_id: poll.id, option_text: text }));
    await supabase.from("chat_poll_options").insert(optionRows);
  }
  return poll;
}

// ── Fetch poll with results (FIXED) ──────────────────────────────────────
export async function fetchPoll(pollId: string) {
  const { data: poll } = await supabase
    .from("chat_polls")
    .select("*, options:chat_poll_options(id, option_text)")
    .eq("id", pollId)
    .single();
  if (!poll) return null;

  const optionIds = (poll.options as any[]).map((o: any) => o.id);
  const { data: votes } = await supabase
    .from("chat_poll_votes")
    .select("option_id, user_id")
    .in("option_id", optionIds);

  const user = (await supabase.auth.getUser()).data.user;
  const optionsWithVotes = (poll.options as any[]).map((o: any) => ({
    ...o,
    votes: (votes ?? []).filter((v: any) => v.option_id === o.id).length,
  }));
  const totalVotes = optionsWithVotes.reduce((sum: number, o: any) => sum + o.votes, 0);
  const userVote = (votes ?? []).find((v: any) => v.user_id === user?.id)?.option_id;
  return { ...poll, options: optionsWithVotes, totalVotes, userVote };
}