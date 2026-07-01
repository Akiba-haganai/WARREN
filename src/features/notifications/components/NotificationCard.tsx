import type { Database } from "../../../types/database.types";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

interface Props {
  notification: Notification;
  onMarkRead: (id: string) => void;
}

export function NotificationCard({ notification, onMarkRead }: Props) {
  return (
    <div
      className={`p-4 rounded-2xl border ${
        notification.read
          ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
          : "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
      } cursor-pointer`}
      onClick={() => {
        if (!notification.read) onMarkRead(notification.id);
      }}
    >
      <h4 className="font-semibold text-sm">{notification.title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{notification.body}</p>
      <p className="text-[10px] text-slate-400 mt-2">
        {new Date(notification.created_at!).toLocaleString()}
      </p>
    </div>
  );
}