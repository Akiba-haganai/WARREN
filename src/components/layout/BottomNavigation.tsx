import { useState } from "react";
import { House, BookOpen, MessagesSquare, User, Plus, PenSquare, Upload, Search, HelpCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Sheet } from "../ui/Sheet";
import CreatePostSheet from "../../features/posts/components/CreatePostSheet";
import { useQueryClient } from "@tanstack/react-query";
import { useUserRole } from "../../hooks/useUserRole";

export default function BottomNavigation() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPostSheetOpen, setIsPostSheetOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { role } = useUserRole();
  const isAdminOrMod = role === "admin" || role === "moderator";

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center gap-1 relative py-1 px-1 min-h-[52px] flex-1 motion-safe:active:scale-[0.95] motion-safe:transition-all duration-200 ${
      isActive
        ? "text-blue-600 dark:text-cyan-400"
        : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
    }`;

  const leftLinks = [
    { to: "/", icon: <House size={22} />, label: "Home" },
    { to: "/study", icon: <BookOpen size={22} />, label: "Study" },
  ];

  const rightLinks = [
    { to: "/community", icon: <MessagesSquare size={22} />, label: "Community" },
    { to: "/profile", icon: <User size={22} />, label: "Profile" },
  ];

  const renderLink = ({ to, icon, label }: any) => (
    <NavLink key={to} to={to} end={to === "/"} className={navClass}>
      {({ isActive }) => (
        <>
          {icon}
          <span className={`text-[10px] font-medium leading-none ${isActive ? "font-semibold" : ""}`}>
            {label}
          </span>
          {/* {isActive && <ActiveDot />} */}
        </>
      )}
    </NavLink>
  );

  const handlePostCreated = () => {
    setIsPostSheetOpen(false);
    queryClient.invalidateQueries({ queryKey: ["homeFeed"] });
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/40 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl pb-[env(safe-area-inset-bottom,0px)] pl-[env(safe-area-inset-left,0px)] pr-[env(safe-area-inset-right,0px)]">
        <div className="max-w-lg mx-auto flex items-center justify-between py-1 px-2 relative">
          
          {/* Left Tabs */}
          <div className="flex flex-1 justify-around">
            {leftLinks.map(renderLink)}
          </div>

          {/* Central FAB */}
          <div className="flex-shrink-0 px-2 flex justify-center items-center">
            <button
              onClick={() => setIsCreateOpen(true)}
              aria-label="Create"
              className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 dark:shadow-[0_8px_16px_rgba(6,182,212,0.2)] active:scale-95 transition-transform -translate-y-4 hover:scale-105 duration-300"
            >
              <Plus size={24} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Right Tabs */}
          <div className="flex flex-1 justify-around">
            {rightLinks.map(renderLink)}
          </div>

        </div>
      </nav>

      {/* FAB Options Sheet */}
      <Sheet open={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create" description="What would you like to do?">
        <div className="grid grid-cols-2 gap-3 pb-6 mt-2">
          <button
            onClick={() => {
              setIsCreateOpen(false);
              setIsPostSheetOpen(true);
            }}
            className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-cyan-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition border border-blue-200/50 dark:border-blue-800/30"
          >
            <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
              <PenSquare size={22} />
            </div>
            <span className="text-sm font-semibold">Post</span>
          </button>
          
          <button
            onClick={() => {
              setIsCreateOpen(false);
              navigate("/ask-senior");
            }}
            className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition border border-emerald-200/50 dark:border-emerald-800/30"
          >
            <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
              <HelpCircle size={22} />
            </div>
            <span className="text-sm font-semibold">Ask Senior</span>
          </button>
          
          <button
            onClick={() => {
              setIsCreateOpen(false);
              navigate("/study");
            }}
            className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition border border-purple-200/50 dark:border-purple-800/30"
          >
            <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
              <BookOpen size={22} />
            </div>
            <span className="text-sm font-semibold">Plan Cram</span>
          </button>

          <button
            onClick={() => {
              setIsCreateOpen(false);
              navigate("/search");
            }}
            className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition border border-amber-200/50 dark:border-amber-800/30"
          >
            <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
              <Search size={22} />
            </div>
            <span className="text-sm font-semibold">Find Paper</span>
          </button>

          {isAdminOrMod && (
            <button
              onClick={() => {
                setIsCreateOpen(false);
                navigate("/admin/upload-material");
              }}
              className="col-span-2 mt-2 flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              <Upload size={16} />
              <span className="text-sm font-medium">Admin: Upload Material</span>
            </button>
          )}
        </div>
      </Sheet>

      {/* Global Create Post Sheet */}
      <CreatePostSheet
        open={isPostSheetOpen}
        onClose={() => setIsPostSheetOpen(false)}
        onCreated={handlePostCreated}
      />
    </>
  );
}
