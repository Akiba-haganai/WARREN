import { useState, useRef, useEffect } from "react";
import { X, Image as ImageIcon, Send, Clock } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { createPost } from "../../services/oldpostsService";
import { supabase } from "../../lib/supabase";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const POST_LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export default function CreatePostSheet({
  open,
  onClose,
  onCreated,
}: Props) {
  const user = useAuthStore((s) => s.user);

  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [remainingPosts, setRemainingPosts] =
    useState(POST_LIMIT);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user || !open) return;

    const key = `post_limit_${user.id}`;

    const stored =
      JSON.parse(localStorage.getItem(key) || "[]");

    const now = Date.now();

    const validPosts =
      stored.filter(
        (time: number) =>
          now - time < WINDOW_MS
      );

    localStorage.setItem(
      key,
      JSON.stringify(validPosts)
    );

    setRemainingPosts(
      POST_LIMIT - validPosts.length
    );
  }, [user, open]);

  if (!open || !user) return null;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      setImagePreview(
        URL.createObjectURL(file)
      );
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (!content.trim() && !imageFile) return;

    const key = `post_limit_${user.id}`;

    const stored =
      JSON.parse(localStorage.getItem(key) || "[]");

    const now = Date.now();

    const validPosts =
      stored.filter(
        (time: number) =>
          now - time < WINDOW_MS
      );

    if (validPosts.length >= POST_LIMIT) {
      setError(
        "You have reached the limit of 10 posts per hour. Please try again later."
      );
      return;
    }

    setUploading(true);
    setError("");

    try {
      let imageUrl: string | null = null;

      if (imageFile) {
        const filePath =
          `posts/${user.id}/${Date.now()}_${imageFile.name}`;

        const { error: uploadError } =
          await supabase.storage
            .from("post-images")
            .upload(
              filePath,
              imageFile
            );

        if (uploadError)
          throw new Error(
            "Image upload failed"
          );

        const {
          data: publicUrlData,
        } = supabase.storage
          .from("post-images")
          .getPublicUrl(filePath);

        imageUrl =
          publicUrlData.publicUrl;
      }

      await createPost(
        user.id,
        content.trim(),
        imageUrl
      );

      validPosts.push(now);

      localStorage.setItem(
        key,
        JSON.stringify(validPosts)
      );

      setContent("");
      setImageFile(null);
      setImagePreview(null);

      onCreated();
      onClose();
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to create post"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl p-5 animate-slide-up shadow-2xl">

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">
            Create Post
          </h2>

          <button
            aria-label="Close"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 p-3 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Clock size={16} />
            <span className="text-sm font-medium">
              {remainingPosts} / 10 posts remaining this hour
            </span>
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          placeholder="What's on your mind?"
          className="w-full min-h-[120px] p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {imagePreview && (
          <div className="relative mt-3">
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded-xl max-h-48 object-cover"
            />

            <button
              aria-label="Remove image"
              onClick={removeImage}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() =>
              fileInputRef.current?.click()
            }
            className="flex items-center gap-2 text-sm text-blue-600"
          >
            <ImageIcon size={18} />
            Add Image
          </button>

          <input
            ref={fileInputRef}
            aria-label="Add image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={handleSubmit}
            disabled={
              uploading ||
              remainingPosts <= 0 ||
              (!content.trim() &&
                !imageFile)
            }
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2 rounded-full font-medium disabled:opacity-50"
          >
            {uploading ? (
              "Posting..."
            ) : (
              <>
                <Send size={16} />
                Post
              </>
            )}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-3">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}