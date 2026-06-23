import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { fetchCommunities, deleteCommunity } from "../../services/communityService";
import type { Community } from "../../types/community";
import { Pencil, Trash2 } from "lucide-react";

export default function ManageCommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCommunities();
  }, []);

  const loadCommunities = async () => {
    try {
      setLoading(true);
      const data = await fetchCommunities();
      setCommunities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this community? This cannot be undone.")) return;
    try {
      await deleteCommunity(id);
      setCommunities((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Communities
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage all communities
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/communities/new")}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold"
          >
            + New
          </button>
        </div>

        {loading ? (
          <p className="opacity-60">Loading...</p>
        ) : communities.length === 0 ? (
          <p className="opacity-60">No communities yet.</p>
        ) : (
          <div className="space-y-3">
            {communities.map((community) => (
              <div
                key={community.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border"
              >
                <div className="text-3xl">{community.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{community.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {community.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/communities/edit/${community.id}`)}
                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(community.id)}
                    className="p-2 rounded-xl hover:bg-red-50 text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}