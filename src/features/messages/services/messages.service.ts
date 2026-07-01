import { supabase } from "../../../lib/supabase";

export type Conversation = {
  user_id: string;
  username: string | null;
  avatar_url: string | null;
  last_message: string;
  last_message_at: string;
  unread_count: number;
};

export type DirectMessageWithProfile = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string | null;
    avatar_url: string | null;
  } | null;
};

export async function fetchConversations(userId: string): Promise<Conversation[]> {
  // Fetch all direct messages where the user is sender or receiver
  const { data: messages, error } = await supabase
    .from("direct_messages")
    .select("sender_id, receiver_id, content, created_at")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order("created_at", { ascending: false });

  if (error) throw error;

  const partnersMap = new Map<string, { lastMessage: string; lastMessageAt: string; unreadCount: number }>();

  for (const msg of messages ?? []) {
    const partnerId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
    const existing = partnersMap.get(partnerId);
    if (!existing || new Date(msg.created_at) > new Date(existing.lastMessageAt)) {
      partnersMap.set(partnerId, {
        lastMessage: msg.content,
        lastMessageAt: msg.created_at,
        unreadCount: 0,
      });
    }
  }

  // Get profiles for all partners
  const partnerIds = Array.from(partnersMap.keys());
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, username, avatar_url")
    .in("id", partnerIds);

  const profileMap = new Map(profiles?.map(p => [p.id, p]) ?? []);

  return Array.from(partnersMap.entries()).map(([partnerId, data]) => ({
    user_id: partnerId,
    username: profileMap.get(partnerId)?.username ?? "Unknown",
    avatar_url: profileMap.get(partnerId)?.avatar_url ?? null,
    last_message: data.lastMessage,
    last_message_at: data.lastMessageAt,
    unread_count: data.unreadCount,
  }));
}

export async function fetchConversation(userId: string, partnerId: string): Promise<DirectMessageWithProfile[]> {
  const { data, error } = await supabase
    .from("direct_messages")
    .select("*, profiles:sender_id (username, avatar_url)")
    .or(`and(sender_id.eq.${userId},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${userId})`)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((msg: any) => ({
    ...msg,
    profiles: Array.isArray(msg.profiles) ? msg.profiles[0] ?? null : msg.profiles,
  })) as DirectMessageWithProfile[];
}

export async function sendDirectMessage(senderId: string, receiverId: string, content: string): Promise<DirectMessageWithProfile> {
  const { data, error } = await supabase
    .from("direct_messages")
    .insert({ sender_id: senderId, receiver_id: receiverId, content })
    .select("*, profiles:sender_id (username, avatar_url)")
    .single();
  if (error) throw error;
  return {
    ...data,
    profiles: Array.isArray((data as any).profiles) ? (data as any).profiles[0] ?? null : (data as any).profiles,
  } as DirectMessageWithProfile;
}