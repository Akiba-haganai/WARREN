import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { getUserMemberships, fetchCommunities } from "../../features/communities/services/communities.service";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Users } from "lucide-react";

export default function CampusGroupsPage() {
  const { userId } = useParams<{ userId?: string }>();
  const currentUser = useAuthStore((s) => s.user);
  const targetUserId = userId || currentUser?.id;

  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!targetUserId) return;

    getUserMemberships(targetUserId).then(async (ids) => {
      if (ids.size === 0) return setLoading(false);
      const all = await fetchCommunities();
      setGroups(all.filter((c) => ids.has(c.id)));
      setLoading(false);
    });
  }, [targetUserId]);

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Campus Groups</h1>
        {loading ? (
          <p className="opacity-60">Loading...</p>
        ) : groups.length === 0 ? (
          <div className="text-center py-12 opacity-60">
            <Users size={48} className="mx-auto mb-3 opacity-30" />
            <p>No groups joined yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {groups.map((g) => (
              <div key={g.id} className="bg-white dark:bg-slate-900 rounded-xl p-4 flex items-center gap-3">
                <div className="text-2xl">{g.icon}</div>
                <div>
                  <p className="font-semibold">{g.name}</p>
                  <p className="text-xs opacity-60">{g.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}