import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { fetchAnnouncements } from "../../services/announcementService";
import { supabase } from "../../lib/supabase";

interface Announcement {
  id: string;
  title: string | null;
  content: string | null;
  image_url?: string | null;
  document_url?: string | null;
  category?: string | null;
  pinned?: boolean | null;
  created_at: string | null;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function loadAnnouncements() {
    try {
      const data = await fetchAnnouncements();

      setAnnouncements(
        data as Announcement[]
      );

      setError("");
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to load announcements"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnnouncements();

    const channel = supabase
      .channel("announcements-feed")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "announcements",
        },
        () => {
          loadAnnouncements();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <AppShell>
      <div className="px-4 pb-24">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            📢 Bulletin Board
          </h1>

          <p className="text-sm opacity-70 mt-1">
            Campus announcements,
            opportunities, events and
            important notices.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="
                  h-40
                  rounded-3xl
                  bg-slate-200
                  dark:bg-slate-800
                  animate-pulse
                "
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            className="
              bg-red-50
              dark:bg-red-950/20
              border
              border-red-200
              dark:border-red-900
              text-red-600
              rounded-2xl
              p-4
            "
          >
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          announcements.length === 0 && (
            <div
              className="
                text-center
                py-20
              "
            >
              <div className="text-5xl mb-3">
                📭
              </div>

              <p className="opacity-60">
                No announcements yet.
              </p>
            </div>
          )}

        {/* Announcements */}
        <div className="space-y-5">
          {announcements.map((a) => (
            <article
              key={a.id}
              className="
                overflow-hidden
                bg-white
                dark:bg-slate-900
                rounded-3xl
                shadow-sm
                border
                border-slate-100
                dark:border-slate-800
              "
            >
              {/* Banner Image */}
              {a.image_url && (
                <img
                  src={a.image_url}
                  alt={a.title ?? ""}
                  className="
                    w-full
                    h-56
                    object-cover
                  "
                />
              )}

              <div className="p-5">

                {/* Top Tags */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">

                  {a.pinned && (
                    <span
                      className="
                        bg-red-100
                        text-red-600
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                      "
                    >
                      📌 Pinned
                    </span>
                  )}

                  {a.category && (
                    <span
                      className="
                        bg-blue-100
                        text-blue-600
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        capitalize
                      "
                    >
                      {a.category}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2
                  className="
                    text-xl
                    font-bold
                    mb-2
                  "
                >
                  {a.title ??
                    "Untitled Announcement"}
                </h2>

                {/* Content */}
                <p
                  className="
                    text-sm
                    opacity-80
                    whitespace-pre-wrap
                  "
                >
                  {a.content}
                </p>

                {/* Attachment */}
                {a.document_url && (
                  <a
                    href={a.document_url}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      mt-4
                      px-4
                      py-2
                      rounded-xl
                      bg-blue-50
                      dark:bg-blue-950/30
                      text-blue-600
                      font-medium
                    "
                  >
                    📄 Download Attachment
                  </a>
                )}

                {/* Footer */}
                <div
                  className="
                    mt-4
                    pt-4
                    border-t
                    border-slate-100
                    dark:border-slate-800
                    flex
                    justify-between
                    items-center
                  "
                >
                  <span
                    className="
                      text-xs
                      opacity-50
                    "
                  >
                    Campus Admin
                  </span>

                  <span
                    className="
                      text-xs
                      opacity-50
                    "
                  >
                    {a.created_at
                      ? new Date(
                          a.created_at
                        ).toLocaleDateString()
                      : ""}
                  </span>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </AppShell>
  );
}