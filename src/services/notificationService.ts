import { supabase } from "../lib/supabase";
import type { Database } from "../types/database.types";

export type Notification =
  Database["public"]["Tables"]["notifications"]["Row"];

export async function fetchNotifications(
  userId: string
): Promise<Notification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    })
    .limit(50);

  if (error) throw error;

  return data ?? [];
}

export async function markAsRead(
  notificationIds: string[]
): Promise<void> {
  const { error } = await supabase
    .from("notifications")
    .update({
      read: true,
    })
    .in("id", notificationIds);

  if (error) throw error;
}

export async function markAllAsRead(
  userId: string
): Promise<void> {
  const { error } = await supabase
    .from("notifications")
    .update({
      read: true,
    })
    .eq("user_id", userId)
    .eq("read", false);

  if (error) throw error;
}

export async function getUnreadCount(
  userId: string
): Promise<number> {
  const { count, error } = await supabase
    .from("notifications")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId)
    .eq("read", false);

  if (error) throw error;

  return count ?? 0;
}

export function subscribeToNotifications(
  userId: string,
  callback: () => void
) {
  return supabase
    .channel(`notifications-${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${userId}`,
      },
      () => {
        callback();
      }
    )
    .subscribe();
}