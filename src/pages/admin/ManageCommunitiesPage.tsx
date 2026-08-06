import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { fetchCommunities, deleteCommunity } from "../../features/communities/services/communities.service";
import type { Community } from "../../types/community";
import { Pencil, Trash2, ChevronDown, ChevronRight, Plus } from "lucide-react";
import { getCommunityGradient } from "../../features/communities/utils/communityColors";



export default function ManageCommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"all" | "social" | "educational">("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => { loadCommunities(); }, []);

  const loadCommunities = async () => {
    try {
      setLoading(true);
      const data = await fetchCommunities();
      setCommunities(data);
      // Auto-expand schools
      const parents = data.filter(c => !c.parent_id && c.type === "educational");
      setExpanded(new Set(parents.map(p => p.id)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteConfirm(null);
    try {
      await deleteCommunity(id);
      setCommunities(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleExpand = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Group: parents (no parent_id) + their children
  const filtered = communities.filter(c =>
    filter === "all" ? true : c.type === filter
  );
  const parents = filtered.filter(c => !c.parent_id);
  const childrenMap: Record<string, Community[]> = {};
  filtered.forEach(c => {
    if (c.parent_id) {
      if (!childrenMap[c.parent_id]) childrenMap[c.parent_id] = [];
      childrenMap[c.parent_id].push(c);
    }
  });

  const counts = {
    all: communities.length,
    social: communities.filter(c => c.type === "social").length,
    educational: communities.filter(c => c.type === "educational").length,
  };

  return (
    <AppShell>
      <div className="pb-10">
        {/* Header */}
        <div className="px-4 pt-2 flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Communities</h1>
            <p className="text-xs text-slate-400 mt-0.5">{communities.length} total</p>
          </div>
          <button
            onClick={() => navigate("/admin/communities/new")}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all"
          >
            <Plus size={14} />
            New
          </button>
        </div>

        {/* Filter tabs */}
        <div className="px-4 mb-4">
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
            {(["all", "educational", "social"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                  filter === f
                    ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                    : "text-slate-400"
                }`}
              >
                {f === "all" ? `All (${counts.all})` : f === "educational" ? `🎓 Schools (${counts.educational})` : `🏠 Social (${counts.social})`}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="px-4 space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : parents.length === 0 ? (
          <div className="text-center py-16 px-4">
            <span className="text-5xl mb-3 block">🏕️</span>
            <p className="font-bold text-slate-500">No communities yet.</p>
            <button onClick={() => navigate("/admin/communities/new")} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold">
              Create First
            </button>
          </div>
        ) : (
          <div className="px-4 space-y-3">
            {parents.map(community => {
              const gradient = getCommunityGradient(community.cover_color, community.id);
              const children = childrenMap[community.id] ?? [];
              const isExpanded = expanded.has(community.id);

              return (
                <div key={community.id} className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80">
                  {/* Parent row */}
                  <div className="flex items-center gap-3 p-3.5">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-xl shrink-0 shadow-sm`}>
                      {community.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">{community.name}</h3>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold shrink-0 ${
                          community.type === "educational"
                            ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                            : "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400"
                        }`}>{community.type}</span>
                      </div>
                      {children.length > 0 && (
                        <p className="text-[11px] text-slate-400">{children.length} sub-communities</p>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {children.length > 0 && (
                        <button
                          onClick={() => toggleExpand(community.id)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400"
                        >
                          {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/admin/communities/edit/${community.id}`)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(community.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-red-400"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  {isExpanded && children.length > 0 && (
                    <div className="border-t border-slate-100 dark:border-slate-700/50">
                      {children.map((child, i) => (
                        <div
                          key={child.id}
                          className={`flex items-center gap-3 px-4 py-2.5 ${
                            i < children.length - 1 ? "border-b border-slate-100 dark:border-slate-700/30" : ""
                          }`}
                        >
                          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 ml-2 shrink-0" />
                          <span className="text-sm">{child.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{child.name}</p>
                            {child.year && (
                              <p className="text-[10px] text-slate-400">{child.year}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => navigate(`/admin/communities/edit/${child.id}`)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400"
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(child.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-red-400"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Delete confirmation modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-4 pb-8">
            <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">Delete Community?</h3>
              <p className="text-sm text-slate-500 mb-5">This will permanently delete this community and all its messages. This cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white text-sm font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}