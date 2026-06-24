import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import {
  fetchCommunities,
  fetchParentSchools,
  getMemberCounts,
  getUserMemberships,
  joinCommunity,
  leaveCommunity,
} from "../../services/communityService";
import { useAuthStore } from "../../store/authStore";
import { useUserRole } from "../../hooks/useUserRole";
import type { Community } from "../../types/community";
import CommunityCard from "../../components/community/CommunityCard";
import CommunityMembersDrawer from "../../components/community/CommunityMembersDrawer";

type FilterType = "all" | "social" | "educational";

export default function CommunityPage() {
  const user = useAuthStore((s) => s.user);
  const { role } = useUserRole();

  const [allCommunities, setAllCommunities] = useState<Community[]>([]);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [parentSchools, setParentSchools] = useState<Community[]>([]);
  const [memberCounts, setMemberCounts] = useState<Record<string, number>>({});
  const [userMemberships, setUserMemberships] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState<string | null>(null);

  // Members drawer state
  const [manageCommunityId, setManageCommunityId] = useState<string | null>(null);

  useEffect(() => {
    loadInitial();
  }, []);

  useEffect(() => {
    loadCommunities();
  }, [filterType, selectedParentId, selectedYear]);

  const loadInitial = async () => {
    try {
      const parents = await fetchParentSchools();
      setParentSchools(parents);
    } catch (err) {
      console.error(err);
    }
  };

  const loadCommunities = async () => {
    try {
      setLoading(true);
      let data = await fetchCommunities(
        filterType === "all" ? undefined : filterType,
        undefined,
        undefined
      );

      if (filterType === "educational") {
        data = data.filter(c => c.parent_id !== null);
        if (selectedParentId) {
          data = data.filter(c => c.parent_id === selectedParentId);
        }
        if (selectedYear) {
          data = data.filter(c => c.year === selectedYear);
        }
      } else if (filterType === "social") {
        data = data.filter(c => c.type === "social");
      } else {
        data = data.filter(c => c.type === "social" || c.parent_id !== null);
      }

      setAllCommunities(data);

      const ids = data.map(c => c.id);
      if (ids.length > 0) {
        const counts = await getMemberCounts(ids);
        setMemberCounts(counts);
        if (user) {
          const memberships = await getUserMemberships(user.id);
          setUserMemberships(memberships);
        }
      } else {
        setMemberCounts({});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMembership = async (communityId: string) => {
    if (!user) return alert("Please sign in to join communities.");
    setJoining(communityId);
    try {
      if (userMemberships.has(communityId)) {
        await leaveCommunity(communityId);
        setUserMemberships(prev => {
          const next = new Set(prev);
          next.delete(communityId);
          return next;
        });
        setMemberCounts(prev => ({
          ...prev,
          [communityId]: Math.max(0, (prev[communityId] ?? 1) - 1),
        }));
      } else {
        await joinCommunity(communityId);
        setUserMemberships(prev => new Set(prev).add(communityId));
        setMemberCounts(prev => ({
          ...prev,
          [communityId]: (prev[communityId] ?? 0) + 1,
        }));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update membership.");
    } finally {
      setJoining(null);
    }
  };

  const canManage = (community: Community) => {
    if (!user) return false;
    return user.id === community.created_by || role === "admin" || role === "moderator";
  };

  const handleMembersChanged = () => {
    // Refresh counts after kick
    if (manageCommunityId) {
      getMemberCounts([manageCommunityId]).then(counts => {
        setMemberCounts(prev => ({ ...prev, ...counts }));
      });
    }
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Communities
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Connect with your school, year group, or interest
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {(["all", "social", "educational"] as FilterType[]).map(t => (
            <button
              key={t}
              onClick={() => {
                setFilterType(t);
                setSelectedParentId(null);
                setSelectedYear(null);
              }}
              className={`min-h-[44px] px-5 py-2.5 rounded-full text-sm font-semibold capitalize border transition-all duration-200 motion-safe:active:scale-[0.98] ${
                filterType === t
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>

        {/* Educational filters */}
        {filterType === "educational" && (
          <div className="flex gap-2 mb-4 flex-wrap">
            <select
              value={selectedParentId ?? ""}
              onChange={e => setSelectedParentId(e.target.value || null)}
              className="min-h-[44px] px-4 py-2.5 rounded-2xl border text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            >
              <option value="">All Schools</option>
              {parentSchools.map(school => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>

            <select
              value={selectedYear ?? ""}
              onChange={e => setSelectedYear(e.target.value || null)}
              className="min-h-[44px] px-4 py-2.5 rounded-2xl border text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            >
              <option value="">All Years</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
              <option value="all">All Chat</option>
            </select>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : allCommunities.length === 0 ? (
          <div className="text-center py-12 animate-in fade-in zoom-in-95">
            <span className="text-6xl mb-4 block opacity-80">🏕️</span>
            <p className="font-bold text-xl tracking-tight opacity-80">No communities found</p>
            <p className="text-base mt-2 leading-relaxed opacity-60">
              Try changing filters or wait for admins to add them.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allCommunities.map(community => (
              <CommunityCard
                key={community.id}
                community={community}
                memberCount={memberCounts[community.id] ?? 0}
                isJoined={userMemberships.has(community.id)}
                isJoining={joining === community.id}
                canManage={canManage(community)}
                onToggleMembership={toggleMembership}
                onManageMembers={(id) => setManageCommunityId(id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Members drawer */}
      {manageCommunityId && (
        <CommunityMembersDrawer
          communityId={manageCommunityId}
          open={!!manageCommunityId}
          onClose={() => setManageCommunityId(null)}
          onMembersChanged={handleMembersChanged}
        />
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </AppShell>
  );
}
