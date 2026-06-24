import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calendar } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import {
  fetchStudyMaterials,
  fetchSubjects,
  fetchSavedMaterialIds,
  saveMaterial,
  unsaveMaterial,
  incrementDownloadCount,
  type StudyMaterial,
} from "../../services/studyService";
import { useAuthStore } from "../../store/authStore";

// ─── Constants ────────────────────────────────────────────────────────────────

const YEAR_GROUPS = ["All", "Year 1", "Year 2", "Year 3", "Year 4", "Postgrad"];

const MATERIAL_TYPES = [
  { value: "All",        label: "All",         icon: "📚" },
  { value: "notes",      label: "Notes",       icon: "📝" },
  { value: "slides",     label: "Slides",      icon: "🖼️" },
  { value: "past_paper", label: "Past Papers", icon: "📄" },
  { value: "assignment", label: "Assignments", icon: "✏️" },
  { value: "resource",   label: "Resources",   icon: "🔗" },
  { value: "video",      label: "Videos",      icon: "🎬" },
];

const TYPE_META: Record<string, { color: string; bg: string; border: string; icon: string; label: string }> = {
  notes:      { color: "#818CF8", bg: "rgba(99,102,241,0.15)",  border: "#6366F1", icon: "📝", label: "Notes"      },
  slides:     { color: "#34D399", bg: "rgba(52,211,153,0.15)",  border: "#10B981", icon: "🖼️", label: "Slides"     },
  past_paper: { color: "#F59E0B", bg: "rgba(245,158,11,0.15)", border: "#F59E0B", icon: "📄", label: "Past Paper" },
  assignment: { color: "#F87171", bg: "rgba(248,113,113,0.15)",border: "#EF4444", icon: "✏️", label: "Assignment" },
  resource:   { color: "#60A5FA", bg: "rgba(96,165,250,0.15)", border: "#3B82F6", icon: "🔗", label: "Resource"   },
  video:      { color: "#C084FC", bg: "rgba(192,132,252,0.15)",border: "#A855F7", icon: "🎬", label: "Video"      },
};

const SUBJECT_COLORS = [
  "#6366F1","#10B981","#F59E0B","#EF4444","#3B82F6",
  "#A855F7","#EC4899","#14B8A6","#F97316","#06B6D4",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function subjectColor(subject: string, subjects: string[]) {
  return SUBJECT_COLORS[subjects.indexOf(subject) % SUBJECT_COLORS.length] ?? "#6366F1";
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// ─── Small components ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 px-0.5">
      {children}
    </p>
  );
}

function ChipScroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
}

function Chip({ active, accent, onClick, children }: {
  active: boolean; accent?: string; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={active && accent ? { background: accent, color: "#fff", borderColor: accent, boxShadow: `0 0 10px ${accent}55` } : undefined}
      className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 whitespace-nowrap
        ${active && !accent
          ? "bg-blue-600 dark:bg-cyan-500 text-white border-blue-600 dark:border-cyan-500"
          : !active
          ? "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
          : ""
        }`}
    >
      {children}
    </button>
  );
}

function SearchBar({ value, onChange, onClear }: { value: string; onChange: (v: string) => void; onClear: () => void }) {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl px-3 mb-3">
      <span className="text-slate-400 text-sm shrink-0">🔍</span>
      <input
        type="search"
        placeholder="Search materials, subjects…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 py-3 outline-none border-none"
      />
      {value && (
        <button onClick={onClear} className="text-slate-400 text-sm px-1 shrink-0">✕</button>
      )}
    </div>
  );
}

// ─── MaterialCard ─────────────────────────────────────────────────────────────

function MaterialCard({ material, subjects, saved, onSaveToggle, onOpen }: {
  material: StudyMaterial; subjects: string[]; saved: boolean;
  onSaveToggle: (id: string, saved: boolean) => void; onOpen: (m: StudyMaterial) => void;
}) {
  const meta  = TYPE_META[material.material_type] ?? TYPE_META["resource"];
  const color = subjectColor(material.subject, subjects);

  return (
    <div
      onClick={() => onOpen(material)}
      style={{ borderLeftColor: color }}
      className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 border-l-[3px] rounded-2xl p-4 cursor-pointer active:scale-[0.99] transition-transform duration-100 [-webkit-tap-highlight-color:transparent]"
    >
      {/* Badge row */}
      <div className="flex items-center justify-between mb-2">
        <span style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}33` }}
          className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full">
          {meta.icon} {meta.label}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onSaveToggle(material.id, saved); }}
          className="text-lg leading-none p-0.5 [-webkit-tap-highlight-color:transparent]"
          aria-label={saved ? "Unsave" : "Save"}
        >
          {saved ? "🔖" : "🏷️"}
        </button>
      </div>

      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug mb-1 line-clamp-2">{material.title}</h3>

      {material.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-2 line-clamp-2">{material.description}</p>
      )}

      {material.tags && material.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2.5">
          {material.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700/60 rounded px-1.5 py-0.5">#{tag}</span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span style={{ background: `${color}18`, color }} className="text-[11px] font-bold px-2 py-0.5 rounded-full">{material.subject}</span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-full px-2 py-0.5">{material.year_group}</span>
        </div>
        <span className="text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">
          {material.download_count > 0 && `⬇ ${material.download_count} · `}{timeAgo(material.created_at)}
        </span>
      </div>

      {material.uploader_username && (
        <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-700/50">
          <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center overflow-hidden shrink-0">
            {material.uploader_avatar
              ? <img src={material.uploader_avatar} alt="" className="w-full h-full object-cover" />
              : <span className="text-[9px] font-black text-blue-600 dark:text-blue-400">{material.uploader_username.slice(0,2).toUpperCase()}</span>
            }
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{material.uploader_username}</span>
          {material.is_pinned && (
            <span className="ml-auto text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-full px-2 py-0.5">📌 Pinned</span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── MaterialDrawer ───────────────────────────────────────────────────────────

function MaterialDrawer({ material, subjects, saved, onSaveToggle, onClose, onDownload }: {
  material: StudyMaterial; subjects: string[]; saved: boolean;
  onSaveToggle: (id: string, saved: boolean) => void; onClose: () => void; onDownload: (m: StudyMaterial) => void;
}) {
  const meta  = TYPE_META[material.material_type] ?? TYPE_META["resource"];
  const color = subjectColor(material.subject, subjects);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40" />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 rounded-t-[24px] max-h-[85dvh] overflow-y-auto border-t border-slate-200 dark:border-slate-700/60 animate-slide-up">
        <div className="w-9 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mt-3" />

        <div style={{ background: `${color}18`, borderBottom: `1px solid ${color}33` }}
          className="flex items-center justify-between px-4 py-3 mt-2">
          <span style={{ background: meta.bg, color: meta.color }} className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full">
            {meta.icon} {meta.label}
          </span>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm">
            ✕
          </button>
        </div>

        <div className="px-5 pt-4 pb-10">
          <h2 className="text-xl font-black text-slate-900 dark:text-white leading-snug mb-3">{material.title}</h2>

          <div className="flex flex-wrap gap-2 mb-4">
            <span style={{ background: `${color}20`, color }} className="text-xs font-bold px-3 py-1 rounded-full">{material.subject}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-3 py-1">{material.year_group}</span>
            {material.is_pinned && (
              <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-full px-2.5 py-1">📌 Pinned</span>
            )}
          </div>

          {material.description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{material.description}</p>
          )}

          {material.tags && material.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {material.tags.map((tag) => (
                <span key={tag} className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg px-2.5 py-1">#{tag}</span>
              ))}
            </div>
          )}

          {material.uploader_username && (
            <div className="flex items-center gap-3 mb-6 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center overflow-hidden shrink-0">
                {material.uploader_avatar
                  ? <img src={material.uploader_avatar} alt="" className="w-full h-full object-cover" />
                  : <span className="text-xs font-black text-blue-600 dark:text-blue-400">{material.uploader_username.slice(0,2).toUpperCase()}</span>
                }
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{material.uploader_username}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Posted {formatDate(material.created_at)}</p>
              </div>
              <span className="ml-auto text-xs text-slate-400 dark:text-slate-500 shrink-0">{material.download_count} downloads</span>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {(material.file_url || material.external_url) && (
              <button onClick={() => onDownload(material)} style={{ background: color }}
                className="w-full py-3.5 rounded-2xl text-white text-sm font-bold tracking-wide">
                {material.material_type === "video" ? "▶  Watch" : material.external_url ? "🔗  Open Link" : "⬇  Download"}
              </button>
            )}
            <button
              onClick={() => onSaveToggle(material.id, saved)}
              style={saved ? { borderColor: "#F59E0B", color: "#F59E0B" } : undefined}
              className={`w-full py-3.5 rounded-2xl text-sm font-bold border transition-colors
                ${saved ? "bg-amber-50 dark:bg-amber-900/10" : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800"}`}
            >
              {saved ? "🔖  Saved" : "🏷️  Save for later"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 border-l-[3px] border-l-slate-200 dark:border-l-slate-700 rounded-2xl p-4 animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="h-5 w-20 bg-slate-100 dark:bg-slate-700 rounded-full" />
        <div className="h-5 w-5 bg-slate-100 dark:bg-slate-700 rounded" />
      </div>
      <div className="h-4 w-4/5 bg-slate-100 dark:bg-slate-700 rounded mb-2" />
      <div className="h-3 w-3/5 bg-slate-100 dark:bg-slate-700 rounded mb-4" />
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-slate-100 dark:bg-slate-700 rounded-full" />
        <div className="h-5 w-12 bg-slate-100 dark:bg-slate-700 rounded-full" />
      </div>
    </div>
  );
}

function EmptyState({ search, hasFilters }: { search: string; hasFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-3 px-6">
      <span className="text-5xl">{search ? "🔍" : hasFilters ? "🔎" : "📚"}</span>
      <p className="text-base font-bold text-slate-500 dark:text-slate-400">
        {search ? `No results for "${search}"` : hasFilters ? "Nothing matches these filters" : "No materials yet"}
      </p>
      <p className="text-sm text-slate-400 dark:text-slate-500 max-w-[240px] leading-relaxed">
        {search || hasFilters ? "Try adjusting your search or filters." : "Check back later — your lecturers will upload materials here."}
      </p>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function StudyPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [materials,        setMaterials]        = useState<StudyMaterial[]>([]);
  const [subjects,         setSubjects]         = useState<string[]>([]);
  const [savedIds,         setSavedIds]         = useState<Set<string>>(new Set());
  const [loading,          setLoading]          = useState(true);
  const [selected,         setSelected]         = useState<StudyMaterial | null>(null);
  const [search,           setSearch]           = useState("");
  const [debouncedSearch,  setDebouncedSearch]  = useState("");
  const [yearFilter,       setYearFilter]       = useState("All");
  const [typeFilter,       setTypeFilter]       = useState("All");
  const [subjectFilter,    setSubjectFilter]    = useState("All");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(debounceRef.current);
  }, [search]);

  useEffect(() => { fetchSubjects().then(setSubjects).catch(console.error); }, []);

  useEffect(() => {
    if (!user) return;
    fetchSavedMaterialIds(user.id).then((ids) => setSavedIds(new Set(ids))).catch(console.error);
  }, [user]);

  useEffect(() => {
    setLoading(true);
    fetchStudyMaterials({
      search:        debouncedSearch || undefined,
      year_group:    yearFilter    !== "All" ? yearFilter    : undefined,
      subject:       subjectFilter !== "All" ? subjectFilter : undefined,
      material_type: typeFilter    !== "All" ? typeFilter    : undefined,
    })
      .then(setMaterials)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [debouncedSearch, yearFilter, typeFilter, subjectFilter]);

  const handleSaveToggle = useCallback(async (id: string, isSaved: boolean) => {
    if (!user) return;
    try {
      if (isSaved) {
        await unsaveMaterial(user.id, id);
        setSavedIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
      } else {
        await saveMaterial(user.id, id);
        setSavedIds((prev) => new Set(prev).add(id));
      }
    } catch (e) { console.error(e); }
  }, [user]);

  const handleDownload = useCallback(async (material: StudyMaterial) => {
    const url = material.file_url ?? material.external_url;
    if (!url) return;
    await incrementDownloadCount(material.id);
    setMaterials((prev) => prev.map((m) => m.id === material.id ? { ...m, download_count: m.download_count + 1 } : m));
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const hasFilters = yearFilter !== "All" || typeFilter !== "All" || subjectFilter !== "All";
  const subjectColorMap = Object.fromEntries(subjects.map((s, i) => [s, SUBJECT_COLORS[i % SUBJECT_COLORS.length]]));

  return (
    <AppShell>
      {/* Page header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shrink-0">
              <BookOpen size={15} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Study</h1>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 ml-10">Lecturer materials & resources</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/events")}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
          >
            <Calendar size={12} />
            Events
          </button>
          {!loading && materials.length > 0 && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-blue-800/40">
              {materials.length}
            </span>
          )}
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} onClear={() => { setSearch(""); setDebouncedSearch(""); }} />

      {/* Type filter */}
      <div className="mb-3">
        <ChipScroll>
          {MATERIAL_TYPES.map(({ value, label, icon }) => {
            const active = value === typeFilter;
            const meta   = TYPE_META[value];
            return (
              <Chip key={value} active={active} accent={active && meta ? meta.color : undefined} onClick={() => setTypeFilter(value)}>
                <span>{icon}</span><span>{label}</span>
              </Chip>
            );
          })}
        </ChipScroll>
      </div>

      {/* Year filter */}
      <div className="mb-3">
        <SectionLabel>Year Group</SectionLabel>
        <ChipScroll>
          {YEAR_GROUPS.map((y) => (
            <Chip key={y} active={y === yearFilter} onClick={() => setYearFilter(y)}>{y}</Chip>
          ))}
        </ChipScroll>
      </div>

      {/* Subject filter */}
      {subjects.length > 0 && (
        <div className="mb-4">
          <SectionLabel>Subject</SectionLabel>
          <ChipScroll>
            {["All", ...subjects].map((s) => (
              <Chip key={s} active={s === subjectFilter} accent={s !== "All" && s === subjectFilter ? subjectColorMap[s] : undefined} onClick={() => setSubjectFilter(s)}>
                {s}
              </Chip>
            ))}
          </ChipScroll>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-2.5">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : materials.length === 0
          ? <EmptyState search={debouncedSearch} hasFilters={hasFilters} />
          : materials.map((m) => (
              <MaterialCard key={m.id} material={m} subjects={subjects} saved={savedIds.has(m.id)} onSaveToggle={handleSaveToggle} onOpen={setSelected} />
            ))
        }
      </div>

      {/* Drawer */}
      {selected && (
        <MaterialDrawer material={selected} subjects={subjects} saved={savedIds.has(selected.id)} onSaveToggle={handleSaveToggle} onClose={() => setSelected(null)} onDownload={handleDownload} />
      )}
    </AppShell>
  );
}