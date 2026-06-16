import { Link } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";

export default function ModeratorDashboardPage() {
  return (
    <AppShell>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">
          Moderator Dashboard
        </h1>

        <div className="space-y-3">
          <Link
            to="/moderation"
            className="block p-4 rounded-2xl bg-white dark:bg-slate-900"
          >
            🛡 Review Posts & Comments
          </Link>

          <Link
            to="/announcements"
            className="block p-4 rounded-2xl bg-white dark:bg-slate-900"
          >
            📢 View Announcements
          </Link>
        </div>
      </div>
    </AppShell>
  );
}