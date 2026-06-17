import { Bell, CheckCheck, X } from "lucide-react";
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

  const menuRef =
    useRef<HTMLDivElement>(null);

  const navigate =
    useNavigate();

  useEffect(() => {
    if (!user) return;

    loadNotifications(user.id);
    subscribe(user.id);

    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    function handleClick(
      e: MouseEvent
    ) {
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [open]);

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
      return;
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
        aria-label="Notifications"
        className="
          relative
          h-11
          w-11
          rounded-full
          flex
          items-center
          justify-center
          bg-slate-100
          dark:bg-slate-800
          border
          border-slate-200
          dark:border-slate-700
          active:scale-95
          transition
        "
      >
        <Bell
          size={20}
          className={
            unreadCount > 0
              ? "text-blue-600"
              : ""
          }
        />

        {unreadCount > 0 && (
          <>
            <span
              className="
                absolute
                top-1
                right-1
                h-2.5
                w-2.5
                rounded-full
                bg-red-500
                animate-pulse
              "
            />

            <span
              className="
                absolute
                -top-1
                -right-1
                min-w-[20px]
                h-5
                px-1
                rounded-full
                bg-red-500
                text-white
                text-[10px]
                font-bold
                flex
                items-center
                justify-center
              "
            >
              {unreadCount > 99
                ? "99+"
                : unreadCount}
            </span>
          </>
        )}
      </button>

      {open && (
        <>
          <div
            className="
              fixed
              inset-0
              bg-black/40
              backdrop-blur-sm
              z-[90]
            "
            onClick={() =>
              setOpen(false)
            }
          />

          <div
            className="
              fixed
              top-0
              right-0
              h-full
              w-full
              max-w-md
              z-[100]
              bg-white
              dark:bg-slate-950
              flex
              flex-col
              shadow-2xl
              animate-slide-up
            "
          >
            <div
              className="
                sticky
                top-0
                z-10
                bg-white
                dark:bg-slate-950
                border-b
                border-slate-200
                dark:border-slate-800
                px-4
                py-4
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-lg">
                    Notifications
                  </h2>

                  <p className="text-xs opacity-60">
                    {unreadCount} unread
                    notifications
                  </p>
                </div>

                <button
                aria-label="open"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    h-10
                    w-10
                    rounded-full
                    bg-slate-100
                    dark:bg-slate-800
                    flex
                    items-center
                    justify-center
                  "
                >
                  <X size={18} />
                </button>
              </div>

              {unreadCount > 0 &&
                user && (
                  <button
                    onClick={() =>
                      markAllRead(
                        user.id
                      )
                    }
                    className="
                      mt-3
                      w-full
                      h-11
                      rounded-2xl
                      bg-blue-600
                      text-white
                      text-sm
                      font-medium
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <CheckCheck
                      size={16}
                    />
                    Mark All Read
                  </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto">
              {loading && (
                <div className="p-6 space-y-4">
                  {[...Array(5)].map(
                    (_, i) => (
                      <div
                        key={i}
                        className="
                          h-20
                          rounded-2xl
                          bg-slate-100
                          dark:bg-slate-800
                          animate-pulse
                          mx-4
                        "
                      />
                    )
                  )}
                </div>
              )}

              {!loading &&
                notifications.length ===
                  0 && (
                  <div
                    className="
                      h-full
                      flex
                      flex-col
                      items-center
                      justify-center
                      text-center
                      px-6
                    "
                  >
                    <div
                      className="
                        h-20
                        w-20
                        rounded-full
                        bg-slate-100
                        dark:bg-slate-800
                        flex
                        items-center
                        justify-center
                        mb-4
                      "
                    >
                      <Bell
                        size={36}
                        className="opacity-40"
                      />
                    </div>

                    <h3 className="font-semibold">
                      No Notifications
                    </h3>

                    <p className="text-sm opacity-60 mt-2">
                      New activity,
                      replies and
                      announcements
                      will appear here.
                    </p>
                  </div>
                )}

              {!loading &&
                notifications.map(
                  (notif) => (
                    <button
                      key={notif.id}
                      onClick={() =>
                        handleNotificationClick(
                          notif
                        )
                      }
                      className={`
                        w-full
                        text-left
                        p-4
                        border-b
                        border-slate-100
                        dark:border-slate-800
                        transition
                        active:bg-slate-100
                        dark:active:bg-slate-800
                        ${
                          !notif.read
                            ? "bg-blue-50 dark:bg-blue-950/20"
                            : ""
                        }
                      `}
                    >
                      <div className="flex gap-3">
                        <div
                          className={`
                            mt-1
                            h-3
                            w-3
                            rounded-full
                            shrink-0
                            ${
                              !notif.read
                                ? "bg-blue-500"
                                : "bg-slate-300 dark:bg-slate-700"
                            }
                          `}
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <p className="font-semibold text-sm">
                              {
                                notif.title
                              }
                            </p>

                            {!notif.read && (
                              <span
                                className="
                                  text-[10px]
                                  font-bold
                                  text-blue-600
                                  shrink-0
                                "
                              >
                                NEW
                              </span>
                            )}
                          </div>

                          {notif.body && (
                            <p
                              className="
                                text-sm
                                opacity-70
                                mt-1
                                line-clamp-2
                              "
                            >
                              {
                                notif.body
                              }
                            </p>
                          )}

                          <p
                            className="
                              text-xs
                              opacity-50
                              mt-2
                            "
                          >
                            {notif.created_at
                              ? formatDistanceToNow(
                                  new Date(
                                    notif.created_at
                                  ),
                                  {
                                    addSuffix:
                                      true,
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
          </div>
        </>
      )}
    </div>
  );
}