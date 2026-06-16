import { useEffect, useRef, useState } from "react";
import {
  Moon,
  Sun,
  User,
  Bell,
  LogOut,
  Settings,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useThemeStore } from "../../store/themeStore";
import { useAuthStore } from "../../store/authStore";
import { fetchProfile } from "../../services/profileService";
import { useUserRole } from "../../hooks/useUserRole";

import NotificationBell from "../notifications/NotificationBell";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("User");

  const menuRef = useRef<HTMLDivElement>(null);

  const { role } = useUserRole();

  const darkMode = useThemeStore(
    (s) => s.darkMode
  );

  const toggleTheme = useThemeStore(
    (s) => s.toggleTheme
  );

  const user = useAuthStore(
    (s) => s.user
  );

  const logout = useAuthStore(
    (s) => s.logout
  );

  useEffect(() => {
    if (!user) return;

    fetchProfile(user.id)
      .then((profile) => {
        if (profile?.username) {
          setUsername(profile.username);
        }
      })
      .catch(console.error);
  }, [user]);

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-lg mx-auto h-16 px-4 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black shadow-lg">
            W
          </div>

          <div>
            <h1 className="font-bold text-lg leading-none">
              WARREN
            </h1>

            <p className="text-[11px] opacity-60">
              Global Student Network
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <NotificationBell />

          <div
            ref={menuRef}
            className="relative"
          >
            <button
              aria-label="User menu"
              onClick={() =>
                setOpen((v) => !v)
              }
              className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md"
            >
              <User size={18} />
            </button>

            {open && (
              <div className="absolute right-0 top-12 w-60 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">

                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <p className="font-semibold">
                    {username}
                  </p>

                  <p className="text-xs opacity-60 capitalize">
                    {role ?? "student"} Account
                  </p>
                </div>

                <Link
                  to="/profile"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <User size={16} />
                  Profile
                </Link>

                <Link
                  to="/announcements"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Bell size={16} />
                  Announcements
                </Link>

                {role === "admin" && (
  <Link
    to="/admin"
    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
    onClick={() => setOpen(false)}
  >
    <Shield size={16} />
    Admin Dashboard
  </Link>
)}

{(role === "moderator" || role === "admin") && (
  <Link
    to="/moderator"
    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
    onClick={() => setOpen(false)}
  >
    <Shield size={16} />
    Moderator Dashboard
  </Link>
)}

                <button
                  onClick={() => {
                    toggleTheme();
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {darkMode ? (
                    <Sun size={16} />
                  ) : (
                    <Moon size={16} />
                  )}

                  {darkMode
                    ? "Light Mode"
                    : "Dark Mode"}
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Settings size={16} />
                  Settings
                </button>

                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut size={16} />
                  Logout
                </button>

              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}