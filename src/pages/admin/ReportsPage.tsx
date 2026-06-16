import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { supabase } from "../../lib/supabase";

export default function ReportsPage() {
  const [reports, setReports] =
    useState<any[]>([]);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    const { data } = await supabase
      .from("reports")
      .select(`
        *,
        posts (
          content
        )
      `)
      .order("created_at", {
        ascending: false,
      });

    setReports(data ?? []);
  }

  return (
    <AppShell>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">
          Reports
        </h1>

        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-3"
          >
            <p className="font-medium">
              {report.reason}
            </p>

            <p className="text-sm opacity-70 mt-2">
              {report.posts?.content}
            </p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}