import { NotificationCard } from "./NotificationCard";
import type { Database } from "../../../types/database.types";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

interface Props {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
}

export function NotificationList({ notifications, onMarkRead }: Props) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12 opacity-60">
        <p className="font-semibold">No notifications</p>
        <p className="text-sm mt-1">You're all caught up!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notifications.map((n) => (
        <NotificationCard key={n.id} notification={n} onMarkRead={onMarkRead} />
      ))}
    </div>
  );
}