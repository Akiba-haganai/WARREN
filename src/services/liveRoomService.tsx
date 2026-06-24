import { supabase } from "../lib/supabase";

export type LiveRoom = {
  id: string;
  topic: string;
  community_id: string | null;
  created_by: string;
  expires_at: string;
  created_at: string;
};

export type LiveRoomMessage = {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: { username: string | null; avatar_url: string | null } | null;
};

export async function fetchActiveRooms(): Promise<LiveRoom[]> {
  const { data, error } = await supabase
    .from("live_rooms")
    .select("*")
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as LiveRoom[];
}

export async function createRoom(topic: string, durationMinutes: number, communityId?: string): Promise<LiveRoom> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const expiresAt = new Date(Date.now() + durationMinutes * 60000).toISOString();
  const { data, error } = await supabase
    .from("live_rooms")
    .insert({ topic, community_id: communityId || null, created_by: user.id, expires_at: expiresAt })
    .select()
    .single();
  if (error) throw error;
  return data as LiveRoom;
}

export async function fetchRoomMessages(roomId: string): Promise<LiveRoomMessage[]> {
  const { data, error } = await supabase
    .from("live_room_messages")
    .select("*, profiles:user_id (username, avatar_url)")
    .eq("room_id", roomId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((m: any) => ({
    ...m,
    profiles: Array.isArray(m.profiles) ? m.profiles[0] ?? null : m.profiles,
  }));
}

export async function sendRoomMessage(roomId: string, content: string): Promise<LiveRoomMessage> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("live_room_messages")
    .insert({ room_id: roomId, user_id: user.id, content })
    .select("*, profiles:user_id (username, avatar_url)")
    .single();
  if (error) throw error;
  return { ...data, profiles: Array.isArray((data as any).profiles) ? (data as any).profiles[0] ?? null : (data as any).profiles };
}

export function subscribeToRoomMessages(roomId: string, callback: (msg: LiveRoomMessage) => void) {
  return supabase
    .channel(`live_room:${roomId}`)
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "live_room_messages", filter: `room_id=eq.${roomId}` },
      async (payload) => {
        const { data } = await supabase.from("live_room_messages").select("*, profiles:user_id (username, avatar_url)").eq("id", payload.new.id).single();
        if (data) callback({ ...data, profiles: Array.isArray((data as any).profiles) ? (data as any).profiles[0] ?? null : (data as any).profiles });
      }
    )
    .subscribe();
}