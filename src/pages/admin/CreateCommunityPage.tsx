import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { createCommunity, updateCommunity, fetchCommunities } from "../../features/communities/services/communities.service";
import type { Community, CommunityType } from "../../types/community";
const PASTEL_COLORS = [
  "from-pink-200 to-rose-200",
  "from-blue-200 to-cyan-200",
  "from-emerald-200 to-teal-200",
  "from-violet-200 to-purple-200",
  "from-orange-200 to-amber-200",
  "from-indigo-200 to-blue-200",
  "from-red-200 to-pink-200",
];

export default function CreateCommunityPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("👥");
  const [coverColor, setCoverColor] = useState(PASTEL_COLORS[0]);
  const [type, setType] = useState<CommunityType>("social");
  const [parentId, setParentId] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [parents, setParents] = useState<Community[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCommunities("educational", null).then(setParents);
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
        year: type === "educational" ? year : null,
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

  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {isEdit ? "Edit Community" : "Create Community"}
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Type *</label>
            <div className="flex gap-2">
              {["social", "educational"].map(t => (
                <button
                  key={t}
                  onClick={() => setType(t as CommunityType)}
                  className={`flex-1 py-2 rounded-xl border text-sm font-medium capitalize ${
                    type === t
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {type === "educational" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Parent School</label>
                <select
                  value={parentId ?? ""}
                  onChange={e => setParentId(e.target.value || null)}
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800"
                >
                  <option value="">None (this is a school itself)</option>
                  {parents.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">
                  Choose a parent if this is a subgroup (e.g., 1st Year within a school)
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Year (optional)</label>
                <select
                  value={year ?? ""}
                  onChange={e => setYear(e.target.value || null)}
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800"
                >
                  <option value="">None</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                  <option value="all">All Chat</option>
                </select>
              </div>
            </>
          )}

          {/* Other fields */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Name *</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 rounded-xl border" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-xl border" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Icon (emoji or image URL)</label>
            <input value={icon} onChange={e => setIcon(e.target.value)} className="w-full px-3 py-2 rounded-xl border" />
            <p className="text-xs text-slate-400 mt-1">Use an emoji or paste an image URL</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Cover gradient</label>
            <div className="flex flex-wrap gap-2">
              {PASTEL_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => setCoverColor(color)}
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} border-2 ${
                    coverColor === color ? "border-slate-900 dark:border-white" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !name.trim()}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold disabled:opacity-50"
          >
            {saving ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </AppShell>
  );
}