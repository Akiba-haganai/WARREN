import { Bell } from "lucide-react";
import { useNotificationsStore } from "../../features/notifications/store/notifications.store";
import { useNavigate } from "react-router-dom";

export function NotificationBell() {
  const unreadCount = useNotificationsStore((s) => s.unreadCount);
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/notifications")} className="relative p-2" aria-label="Notifications">
      <Bell size={20} />
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </button>
  );
}