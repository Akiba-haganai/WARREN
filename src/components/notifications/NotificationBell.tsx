import { Bell } from "lucide-react";
import { useNotificationStore } from "../../store/notificationStore";
import { useNavigate } from "react-router-dom";

export default function NotificationBell() {
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/notifications")}
      aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
      className="relative h-11 w-11 min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-200 motion-safe:active:scale-[0.98]"
    >
      <Bell size={20} className={unreadCount > 0 ? "text-blue-600 motion-safe:animate-pulse" : ""} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );
}