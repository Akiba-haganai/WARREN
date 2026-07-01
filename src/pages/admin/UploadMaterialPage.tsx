import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import { uploadStudyMaterial } from "../../features/study/services/study.service";
import { useAuthStore } from "../../store/authStore";
import { supabase } from "../../lib/supabase";

const YEAR_GROUPS = ["All Years", "Year 1", "Year 2", "Year 3", "Year 4", "Postgraduate"];

const MATERIAL_TYPES = [
  { value: "notes",      label: "Notes",      icon: "📝" },
  { value: "slides",     label: "Slides",     icon: "🖼️" },
  { value: "past_paper", label: "Past Paper", icon: "📄" },
  { value: "assignment", label: "Assignment", icon: "✏️" },
  { value: "resource",   label: "Resource",   icon: "🔗" },
  { value: "video",      label: "Video",      icon: "🎬" },
] as const;

type MaterialType = typeof MATERIAL_TYPES[number]["value"];

export default function UploadMaterialPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    year_group: "All Years",
    material_type: "notes" as MaterialType,
    external_url: "",
    tags: "",
    is_pinned: false,
  });
  const [file, setFile]       = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const set = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit() {
    if (!user) return;
    if (!form.title.trim())   return setError("Title is required.");
    if (!form.subject.trim()) return setError("Subject is required.");
    if (!file && !form.external_url.trim()) return setError("Provide a file or an external URL.");

    setLoading(true);
    setError("");

    try {
      let file_url: string | null = null;

      if (file) {
        const ext  = file.name.split(".").pop();
        const path = `study-materials/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from("materials")
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (uploadErr) throw uploadErr;
        file_url = supabase.storage.from("materials").getPublicUrl(path).data.publicUrl;
      }

      await uploadStudyMaterial({
        title:         form.title.trim(),
        description:   form.description.trim() || null,
        subject:       form.subject.trim(),
        year_group:    form.year_group,
        material_type: form.material_type,
        file_url,
        external_url:  form.external_url.trim() || null,
        thumbnail_url: null,
        uploaded_by:   user.id,
        tags:          form.tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean),
        is_pinned:     form.is_pinned,
      });

      navigate("/study");
    } catch (e: any) {
      setError(e.message ?? "Something went wrong. Try again.");
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
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">
            Title *
          </label>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Intro to Thermodynamics — Week 3 Notes"
            className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* ── Subject ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">
            Subject *
          </label>
          <input
            value={form.subject}
            onChange={(e) => set("subject", e.target.value)}
            placeholder="e.g. Physics, Mathematics, Computer Science"
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
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">
            Description
          </label>
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
          <label className="flex items-center gap-3 bg-white dark:bg-slate-800/60 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept=".pdf,.ppt,.pptx,.doc,.docx,.xlsx,.mp4,.png,.jpg"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
              <Upload size={14} className="text-slate-400 dark:text-slate-500" />
            </div>
            <span className={`text-sm ${file ? "text-blue-600 dark:text-cyan-400 font-medium" : "text-slate-400 dark:text-slate-500"}`}>
              {file ? file.name : "Tap to choose a file"}
            </span>
          </label>
          {file && (
            <button onClick={() => setFile(null)} className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-medium px-1">
              Remove file
            </button>
          )}
        </div>

        {/* ── External URL ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">
            Or External URL
          </label>
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
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0
              ${form.is_pinned ? "bg-blue-600 dark:bg-cyan-500" : "bg-slate-200 dark:bg-slate-700"}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200
                ${form.is_pinned ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
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