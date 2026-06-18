import { useEffect, useRef, useState } from "react";
import {
  Moon,
  Sun,
  User,
  Bell,
  LogOut,
  Shield,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { useThemeStore } from "../../store/themeStore";
import { useAuthStore } from "../../store/authStore";
import { fetchProfile } from "../../services/profileService";
import { useUserRole } from "../../hooks/useUserRole";

import NotificationBell from "../notifications/NotificationBell";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  const [username, setUsername] =
    useState("");

  const [avatarUrl, setAvatarUrl] =
    useState("");

  const menuRef =
    useRef<HTMLDivElement>(null);

  const location =
    useLocation();

  const { role } =
    useUserRole();

  const darkMode =
    useThemeStore(
      (s) => s.theme === "dark"
    );

  const toggleTheme =
    useThemeStore(
      (s) => s.toggleTheme
    );

  const user =
    useAuthStore(
      (s) => s.user
    );

  const logout =
    useAuthStore(
      (s) => s.logout
    );

  useEffect(() => {
  async function loadProfile() {
    if (!user?.id) return;

    try {
      const profile = await fetchProfile(
        user.id
      );

      if (profile?.username) {
        setUsername(
          profile.username
        );
      }

      if (profile?.avatar_url) {
        setAvatarUrl(
          profile.avatar_url
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  loadProfile();
}, [user?.id]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const displayName =
    username || "User";

  return (
    <>
      <header
        className="
          fixed
          top-0
          left-0
          right-0
          z-50
          backdrop-blur-xl
          bg-white/85
          dark:bg-slate-950/85
          border-b
          border-slate-200
          dark:border-slate-800
          supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]
        "
      >
        <div
          className="
            h-16
            px-4
            flex
            items-center
            justify-between
            max-w-lg
            mx-auto
          "
        >
          <Link
            to="/"
            className="
              flex
              items-center
              gap-3
              min-w-0
            "
          >
            <div
              className="
                h-10
                w-10
                shrink-0
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                flex
                items-center
                justify-center
                text-white
                font-black
                shadow-lg
              "
            >
              W
            </div>

            <div className="min-w-0">
              <h1
                className="
                  text-base
                  font-black
                  leading-none
                  truncate
                "
              >
                WARREN
              </h1>

              <p
                className="
                  text-[10px]
                  opacity-60
                  truncate
                "
              >
                Global Student Network
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <NotificationBell />

            <div
              ref={menuRef}
              className="relative"
            >
              <button
                onClick={() =>
                  setOpen(
                    (v) => !v
                  )
                }
                className="
                  flex
                  items-center
                  gap-2
                  pl-2
                  pr-3
                  h-11
                  rounded-full
                  bg-slate-100
                  dark:bg-slate-800
                  border
                  border-slate-200
                  dark:border-slate-700
                "
              >
                {avatarUrl ? (
                  <img
                    src={
                      avatarUrl
                    }
                    alt={
                      displayName
                    }
                    className="
                      h-8
                      w-8
                      rounded-full
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      h-8
                      w-8
                      rounded-full
                      bg-gradient-to-r
                      from-blue-600
                      to-cyan-500
                      flex
                      items-center
                      justify-center
                      text-white
                      text-sm
                      font-bold
                    "
                  >
                    {displayName
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}

                <ChevronDown
                  size={16}
                />
              </button>

              {open && (
                <div
                  className="
                    absolute
                    right-0
                    top-14
                    w-[calc(100vw-24px)]
                    max-w-[320px]
                    overflow-hidden
                    rounded-3xl
                    border
                    border-slate-200
                    dark:border-slate-800
                    bg-white
                    dark:bg-slate-900
                    shadow-2xl
                  "
                >
                  <div
                    className="
                      p-4
                      border-b
                      border-slate-200
                      dark:border-slate-800
                    "
                  >
                    <div className="flex items-center gap-3">
                      {avatarUrl ? (
                        <img
                          src={
                            avatarUrl
                          }
                          alt={
                            displayName
                          }
                          className="
                            h-12
                            w-12
                            rounded-full
                            object-cover
                          "
                        />
                      ) : (
                        <div
                          className="
                            h-12
                            w-12
                            rounded-full
                            bg-gradient-to-r
                            from-blue-600
                            to-cyan-500
                            flex
                            items-center
                            justify-center
                            text-white
                            font-bold
                          "
                        >
                          {displayName
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p
                          className="
                            font-semibold
                            truncate
                          "
                        >
                          {
                            displayName
                          }
                        </p>

                        <p
                          className="
                            text-xs
                            opacity-60
                            capitalize
                          "
                        >
                          {role ||
                            "student"}{" "}
                          account
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-4 active:bg-slate-100 dark:active:bg-slate-800"
                  >
                    <User size={18} />
                    Profile
                  </Link>

                  <Link
                    to="/announcements"
                    className="flex items-center gap-3 px-4 py-4 active:bg-slate-100 dark:active:bg-slate-800"
                  >
                    <Bell size={18} />
                    Announcements
                  </Link>

                  {role ===
                    "admin" && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-3 px-4 py-4 active:bg-slate-100 dark:active:bg-slate-800"
                    >
                      <Shield size={18} />
                      Admin Dashboard
                    </Link>
                  )}

                  {(role ===
                    "admin" ||
                    role ===
                      "moderator") && (
                    <Link
                      to="/moderator"
                      className="flex items-center gap-3 px-4 py-4 active:bg-slate-100 dark:active:bg-slate-800"
                    >
                      <Shield size={18} />
                      Moderator Dashboard
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      toggleTheme();
                      setOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-4 text-left active:bg-slate-100 dark:active:bg-slate-800"
                  >
                    {darkMode ? (
                      <Sun size={18} />
                    ) : (
                      <Moon size={18} />
                    )}

                    {darkMode
                      ? "Light Mode"
                      : "Dark Mode"}
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-4 text-left text-red-500 active:bg-red-50 dark:active:bg-red-950/30"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="h-16" />
    </>
  );
}