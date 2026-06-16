import { Link } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";

export default function AdminDashboardPage() {
  return (
    <AppShell>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">
          Admin Dashboard
        </h1>

        <div className="space-y-3">
          <Link
            to="/admin/reports"
            className="block p-4 rounded-2xl bg-white dark:bg-slate-900"
          >
            🚩 Reports
          </Link>

          <Link
            to="/admin/announcements"
            className="block p-4 rounded-2xl bg-white dark:bg-slate-900"
          >
            📢 Manage Announcements
          </Link>

          <Link
            to="/admin/announcements/new"
            className="block p-4 rounded-2xl bg-white dark:bg-slate-900"
          >
            ➕ Create Announcement
          </Link>

          <Link
            to="/moderation"
            className="block p-4 rounded-2xl bg-white dark:bg-slate-900"
          >
            🛡 Moderation Tools
          </Link>
        </div>
      </div>
    </AppShell>
  );
}