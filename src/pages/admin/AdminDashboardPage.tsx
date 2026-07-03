import { Link } from "react-router-dom";
import {
  Flag,
  Megaphone,
  PlusCircle,
  Shield,
  Upload,
  Users,
  Calendar,
  Send,
  FileText,
} from "lucide-react";
import AppShell from "../../components/layout/AppShell";

const tiles = [
  {
    to: "/admin/announcements/new",
    icon: PlusCircle,
    label: "Create Announcement",
    desc: "Post a new bulletin to all students",
    color: "text-blue-600 dark:text-cyan-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    to: "/admin/announcements",
    icon: Megaphone,
    label: "Manage Announcements",
    desc: "Edit or remove existing bulletins",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/20",
  },
  {
    to: "/admin/upload-material",
    icon: Upload,
    label: "Upload Study Material",
    desc: "Add notes, slides or past papers",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    to: "/admin/material-requests",
    icon: FileText,
    label: "Material Requests",
    desc: "View and manage student requests",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-900/20",
  },
  {
    to: "/admin/events",
    icon: Calendar,
    label: "Manage Events",
    desc: "Create and manage campus events",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  {
    to: "/admin/global-notifications",
    icon: Send,
    label: "Global Notification",
    desc: "Send a push to all students",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    to: "/moderation",
    icon: Shield,
    label: "Moderation Tools",
    desc: "Review flagged posts and comments",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    to: "/admin/reports",
    icon: Flag,
    label: "Reports",
    desc: "View community reports",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
  {
    to: "/admin/communities",
    icon: Users,
    label: "Communities",
    desc: "Manage student communities",
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-900/20",
  },
];

export default function AdminDashboardPage() {
  return (
    <AppShell>
      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Admin
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Manage Warren
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {tiles.map(({ to, icon: Icon, label, desc, color, bg }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 active:scale-[0.98] transition-transform duration-100 [-webkit-tap-highlight-color:transparent]"
          >
            <div
              className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}
            >
              <Icon size={18} className={color} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {label}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                {desc}
              </p>
            </div>
            <span className="ml-auto text-slate-300 dark:text-slate-600 text-lg shrink-0">
              ›
            </span>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}