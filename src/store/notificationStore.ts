import { create } from "zustand";
import { supabase } from "../lib/supabase";
import type { Database } from "../types/database.types";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  loadNotifications: (userId: string) => Promise<void>;
  subscribe: (userId: string) => () => void;    // returns cleanup
  markAsRead: (ids: string[]) => Promise<void>;
  markAllRead: (userId: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  loadNotifications: async (userId: string) => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);
    if (!error && data) {
      set({ notifications: data, unreadCount: data.filter((n) => !n.read).length });
    }
    set({ loading: false });
  },

  subscribe: (userId: string) => {
    const channel = supabase
      .channel(`notifications-${userId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${userId}` },
        () => {
          if (userId) get().loadNotifications(userId);
        }
      )
      .subscribe();

    // return cleanup function
    return () => {
      supabase.removeChannel(channel);
    };
  },

  markAsRead: async (ids: string[]) => {
    await supabase.from("notifications").update({ read: true }).in("id", ids);
    set((state) => ({
      notifications: state.notifications.map((n) =>
        ids.includes(n.id) ? { ...n, read: true } : n
      ),
      unreadCount: state.unreadCount - ids.length,
    }));
  },

  markAllRead: async (userId: string) => {
    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", userId)
      .eq("read", false);
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  },
}));