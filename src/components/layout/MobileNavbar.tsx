import { useEffect, useRef, useState } from "react";
import {
  Moon, Sun, User, LogOut, Shield, ChevronDown, MapPinned, Calendar,
  MessageCircleQuestion, Radio, Search, MessageSquare,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useThemeStore } from "../../store/themeStore";
import { useAuthStore } from "../../store/authStore";
import { fetchProfile } from "../../features/profile/services/profile.service";
import { useUserRole } from "../../hooks/useUserRole";

import { NotificationBell } from "../notifications/NotificationBell";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
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
      } catch (error) { console.error(error); }
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
  const showAdminBadge = role === "admin" || role === "moderator";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-slate-950/85 border-b border-slate-200 dark:border-slate-800 supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
        <div className="h-14 sm:h-16 px-4 flex items-center justify-between max-w-lg mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 min-w-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black shadow-lg text-sm sm:text-base">
              W
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-black leading-none truncate">Campus</h1>
              <p className="text-[9px] sm:text-[10px] opacity-60 truncate">by Warren</p>
            </div>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Quick search shortcut */}
            <button
              onClick={() => navigate("/search")}
              aria-label="Search"
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition min-w-[40px] min-h-[40px] flex items-center justify-center"
            >
              <Search size={20} />
            </button>

            <NotificationBell />

            <div ref={menuRef} className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className="relative flex items-center gap-1.5 pl-1.5 pr-2 h-10 sm:h-11 min-w-[44px] rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-200 motion-safe:active:scale-[0.98]"
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName} className="h-6 w-6 sm:h-7 sm:w-7 rounded-full object-cover" />
                ) : (
                  <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <ChevronDown size={14} className="hidden sm:block" />
                {/* Admin/Mod badge on avatar button */}
                {showAdminBadge && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-950">
                    <Shield size={8} className="text-white" />
                  </span>
                )}
              </button>

              {open && (
                <div className="absolute right-0 top-12 w-52 sm:w-60 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                  {/* Profile summary – extra compact */}
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={displayName} className="h-8 w-8 rounded-full object-cover" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                          {displayName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate">{displayName}</p>
                        <p className="text-[10px] opacity-60 capitalize">{role || "student"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Links – ultra compact */}
                  <div className="py-0.5">
                    <DropdownLink to="/profile" icon={<User size={14} />} label="Profile" />
                    <DropdownLink to="/messages" icon={<MessageSquare size={14} />} label="Messages" />
                    <DropdownLink to="/campus-map" icon={<MapPinned size={14} />} label="Campus Map" />
                    <DropdownLink to="/events" icon={<Calendar size={14} />} label="Events" />
                    <DropdownLink to="/search" icon={<Search size={14} />} label="Search" />
                    <DropdownLink to="/ask-senior" icon={<MessageCircleQuestion size={14} />} label="Ask a Senior" />
                    <DropdownLink to="/live" icon={<Radio size={14} />} label="Live Rooms" />

                    {(role === "admin" || role === "moderator") && (
                      <DropdownLink to="/moderator" icon={<Shield size={14} />} label="Mod Dashboard" />
                    )}
                    {role === "admin" && (
                      <DropdownLink to="/admin" icon={<Shield size={14} />} label="Admin Dashboard" />
                    )}
                  </div>

                  {/* Actions – ultra compact */}
                  <div className="border-t border-slate-100 dark:border-slate-800 py-0.5">
                    <button
                      onClick={() => { toggleTheme(); setOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 min-h-[44px] text-xs text-left active:bg-slate-100 dark:active:bg-slate-800 transition-colors duration-200"
                    >
                      {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                      {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    <button
                      onClick={() => { logout(); setOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 min-h-[44px] text-xs text-left text-red-500 active:bg-red-50 dark:active:bg-red-950/30 transition-colors duration-200"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>

                  {/* Legal links – super subtle */}
                  <div className="border-t border-slate-100 dark:border-slate-800 px-3 py-2 text-center">
                    <Link to="/about" className="text-[10px] text-slate-400 dark:text-slate-500 hover:underline">About</Link>
                    <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                    <Link to="/privacy" className="text-[10px] text-slate-400 dark:text-slate-500 hover:underline">Privacy</Link>
                    <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                    <Link to="/terms" className="text-[10px] text-slate-400 dark:text-slate-500 hover:underline">Terms</Link>
                    <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                    <Link to="/contact" className="text-[10px] text-slate-400 dark:text-slate-500 hover:underline">Contact</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="h-14 sm:h-16" />
    </>
  );
}

/** Tiny helper for dropdown links */
function DropdownLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-3 py-2 min-h-[44px] text-xs active:bg-slate-100 dark:active:bg-slate-800 transition-colors duration-200"
    >
      {icon}
      {label}
    </Link>
  );
}