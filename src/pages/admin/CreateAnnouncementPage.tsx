import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { createAnnouncement } from "../../services/announcementService";
import { supabase } from "../../lib/supabase";

export default function CreateAnnouncementPage() {
  const navigate =
    useNavigate();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [category, setCategory] =
    useState("general");

  const [
    imageFile,
    setImageFile,
  ] = useState<File | null>(
    null
  );

  const [
    documentFile,
    setDocumentFile,
  ] = useState<File | null>(
    null
  );

  const [loading, setLoading] =
    useState(false);

  async function uploadFile(
  file: File,
  bucket: "announcement-images" | "announcement-documents",
  folder: string
) {
  const filePath = `${folder}/${Date.now()}_${file.name}`;

  const { error } =
    await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        upsert: true,
      });

  if (error) {
    throw error;
  }

  const { data } =
    supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

  return data.publicUrl;
}

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title required");
      return;
    }

    if (!content.trim()) {
      alert("Content required");
      return;
    }

    try {
      setLoading(true);

      let imageUrl:
        | string
        | null = null;

      let documentUrl:
        | string
        | null = null;

      if (imageFile) {
  imageUrl =
    await uploadFile(
      imageFile,
      "announcement-images",
      "images"
    );
}

if (documentFile) {
  documentUrl =
    await uploadFile(
      documentFile,
      "announcement-documents",
      "documents"
    );
}

      await createAnnouncement(
        title.trim(),
        content.trim(),
        imageUrl,
        documentUrl,
        category,
        
      );

      navigate(
        "/announcements"
      );
    } catch (err: any) {
      console.error(err);

      alert(
        err?.message ??
          "Failed to create announcement"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          New Announcement
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >
          <input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            placeholder="Title"
            className="w-full p-3 rounded-2xl border"
          />

          <select
          aria-label="category"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full p-3 rounded-2xl border"
          >
            <option value="general">
              General
            </option>
            <option value="academic">
              Academic
            </option>
            <option value="events">
              Events
            </option>
            <option value="sports">
              Sports
            </option>
            <option value="emergency">
              Emergency
            </option>
          </select>

          <textarea
            rows={8}
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
            placeholder="Announcement..."
            className="w-full p-3 rounded-2xl border"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Announcement Image
            </label>

            <input
              aria-label="image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(
                  e.target
                    .files?.[0] ??
                    null
                )
              }
            />

            {imageFile && (
              <p className="text-xs text-green-600">
                Selected:{" "}
                {imageFile.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Attachment
            </label>

            <input
              aria-label="file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setDocumentFile(
                  e.target
                    .files?.[0] ??
                    null
                )
              }
            />

            {documentFile && (
              <p className="text-xs text-green-600">
                Selected:{" "}
                {
                  documentFile.name
                }
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-2xl disabled:opacity-50"
          >
            {loading
              ? "Publishing..."
              : "Publish Announcement"}
          </button>
        </form>
      </div>
    </AppShell>
  );
}