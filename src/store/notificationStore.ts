import { create } from "zustand";
import {
  fetchNotifications,
  markAllAsRead,
  getUnreadCount,
  subscribeToNotifications,
  type Notification,
} from "../services/notificationService";
import { supabase } from "../lib/supabase";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  open: boolean;

  loadNotifications: (userId: string) => Promise<void>;
  subscribe: (userId: string) => void;
  unsubscribe: () => void;
  markAllRead: (userId: string) => Promise<void>;
  setOpen: (open: boolean) => void;
}

let channel: ReturnType<typeof supabase.channel> | null = null;

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  open: false,

  loadNotifications: async (userId: string) => {
    set({ loading: true });
    try {
      const [notifs, count] = await Promise.all([
        fetchNotifications(userId),
        getUnreadCount(userId),
      ]);
      set({ notifications: notifs, unreadCount: count });
    } catch (err) {
      console.error("Failed to load notifications:", err);
    } finally {
      set({ loading: false });
    }
  },

  subscribe: (userId: string) => {
    if (channel) {
      supabase.removeChannel(channel);
    }
    channel = subscribeToNotifications(userId, () => {
      get().loadNotifications(userId);
    });
  },

  unsubscribe: () => {
    if (channel) {
      supabase.removeChannel(channel);
      channel = null;
    }
  },

  markAllRead: async (userId: string) => {
    await markAllAsRead(userId);
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  },

  setOpen: (open: boolean) => set({ open }),
}));