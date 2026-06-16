import {
  House,
  Bell,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function BottomNavigation() {
  const navClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `
    flex
    flex-col
    items-center
    justify-center
    gap-1
    transition-all
    duration-300
    relative
    py-1
    px-3
    ${
      isActive
        ? "text-blue-600 dark:text-cyan-400 font-semibold scale-105"
        : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
    }
  `;

  return (
    <nav
      className="
      fixed
      bottom-0
      left-0
      right-0
      z-50
      border-t
      border-slate-100
      dark:border-slate-900
      bg-white/85
      dark:bg-slate-950/85
      backdrop-blur-2xl
      "
    >
      <div
        className="
        max-w-lg
        mx-auto
        flex
        items-center
        justify-around
        py-2.5
        px-6
        pb-[max(10px,env(safe-area-inset-bottom))]
        "
      >
        <NavLink
          to="/"
          className={navClass}
        >
          {({ isActive }) => (
            <>
              <House size={20} className="transition-transform duration-300" />
              <span className="text-[10px] font-medium tracking-wide">
                Home
              </span>
              {isActive && (
                <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/announcements"
          className={navClass}
        >
          {({ isActive }) => (
            <>
              <Bell size={20} className="transition-transform duration-300" />
              <span className="text-[10px] font-medium tracking-wide">
                Bulletin
              </span>
              {isActive && (
                <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/profile"
          className={navClass}
        >
          {({ isActive }) => (
            <>
              <User size={20} className="transition-transform duration-300" />
              <span className="text-[10px] font-medium tracking-wide">
                Profile
              </span>
              {isActive && (
                <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse" />
              )}
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}