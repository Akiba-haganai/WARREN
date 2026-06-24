import { useEffect, useRef, useState } from "react";
import {
  Moon,
  Sun,
  User,
  LogOut,
  Shield,
  ChevronDown,
  MapPinned,
  Calendar,
  MessageCircleQuestion,
  Radio,
  Search,
  MessageSquare,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { useThemeStore } from "../../store/themeStore";
import { useAuthStore } from "../../store/authStore";
import { fetchProfile } from "../../services/profileService";
import { useUserRole } from "../../hooks/useUserRole";

import NotificationBell from "../notifications/NotificationBell";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { role } = useUserRole();
  const darkMode = useThemeStore((s) => s.theme === "dark");
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) return;
      try {
        const profile = await fetchProfile(user.id);
        if (profile?.username) setUsername(profile.username);
        if (profile?.avatar_url) setAvatarUrl(profile.avatar_url);
      } catch (error) {
        console.error(error);
      }
    }
    loadProfile();
  }, [user?.id]);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = username || "User";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-slate-950/85 border-b border-slate-200 dark:border-slate-800 supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
        <div className="h-16 px-4 flex items-center justify-between max-w-lg mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 shrink-0 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black shadow-lg">
              W
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-black leading-none truncate">WARREN</h1>
              <p className="text-[10px] opacity-60 truncate">Global Student Network</p>
            </div>
          </Link>

          {/* Right side: notification bell + avatar */}
          <div className="flex items-center gap-1.5">
            <NotificationBell />

            <div ref={menuRef} className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1.5 pl-2 pr-2.5 h-11 min-w-[44px] rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-200 motion-safe:active:scale-[0.98]"
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName} className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <ChevronDown size={14} />
              </button>

              {open && (
                <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                  {/* Profile summary – compact */}
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={displayName} className="h-10 w-10 rounded-full object-cover" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                          {displayName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{displayName}</p>
                        <p className="text-[11px] opacity-60 capitalize">{role || "student"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Links – compact, single list */}
                  <div className="py-1">
                    <DropdownLink to="/profile" icon={<User size={16} />} label="Profile" />
                    <DropdownLink to="/messages" icon={<MessageSquare size={16} />} label="Messages" />
                    <DropdownLink to="/campus-map" icon={<MapPinned size={16} />} label="Campus Map" />
                    <DropdownLink to="/events" icon={<Calendar size={16} />} label="Events" />
                    <DropdownLink to="/search" icon={<Search size={16} />} label="Search" />
                    <DropdownLink to="/ask-senior" icon={<MessageCircleQuestion size={16} />} label="Ask a Senior" />
                    <DropdownLink to="/live" icon={<Radio size={16} />} label="Live Rooms" />

                    {(role === "admin" || role === "moderator") && (
                      <DropdownLink to="/moderator" icon={<Shield size={16} />} label="Mod Dashboard" />
                    )}
                    {role === "admin" && (
                      <DropdownLink to="/admin" icon={<Shield size={16} />} label="Admin Dashboard" />
                    )}
                  </div>

                  {/* Actions */}
                  <div className="border-t border-slate-100 dark:border-slate-800 py-1">
                    <button
                      onClick={() => { toggleTheme(); setOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 min-h-[44px] text-sm text-left active:bg-slate-100 dark:active:bg-slate-800 transition-colors duration-200"
                    >
                      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                      {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    <button
                      onClick={() => { logout(); setOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 min-h-[44px] text-sm text-left text-red-500 active:bg-red-50 dark:active:bg-red-950/30 transition-colors duration-200"
                    >
                      <LogOut size={20} /> Logout
                    </button>
                  </div>
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

/** Tiny helper for dropdown links */
function DropdownLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-3 min-h-[44px] text-sm active:bg-slate-100 dark:active:bg-slate-800 transition-colors duration-200"
    >
      {icon}
      {label}
    </Link>
  );
}