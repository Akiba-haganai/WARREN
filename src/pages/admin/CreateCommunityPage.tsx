import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { createCommunity, updateCommunity, fetchCommunities } from "../../features/communities/services/communities.service";
import type { Community, CommunityType } from "../../types/community";
import { COMMUNITY_GRADIENTS } from "../../features/communities/utils/communityColors";
import { CheckCircle, Loader2, ChevronRight, Layers, Users } from "lucide-react";

// ─── CBU School Presets ─────────────────────────────────────────────────────────
export const CBU_SCHOOL_PRESETS = [
  {
    name: "School of Natural Resources",
    shortName: "SNR",
    description: "Agriculture, environmental science, forestry, and natural resource management at CBU.",
    icon: "🌿",
    cover_color: "from-emerald-600 via-teal-600 to-cyan-700",
  },
  {
    name: "School of Engineering",
    shortName: "SOE",
    description: "Civil, mechanical, electrical, and chemical engineering programs at CBU.",
    icon: "⚙️",
    cover_color: "from-slate-600 via-blue-700 to-indigo-800",
  },
  {
    name: "School of Business",
    shortName: "SOB",
    description: "Accounting, finance, marketing, management, and entrepreneurship at CBU.",
    icon: "💼",
    cover_color: "from-amber-500 via-orange-600 to-red-600",
  },
  {
    name: "School of Humanities and Social Sciences",
    shortName: "SHSS",
    description: "Languages, literature, philosophy, sociology, and social sciences at CBU.",
    icon: "📖",
    cover_color: "from-violet-600 via-purple-600 to-pink-600",
  },
  {
    name: "School of Law",
    shortName: "SOL",
    description: "Legal studies, criminal law, commercial law, and jurisprudence at CBU.",
    icon: "⚖️",
    cover_color: "from-indigo-700 via-blue-700 to-cyan-600",
  },
  {
    name: "School of Mines and Natural Sciences",
    shortName: "SMNS",
    description: "Mining engineering, geology, chemistry, mathematics, and physics at CBU.",
    icon: "⛏️",
    cover_color: "from-stone-600 via-amber-700 to-yellow-700",
  },
  {
    name: "School of Medicine",
    shortName: "SOM",
    description: "Medicine, nursing, public health, and biomedical sciences at CBU.",
    icon: "🏥",
    cover_color: "from-red-600 via-rose-600 to-pink-600",
  },
  {
    name: "School of ICT",
    shortName: "SICT",
    description: "Computer science, information systems, software engineering, and cybersecurity at CBU.",
    icon: "💻",
    cover_color: "from-blue-600 via-cyan-600 to-teal-500",
  },
];

const YEAR_OPTIONS = [
  { value: "", label: "None (school-wide)" },
  { value: "Year 1", label: "Year 1" },
  { value: "Year 2", label: "Year 2" },
  { value: "Year 3", label: "Year 3" },
  { value: "Year 4", label: "Year 4" },
  { value: "Postgrad", label: "Postgrad" },
];

export default function CreateCommunityPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("👥");
  const [coverColor, setCoverColor] = useState(COMMUNITY_GRADIENTS[0].gradientClass);
  const [type, setType] = useState<CommunityType>("social");
  const [parentId, setParentId] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [parents, setParents] = useState<Community[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"manual" | "cbu">("manual");

  // CBU batch creation state
  const [createdSchools, setCreatedSchools] = useState<Set<string>>(new Set());
  const [creatingSchool, setCreatingSchool] = useState<string | null>(null);

  useEffect(() => {
    fetchCommunities("educational", null).then(existing => {
      setParents(existing);
      // Mark already created schools
      const created = new Set<string>();
      existing.forEach(c => {
        const match = CBU_SCHOOL_PRESETS.find(p => p.name === c.name);
        if (match) created.add(match.shortName);
      });
      setCreatedSchools(created);
    });

    if (isEdit && id) {
      fetchCommunities().then(all => {
        const comm = all.find(c => c.id === id);
        if (comm) {
          setName(comm.name);
          setDescription(comm.description);
          setIcon(comm.icon);
          setCoverColor(comm.cover_color);
          setType(comm.type as CommunityType);
          setParentId(comm.parent_id);
          setYear(comm.year);
          setActiveTab("manual");
        } else navigate("/admin/communities");
      });
    }
  }, [id, isEdit, navigate]);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    setError("");
    try {
      const payload = {
        name: name.trim(),
        description,
        icon,
        cover_color: coverColor,
        type,
        parent_id: parentId,
        year: type === "educational" ? year || null : null,
        archived: false,
      };
      if (isEdit && id) {
        await updateCommunity(id, payload);
      } else {
        await createCommunity(payload as any);
      }
      navigate("/admin/communities");
    } catch (err: any) {
      setError(err.message || "Failed to save community");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateSchool = async (preset: typeof CBU_SCHOOL_PRESETS[0]) => {
    if (createdSchools.has(preset.shortName)) return;
    setCreatingSchool(preset.shortName);
    try {
      await createCommunity({
        name: preset.name,
        description: preset.description,
        icon: preset.icon,
        cover_color: preset.cover_color,
        type: "educational",
        parent_id: null,
        year: null,
        archived: false,
      } as any);
      setCreatedSchools(prev => new Set([...prev, preset.shortName]));
      // Refresh parent schools list
      fetchCommunities("educational", null).then(setParents);
    } catch (err: any) {
      // If it already exists in DB but wasn't detected, mark it anyway
      if (err.message?.includes("duplicate") || err.code === "23505") {
        setCreatedSchools(prev => new Set([...prev, preset.shortName]));
      }
    } finally {
      setCreatingSchool(null);
    }
  };

  const handleCreateAllSchools = async () => {
    for (const preset of CBU_SCHOOL_PRESETS) {
      if (!createdSchools.has(preset.shortName)) {
        await handleCreateSchool(preset);
      }
    }
  };

  const allCreated = CBU_SCHOOL_PRESETS.every(p => createdSchools.has(p.shortName));

  return (
    <AppShell>
      <div className="pb-10">
        {/* Header */}
        <div className="px-4 pt-2 mb-4">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            {isEdit ? "Edit Community" : "New Community"}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Create schools, year groups, or social spaces</p>
        </div>

        {/* Tab switcher — only on new */}
        {!isEdit && (
          <div className="px-4 mb-5">
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
              <button
                onClick={() => setActiveTab("manual")}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === "manual"
                    ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                    : "text-slate-500"
                }`}
              >
                Manual
              </button>
              <button
                onClick={() => setActiveTab("cbu")}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "cbu"
                    ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                    : "text-slate-500"
                }`}
              >
                🎓 CBU Schools
              </button>
            </div>
          </div>
        )}

        {/* ─── CBU Quick-Create Tab ───────────────────────────────────── */}
        {activeTab === "cbu" && !isEdit && (
          <div className="px-4 space-y-3">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-500 text-white mb-2">
              <h2 className="font-bold text-base mb-1">Copperbelt University Schools</h2>
              <p className="text-xs opacity-85">
                Create all 8 CBU school communities at once, or pick individual schools. Each creates a parent educational community.
              </p>
              {!allCreated && (
                <button
                  onClick={handleCreateAllSchools}
                  className="mt-3 w-full py-2 bg-white/20 border border-white/30 rounded-xl text-sm font-bold backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center gap-2"
                >
                  <Layers size={14} />
                  Create All 8 Schools
                </button>
              )}
              {allCreated && (
                <div className="mt-3 flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle size={16} />
                  All schools created!
                </div>
              )}
            </div>

            {CBU_SCHOOL_PRESETS.map(preset => {
              const isDone = createdSchools.has(preset.shortName);
              const isCreating = creatingSchool === preset.shortName;
              return (
                <div
                  key={preset.shortName}
                  className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                    isDone
                      ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"
                      : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {/* Gradient Preview */}
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${preset.cover_color} flex items-center justify-center text-xl shrink-0 shadow-sm`}
                  >
                    {preset.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug truncate">
                      {preset.name}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-mono">{preset.shortName}</p>
                  </div>

                  <button
                    onClick={() => handleCreateSchool(preset)}
                    disabled={isDone || isCreating}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      isDone
                        ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"
                        : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 active:scale-95"
                    }`}
                  >
                    {isCreating ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : isDone ? (
                      <><CheckCircle size={12} /> Created</>
                    ) : (
                      <>Create <ChevronRight size={12} /></>
                    )}
                  </button>
                </div>
              );
            })}

            {/* Divider to manual form */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-400 mb-3 text-center">
                After creating schools, add year-group sub-communities below
              </p>
              <button
                onClick={() => setActiveTab("manual")}
                className="w-full py-2.5 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <Users size={14} />
                Create Sub-community manually
              </button>
            </div>
          </div>
        )}

        {/* ─── Manual Form Tab ─────────────────────────────────────────── */}
        {(activeTab === "manual" || isEdit) && (
          <div className="px-4 space-y-5">
            {/* Type Toggle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Community Type</label>
              <div className="flex gap-2">
                {(["social", "educational"] as CommunityType[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold capitalize transition-all ${
                      type === t
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500"
                    }`}
                  >
                    {t === "social" ? "🏠 Social" : "🎓 Educational"}
                  </button>
                ))}
              </div>
            </div>

            {/* Educational fields */}
            {type === "educational" && (
              <>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Parent School
                  </label>
                  <select
                    value={parentId ?? ""}
                    onChange={e => setParentId(e.target.value || null)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                  >
                    <option value="">None — this IS a school</option>
                    {parents.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.icon} {p.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Leave empty if this is a top-level school. Select a school if this is a year group or department.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Year Group
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {YEAR_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setYear(opt.value || null)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          (year ?? "") === opt.value
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900"
                            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-400"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Name *</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. SOE – Year 1, CBU Football Club…"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                placeholder="What is this community about?"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm resize-none"
              />
            </div>

            {/* Icon */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Icon</label>
              <div className="flex gap-2 items-center">
                <span className="text-3xl w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl">{icon}</span>
                <input
                  value={icon}
                  onChange={e => setIcon(e.target.value)}
                  placeholder="Emoji or image URL"
                  className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Paste an emoji or an image URL</p>
            </div>

            {/* Cover Gradient */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Cover Gradient</label>
              {/* Preview */}
              <div className={`h-16 w-full rounded-2xl bg-gradient-to-br ${coverColor} mb-3 flex items-center justify-center shadow-md`}>
                <span className="text-white text-sm font-bold drop-shadow">{name || "Preview"}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {COMMUNITY_GRADIENTS.map(preset => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setCoverColor(preset.gradientClass)}
                    title={preset.name}
                    className={`h-11 rounded-xl bg-gradient-to-br ${preset.gradientClass} border-2 transition-all ${
                      coverColor === preset.gradientClass
                        ? "border-slate-900 dark:border-white scale-105 shadow-md"
                        : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 px-3 py-2 rounded-xl">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              onClick={handleSave}
              disabled={saving || !name.trim()}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <><Loader2 size={16} className="animate-spin" /> Saving...</>
              ) : (
                isEdit ? "Update Community" : "Create Community"
              )}
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}