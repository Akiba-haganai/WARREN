import { supabase } from "../lib/supabase";
import type { Database } from "../types/database.types";

type DirectMessage = Database["public"]["Tables"]["direct_messages"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type DirectMessageWithProfile = DirectMessage & {
  sender: Pick<Profile, "username" | "avatar_url"> | null;
};

export type Conversation = {
  user_id: string;
  username: string | null;
  avatar_url: string | null;
  last_message: string;
  last_message_at: string;
  unread_count: number;
};

// Fetch recent conversations for a user
export async function fetchConversations(userId: string): Promise<Conversation[]> {
  // Get all messages where the user is sender or receiver
  const { data, error } = await supabase
    .from("direct_messages")
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  if (!data?.length) return [];

  // Group by conversation partner
  const conversationsMap = new Map<string, Conversation>();
  for (const msg of data) {
    const partnerId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
    if (!conversationsMap.has(partnerId)) {
      // Fetch partner profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", partnerId)
        .single();

      conversationsMap.set(partnerId, {
        user_id: partnerId,
        username: profile?.username ?? null,
        avatar_url: profile?.avatar_url ?? null,
        last_message: msg.content,
        last_message_at: msg.created_at,
        unread_count: 0,
      });
    }
    // Count unread (messages received and not read – simplified: all from partner are "unread")
    if (msg.sender_id === partnerId && msg.receiver_id === userId) {
      const conv = conversationsMap.get(partnerId)!;
      conv.unread_count += 1;
    }
  }

  return Array.from(conversationsMap.values()).sort(
    (a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()
  );
}

// Existing fetchConversation (unchanged)
export async function fetchConversation(
  user1: string,
  user2: string,
  limit = 50
): Promise<DirectMessageWithProfile[]> {
  const { data, error } = await supabase
    .from("direct_messages")
    .select("*, sender:profiles!direct_messages_sender_id_fkey (username, avatar_url)")
    .or(`and(sender_id.eq.${user1},receiver_id.eq.${user2}),and(sender_id.eq.${user2},receiver_id.eq.${user1})`)
    .order("created_at", { ascending: true })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map((msg: any) => ({
    ...msg,
    sender: msg.sender ?? null,
  })) as DirectMessageWithProfile[];
}

export async function sendDirectMessage(
  senderId: string,
  receiverId: string,
  content: string
): Promise<DirectMessageWithProfile> {
  // Blocking checks
  const { data: blockData } = await supabase
    .from("blocked_users")
    .select("id")
    .eq("blocker_id", receiverId)
    .eq("blocked_id", senderId)
    .maybeSingle();
  if (blockData) throw new Error("You cannot message this user.");

  const { data: blockData2 } = await supabase
    .from("blocked_users")
    .select("id")
    .eq("blocker_id", senderId)
    .eq("blocked_id", receiverId)
    .maybeSingle();
  if (blockData2) throw new Error("You have blocked this user. Unblock to send a message.");

  // Insert message
  const { data, error } = await supabase
    .from("direct_messages")
    .insert({ sender_id: senderId, receiver_id: receiverId, content })
    .select("*, sender:profiles!direct_messages_sender_id_fkey (username, avatar_url)")
    .single();
  if (error) throw error;

  // Create notification for receiver
  const { data: sender } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", senderId)
    .single();

  await supabase.from("notifications").insert({
    user_id: receiverId,
    title: `New message from ${sender?.username ?? "someone"}`,
    body: content.slice(0, 100),
    type: "direct_message",
    data: { sender_id: senderId },
  });

  return { ...data, sender: (data as any).sender ?? null } as DirectMessageWithProfile;
}