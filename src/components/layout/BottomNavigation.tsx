import { House, BookOpen, MessagesSquare, Megaphone } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function BottomNavigation() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center gap-0.5 relative py-1 px-3 min-h-[52px] min-w-[52px] motion-safe:active:scale-[0.95] motion-safe:transition-all duration-200 ${
      isActive
        ? "text-blue-600 dark:text-cyan-400"
        : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
    }`;

  const ActiveDot = () => (
    <span className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600 dark:bg-cyan-400" />
  );

  const links = [
    { to: "/", icon: <House size={22} />, label: "Home" },
    { to: "/announcements", icon: <Megaphone size={22} />, label: "Bulletin" },
    { to: "/study", icon: <BookOpen size={22} />, label: "Study" },
    { to: "/community", icon: <MessagesSquare size={22} />, label: "Community" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-100 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
      <div className="max-w-lg mx-auto flex items-center justify-around py-1 px-2 pb-[max(8px,env(safe-area-inset-bottom))]">
        {links.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} end={to === "/"} className={navClass}>
            {({ isActive }) => (
              <>
                {icon}
                {/* Visible labels – not sr-only */}
                <span className={`text-[10px] font-medium leading-none ${isActive ? "font-semibold" : ""}`}>
                  {label}
                </span>
                {isActive && <ActiveDot />}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
