import { Link } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { Shield, MapPin, Users, Upload, Flag, Calendar } from "lucide-react";

const tiles = [
  {
    to: "/moderation",
    icon: Shield,
    label: "Review Content",
    desc: "Moderate flagged posts & comments",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    to: "/admin/communities/new",
    icon: Users,
    label: "Create Community",
    desc: "Add a new group for students",
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-900/20",
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
    to: "/campus-map",
    icon: MapPin,
    label: "Update Map Pins",
    desc: "Add or edit campus locations",
    color: "text-blue-600 dark:text-cyan-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    to: "/admin/upload-material",
    icon: Upload,
    label: "Upload Study Material",
    desc: "Add notes, slides, past papers",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    to: "/admin/reports",
    icon: Flag,
    label: "View Reports",
    desc: "Review community reports",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
];

export default function ModeratorDashboardPage() {
  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-6">Moderator Dashboard</h1>

        <div className="flex flex-col gap-3">
          {tiles.map(({ to, icon: Icon, label, desc, color, bg }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 active:scale-[0.98] transition-transform"
            >
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={18} className={color} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold">{label}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{desc}</p>
              </div>
              <span className="ml-auto text-slate-300 dark:text-slate-600 text-lg shrink-0">›</span>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}