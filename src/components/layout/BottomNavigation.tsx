import { House, Bell, BookOpen, MapPinned, MessagesSquare } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function BottomNavigation() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center gap-1 transition-all duration-300 relative py-1 px-2
    ${isActive
      ? "text-blue-600 dark:text-cyan-400 font-semibold scale-105"
      : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
    }`;

  const ActiveDot = () => (
    <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse" />
  );

  const links = [
    { to: "/",             icon: <House size={20} />,          label: "Home"      },
    { to: "/announcements",icon: <Bell size={20} />,           label: "Bulletin"  },
    { to: "/study",        icon: <BookOpen size={20} />,       label: "Study"     },
    { to: "/campus-map",   icon: <MapPinned size={20} />,      label: "Map"       },
    { to: "/community",    icon: <MessagesSquare size={20} />, label: "Community" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-100 dark:border-slate-900 bg-white/85 dark:bg-slate-950/85 backdrop-blur-2xl">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2.5 px-2 pb-[max(10px,env(safe-area-inset-bottom))]">
        {links.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} end={to === "/"} className={navClass}>
            {({ isActive }) => (
              <>
                {icon}
                <span className="text-[10px] font-medium">{label}</span>
                {isActive && <ActiveDot />}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}