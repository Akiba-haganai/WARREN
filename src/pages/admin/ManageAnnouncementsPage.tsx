import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import {
  fetchAnnouncements,
  deleteAnnouncement,
} from "../../services/announcementService";

export default function ManageAnnouncementsPage() {
  const [announcements, setAnnouncements] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  async function loadAnnouncements() {
    try {
      const data =
        await fetchAnnouncements();

      setAnnouncements(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(
    id: string
  ) {
    const confirmed = confirm(
      "Delete announcement?"
    );

    if (!confirmed) return;

    try {
      await deleteAnnouncement(id);

      setAnnouncements((prev) =>
        prev.filter((a) => a.id !== id)
      );
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <AppShell>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          Manage Announcements
        </h1>

        {loading && (
          <p>Loading...</p>
        )}

        {announcements.map((a) => (
          <div
            key={a.id}
            className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-3"
          >
            <h2 className="font-semibold">
              {a.title}
            </h2>

            <p className="mt-2">
              {a.content}
            </p>

            <button
              onClick={() =>
                handleDelete(a.id)
              }
              className="mt-3 text-red-500 font-medium"
            >
              Delete
            </button>
          </div>
        ))}

        {!loading &&
          announcements.length === 0 && (
            <p>
              No announcements found.
            </p>
          )}
      </div>
    </AppShell>
  );
}