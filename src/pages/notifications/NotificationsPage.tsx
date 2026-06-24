import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useNotificationStore } from "../../store/notificationStore";
import { useAuthStore } from "../../store/authStore";
import { Bell, CheckCheck, Loader2, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsPage() {
  const user = useAuthStore((s) => s.user);
  const {
    notifications,
    loading,
    loadNotifications,
    markAllRead,
    subscribe,
  } = useNotificationStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    loadNotifications(user.id);
    // Proper subscription handling
    const cleanup = subscribe(user.id);
    return () => {
      cleanup?.();
    };
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNotificationClick = (notif: any) => {
    if (notif.type === "direct_message" && notif.data?.sender_id) {
      navigate(`/messages/${notif.data.sender_id}`);
    } else if (notif.data?.post_id) {
      navigate("/");
    } else if (notif.data?.announcement_id) {
      navigate("/announcements");
    } else if (notif.data?.community_id) {
      navigate(`/community/${notif.data.community_id}/chat`);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Notifications</h1>
            <p className="text-xs text-slate-500 mt-0.5">{unreadCount} unread</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={() => markAllRead(user!.id)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium"
            >
              <CheckCheck size={16} /> Mark all read
            </button>
          )}
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin" size={24} />
          </div>
        )}

        {!loading && notifications.length === 0 && (
          <div className="text-center py-12 animate-in fade-in zoom-in-95">
            <div className="bg-slate-100 dark:bg-slate-800 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={32} className="opacity-40" />
            </div>
            <p className="font-bold text-xl tracking-tight opacity-80">No notifications yet</p>
            <p className="text-base mt-2 leading-relaxed opacity-60">Updates and replies will appear here.</p>
          </div>
        )}

        <div className="space-y-3">
          {notifications.map((notif) => (
            <button
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`w-full text-left p-4 min-h-[44px] rounded-2xl transition-all duration-200 motion-safe:active:scale-[0.98] ${
                notif.read
                  ? "bg-white dark:bg-slate-900 hover:shadow-sm"
                  : "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 shadow-sm"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1.5 h-2.5 w-2.5 rounded-full shrink-0 ${
                    notif.read ? "bg-slate-300 dark:bg-slate-700" : "bg-blue-500"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm flex items-center gap-2">
                    {notif.type === "direct_message" && <MessageCircle size={14} className="text-blue-500" />}
                    {notif.title}
                  </p>
                  {notif.body && (
                    <p className="text-sm opacity-70 mt-1 line-clamp-2">{notif.body}</p>
                  )}
                  <p className="text-xs opacity-50 mt-2">
                    {notif.created_at
                      ? formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })
                      : "just now"}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
