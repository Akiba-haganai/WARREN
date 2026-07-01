import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  subscribeToNotifications,
} from "../services/notifications.service";
import { useNotificationsStore } from "../store/notifications.store";
import { useAuthStore } from "../../../store/authStore";
import { supabase } from "../../../lib/supabase";

export function useNotifications() {
  const queryClient = useQueryClient();
  const setUnreadCount = useNotificationsStore((s) => s.setUnreadCount);
  const user = useAuthStore((s) => s.user);
  const userId = user?.id;

  const notificationsQuery = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => fetchNotifications(userId!),
    enabled: !!userId,
  });

  const unreadCountQuery = useQuery({
    queryKey: ["notifications", userId, "unread"],
    queryFn: () => getUnreadCount(userId!),
    enabled: !!userId,
  });

  useEffect(() => {
    if (unreadCountQuery.data !== undefined) {
      setUnreadCount(unreadCountQuery.data);
    }
  }, [unreadCountQuery.data, setUnreadCount]);

  const markAsReadMutation = useMutation({
    mutationFn: (ids: string[]) => markAsRead(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => markAllAsRead(userId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    },
  });

  useEffect(() => {
    if (!userId) return;
    const channel = subscribeToNotifications(userId, () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    });
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);

  return {
    notifications: notificationsQuery.data ?? [],
    unreadCount: unreadCountQuery.data ?? 0,
    isLoading: notificationsQuery.isLoading,
    markAsRead: markAsReadMutation.mutate,
    markAllRead: markAllReadMutation.mutate,
  };
}