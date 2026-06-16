import { Bell } from "lucide-react";
import { useNotificationStore } from "../../store/notificationStore";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function NotificationBell() {
  const user = useAuthStore((s) => s.user);

  const {
    notifications,
    unreadCount,
    open,
    loading,
    loadNotifications,
    subscribe,
    unsubscribe,
    markAllRead,
    setOpen,
  } = useNotificationStore();

  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    loadNotifications(user.id);
    subscribe(user.id);

    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          e.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClick
      );
    };
  }, [setOpen]);

  const handleNotificationClick = (
    notif: any
  ) => {
    setOpen(false);

    if (notif.data?.post_id) {
      navigate("/");
      return;
    }

    if (
      notif.data?.announcement_id
    ) {
      navigate(
        "/announcements"
      );
    }
  };

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        aria-label="Notifications"
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9
              ? "9+"
              : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 max-h-96 overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-50">
          <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-semibold">
              Notifications
            </h3>

            {unreadCount > 0 &&
              user && (
                <button
                  onClick={() =>
                    markAllRead(
                      user.id
                    )
                  }
                  className="text-xs text-blue-600 hover:underline"
                >
                  Mark all read
                </button>
              )}
          </div>

          {loading && (
            <div className="p-4 text-center text-sm opacity-60">
              Loading...
            </div>
          )}

          {!loading &&
            notifications.length ===
              0 && (
              <div className="p-6 text-center">
                <Bell
                  size={32}
                  className="mx-auto opacity-30 mb-2"
                />

                <p className="text-sm opacity-60">
                  No notifications
                  yet
                </p>
              </div>
            )}

          {notifications.map(
            (notif) => (
              <button
                key={notif.id}
                onClick={() =>
                  handleNotificationClick(
                    notif
                  )
                }
                className={`w-full text-left p-4 border-b border-slate-50 dark:border-slate-800 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition ${
                  !notif.read
                    ? "bg-blue-50/50 dark:bg-blue-900/10"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                      !notif.read
                        ? "bg-blue-500"
                        : "bg-transparent"
                    }`}
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {notif.title}
                    </p>

                    {notif.body && (
                      <p className="text-xs opacity-70 mt-0.5 line-clamp-2">
                        {notif.body}
                      </p>
                    )}

                    <p className="text-[10px] opacity-50 mt-1">
                      {notif.created_at
                        ? formatDistanceToNow(
                            new Date(
                              notif.created_at
                            ),
                            {
                              addSuffix: true,
                            }
                          )
                        : "just now"}
                    </p>
                  </div>
                </div>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}