import { useState, useRef, useEffect } from "react";
import { X, Image as ImageIcon, Send, Clock, Mic, MicOff, Trash2 } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { createPost } from "../services/posts.service";
import { supabase } from "../../../lib/supabase";
import { useToastStore } from "../../../store/toastStore";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const POST_LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour for normal posts

const ANON_LIMIT = 1;
const ANON_WINDOW_MS = 2 * 60 * 60 * 1000; // 2 hours for anonymous

export default function CreatePostSheet({ open, onClose, onCreated }: Props) {
  const user = useAuthStore((s) => s.user);
  const { showToast } = useToastStore();

  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);
  const [voicePreviewUrl, setVoicePreviewUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [remainingPosts, setRemainingPosts] = useState(POST_LIMIT);
  const [remainingAnonPosts, setRemainingAnonPosts] = useState(ANON_LIMIT);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (!user || !open) return;
    const now = Date.now();

    // Normal limit
    const stored = JSON.parse(localStorage.getItem(`post_limit_${user.id}`) || "[]");
    const valid = stored.filter((time: number) => now - time < WINDOW_MS);
    localStorage.setItem(`post_limit_${user.id}`, JSON.stringify(valid));
    setRemainingPosts(POST_LIMIT - valid.length);

    // Anonymous limit
    const anonStored = JSON.parse(localStorage.getItem(`anon_post_limit_${user.id}`) || "[]");
    const anonValid = anonStored.filter((time: number) => now - time < ANON_WINDOW_MS);
    localStorage.setItem(`anon_post_limit_${user.id}`, JSON.stringify(anonValid));
    setRemainingAnonPosts(ANON_LIMIT - anonValid.length);
  }, [user, open]);

  if (!open || !user) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm;codecs=opus" });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setVoiceBlob(blob);
        setVoicePreviewUrl(URL.createObjectURL(blob));
        // Stop tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      showToast("Microphone access is required to record voice notes", "err");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const removeVoice = () => {
    setVoiceBlob(null);
    setVoicePreviewUrl(null);
  };

  const handleSubmit = async () => {
    if (!content.trim() && !imageFile && !voiceBlob) return;

    const now = Date.now();

    // Check limits
    const key = `post_limit_${user.id}`;
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    const valid = stored.filter((time: number) => now - time < WINDOW_MS);

    if (isAnonymous) {
      const anonKey = `anon_post_limit_${user.id}`;
      const anonStored = JSON.parse(localStorage.getItem(anonKey) || "[]");
      const anonValid = anonStored.filter((time: number) => now - time < ANON_WINDOW_MS);
      if (anonValid.length >= ANON_LIMIT) {
        setError("You can only post 1 anonymous confession every 2 hours.");
        return;
      }
      // Also check normal limit (anonymous posts count towards total)
      if (valid.length >= POST_LIMIT) {
        setError("You have reached the total post limit of 10 per hour.");
        return;
      }
    } else {
      if (valid.length >= POST_LIMIT) {
        setError("You have reached the limit of 10 posts per hour.");
        return;
      }
    }

    setUploading(true);
    setError("");

    try {
      let imageUrl: string | null = null;
      let voiceUrl: string | null = null;

      if (imageFile) {
        // Sanitize file name – remove brackets and other problematic characters
        const safeName = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filePath = `posts/${user.id}/${Date.now()}_${safeName}`;
        const { error: uploadError } = await supabase.storage
          .from("post-images")
          .upload(filePath, imageFile);

        if (uploadError) throw new Error("Image upload failed");
        const { data: publicUrlData } = supabase.storage
          .from("post-images")
          .getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
      }

      if (voiceBlob) {
        const filePath = `voice/${user.id}/${Date.now()}.webm`;
        const { error: uploadError } = await supabase.storage
          .from("community-chat-voice")
          .upload(filePath, voiceBlob, { contentType: "audio/webm" });
        if (uploadError) throw new Error("Voice upload failed");
        const { data: publicUrlData } = supabase.storage
          .from("community-chat-voice")
          .getPublicUrl(filePath);
        voiceUrl = publicUrlData.publicUrl;
      }

      await createPost(user.id, content.trim(), imageUrl, voiceUrl, isAnonymous);

      // Update limits
      const updatedValid = [...valid, now];
      localStorage.setItem(key, JSON.stringify(updatedValid));
      setRemainingPosts(POST_LIMIT - updatedValid.length);

      if (isAnonymous) {
        const anonKey = `anon_post_limit_${user.id}`;
        const anonStored = JSON.parse(localStorage.getItem(anonKey) || "[]");
        const updatedAnon = [...anonStored, now];
        localStorage.setItem(anonKey, JSON.stringify(updatedAnon));
        setRemainingAnonPosts(ANON_LIMIT - updatedAnon.length);
      }

      setContent("");
      setImageFile(null);
      setImagePreview(null);
      setIsAnonymous(false);
      setVoiceBlob(null);
      setVoicePreviewUrl(null);

      onCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create post");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl p-5 animate-slide-up shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Create Post</h2>
          <button aria-label="Close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Limits info */}
        <div className="mb-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 p-3 border border-blue-200 dark:border-blue-800 space-y-1">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Clock size={16} />
            <span className="text-sm font-medium">
              {remainingPosts} / 10 posts remaining this hour
            </span>
          </div>
          {isAnonymous && (
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Clock size={16} />
              <span className="text-sm font-medium">
                Anonymous: {remainingAnonPosts} / 1 remaining (every 2 hrs)
              </span>
            </div>
          )}
        </div>

        {/* Anonymous toggle */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Post anonymously</span>
          <button
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              isAnonymous ? "bg-purple-600" : "bg-slate-300 dark:bg-slate-600"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                isAnonymous ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full min-h-[120px] p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Image preview */}
        {imagePreview && (
          <div className="relative mt-3">
            <img src={imagePreview} alt="Preview" className="rounded-xl max-h-48 object-cover" />
            <button
              aria-label="Remove image"
              onClick={removeImage}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Voice recording UI */}
        {voicePreviewUrl ? (
          <div className="mt-3 flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
            <audio controls src={voicePreviewUrl} className="flex-1 h-10" />
            <button onClick={removeVoice} className="p-1.5 text-red-500" aria-label="Remove voice">
              <Trash2 size={16} />
            </button>
          </div>
        ) : isRecording ? (
          <div className="mt-3 flex items-center gap-3 bg-red-50 dark:bg-red-950/30 p-3 rounded-xl">
            <span className="text-red-500 animate-pulse">Recording...</span>
            <button onClick={stopRecording} className="ml-auto p-2 bg-red-500 text-white rounded-full">
              <MicOff size={16} />
            </button>
          </div>
        ) : null}

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
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
            {!voiceBlob && (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`flex items-center gap-2 text-sm ${
                  isRecording ? "text-red-500" : "text-purple-600"
                }`}
              >
                {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                {isRecording ? "Stop" : "Voice"}
              </button>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={uploading || remainingPosts <= 0 || (!content.trim() && !imageFile && !voiceBlob)}
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

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
}