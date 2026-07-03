import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import { uploadStudyMaterial } from "../../features/study/services/study.service";
import { useAuthStore } from "../../store/authStore";
import { supabase } from "../../lib/supabase";
import { compressImage } from "../../services/commentImageService";

const YEAR_GROUPS = [
  "All Years",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Postgraduate",
] as const;

const MATERIAL_TYPES = [
  { value: "notes", label: "Notes", icon: "📝" },
  { value: "slides", label: "Slides", icon: "🖼️" },
  { value: "past_paper", label: "Past Paper", icon: "📄" },
  { value: "assignment", label: "Assignment", icon: "✏️" },
  { value: "resource", label: "Resource", icon: "🔗" },
  { value: "video", label: "Video", icon: "🎬" },
] as const;

type MaterialType = (typeof MATERIAL_TYPES)[number]["value"];

/** Initial form state with all fields required by the StudyMaterial Insert type */
const initialForm = {
  title: "",
  description: "",
  subject: "",
  year_group: "All Years" as string,
  material_type: "notes" as MaterialType,
  external_url: "",
  tags: "",
  is_pinned: false,
  is_premium: false,
  premium_cost: 0,
  trending_score: 0,
  programme: "",
};

export default function UploadMaterialPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  async function handleSubmit() {
    if (!user) return;
    if (!form.title.trim()) return setError("Title is required.");
    if (!form.subject.trim()) return setError("Subject is required.");
    if (files.length === 0 && !form.external_url.trim()) return setError("Provide a file or an external URL.");

    setLoading(true);
    setError("");

    try {
      // Duplicate check using Dice coefficient
      const existingTitles = await supabase.from("study_materials").select("title");
      if (existingTitles.error) throw existingTitles.error;
      const { diceCoefficient } = await import("../../utils/stringSimilarity");
      const duplicate = existingTitles.data?.some((m) => diceCoefficient(form.title, m.title) > 0.7);
      if (duplicate && !confirm("A similar material already exists. Upload anyway?")) {
        setLoading(false);
        return;
      }

      let file_url: string | null = null;

      if (files.length > 0) {
        const file = files[0];
        const compressed = await compressImage(file);
        const filePath = `study/${user.id}/${Date.now()}_${compressed.name}`;
        const { error: uploadErr } = await supabase.storage
          .from("study-materials")
          .upload(filePath, compressed);
        if (uploadErr) throw uploadErr;
        const { data } = supabase.storage.from("study-materials").getPublicUrl(filePath);
        file_url = data.publicUrl;
      }

      // The uploadStudyMaterial function expects all non‑null fields of StudyMaterial Insert
      await uploadStudyMaterial({
        title: form.title.trim(),
        description: form.description.trim() || null,
        subject: form.subject.trim(),
        programme: form.programme.trim() || null,
        year_group: form.year_group,
        material_type: form.material_type,
        file_url,
        external_url: form.external_url.trim() || null,
        thumbnail_url: null,
        uploaded_by: user.id,
        tags: form.tags
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .filter(Boolean),
        is_pinned: form.is_pinned,
        is_premium: form.is_premium,
        premium_cost: form.premium_cost,
        trending_score: form.trending_score,
      });

      navigate("/study");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong. Try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Upload Material</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500">Add a resource for students</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* ── Material type ── */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Type</p>
          <div className="grid grid-cols-3 gap-2">
            {MATERIAL_TYPES.map(({ value, label, icon }) => {
              const active = form.material_type === value;
              return (
                <button
                  key={value}
                  onClick={() => set("material_type", value)}
                  className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border text-xs font-semibold transition-all duration-150
                    ${active
                      ? "border-blue-500 dark:border-cyan-500 bg-blue-50 dark:bg-cyan-900/20 text-blue-700 dark:text-cyan-400"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-500 dark:text-slate-400"
                    }`}
                >
                  <span className="text-xl">{icon}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Title ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">Title *</label>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Intro to Thermodynamics — Week 3 Notes"
            className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* ── Subject ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">Subject *</label>
          <input
            value={form.subject}
            onChange={(e) => set("subject", e.target.value)}
            placeholder="e.g. Physics, Mathematics, Computer Science"
            className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* ── Programme ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">
            Programme / Course
          </label>
          <input
            value={form.programme}
            onChange={(e) => set("programme", e.target.value)}
            placeholder="e.g. Computer Science, Geology"
            className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* ── Year group ── */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Year Group</p>
          <div className="flex flex-wrap gap-2">
            {YEAR_GROUPS.map((y) => (
              <button
                key={y}
                onClick={() => set("year_group", y)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150
                  ${form.year_group === y
                    ? "bg-blue-600 dark:bg-cyan-500 border-blue-600 dark:border-cyan-500 text-white"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                  }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* ── Description ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Brief description of what this material covers…"
            className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors resize-none"
          />
        </div>

        {/* ── File upload ── */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Upload File</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.ppt,.pptx"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-3 bg-white dark:bg-slate-800/60 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
              <Upload size={14} className="text-slate-400 dark:text-slate-500" />
            </div>
            <span className={`text-sm ${files.length > 0 ? "text-blue-600 dark:text-cyan-400 font-medium" : "text-slate-400 dark:text-slate-500"}`}>
              {files.length > 0 ? `${files.length} file(s) selected` : "Tap to choose files"}
            </span>
          </label>
          {files.length > 0 && (
            <button onClick={() => setFiles([])} className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-medium px-1">
              Remove files
            </button>
          )}
        </div>

        {/* ── External URL ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">Or External URL</label>
          <input
            value={form.external_url}
            onChange={(e) => set("external_url", e.target.value)}
            placeholder="https://drive.google.com/…"
            className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* ── Tags ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">
            Tags <span className="normal-case font-normal">(comma separated)</span>
          </label>
          <input
            value={form.tags}
            onChange={(e) => set("tags", e.target.value)}
            placeholder="midterm, chapter-3, optics"
            className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* ── Pin toggle ── */}
        <div className="flex items-center justify-between bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl px-4 py-3.5">
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Pin this material</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">Pinned materials appear at the top</p>
          </div>
          <button
            onClick={() => set("is_pinned", !form.is_pinned)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
              form.is_pinned ? "bg-blue-600 dark:bg-cyan-500" : "bg-slate-200 dark:bg-slate-700"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                form.is_pinned ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* ── Premium & Credits (optional) ── */}
        <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl px-4 py-3.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Premium Content</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Require credits to unlock</p>
            </div>
            <button
              onClick={() => set("is_premium", !form.is_premium)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
                form.is_premium ? "bg-amber-500" : "bg-slate-200 dark:bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  form.is_premium ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          {form.is_premium && (
            <div className="mt-3">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Credit Cost</label>
              <input
                type="number"
                min={0}
                value={form.premium_cost}
                onChange={(e) => set("premium_cost", Number(e.target.value) || 0)}
                className="w-24 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white outline-none"
              />
            </div>
          )}
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-2xl px-4 py-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* ── Submit ── */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 bg-blue-600 dark:bg-cyan-500 text-white text-sm font-bold rounded-2xl shadow-lg shadow-blue-500/20 dark:shadow-cyan-500/20 disabled:opacity-60 transition-opacity"
        >
          {loading ? "Uploading…" : "Publish Material"}
        </button>
      </div>
    </AppShell>
  );
}