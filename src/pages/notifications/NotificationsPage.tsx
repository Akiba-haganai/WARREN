import AppShell from "../../components/layout/AppShell";
import { useNotifications } from "../../features/notifications/hooks/useNotifications";
import { NotificationList } from "../../features/notifications/components/NotificationList";

import { useQueryClient } from "@tanstack/react-query";
import PullToRefresh from "../../components/ui/PullToRefresh";

export default function NotificationsPage() {
  const queryClient = useQueryClient();

  const { notifications, isLoading, markAsRead, markAllRead } = useNotifications();

  const handleRefresh = () =>
    queryClient.invalidateQueries({ queryKey: ["notifications"] });

  return (
    <AppShell>
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="px-4 pb-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Notifications</h1>
            {notifications.some((n) => !n.read) && (
              <button
                onClick={() => markAllRead()}
                className="text-sm text-blue-600 font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>
          {isLoading ? (
            <div className="space-y-2">
              {[1,2,3].map(i => <div key={i} className="h-20 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />)}
            </div>
          ) : (
            <NotificationList
              notifications={notifications}
              onMarkRead={(id) => markAsRead([id])}
            />
          )}
        </div>
      </PullToRefresh>
    </AppShell>
  );
}
