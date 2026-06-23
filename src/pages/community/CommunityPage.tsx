import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import {
  fetchCommunities,
  fetchParentSchools,
  getMemberCounts,
  getUserMemberships,
  joinCommunity,
  leaveCommunity,
  kickMember,
  fetchMembers,
} from "../../services/communityService";
import { useAuthStore } from "../../store/authStore";
import { useUserRole } from "../../hooks/useUserRole";
import type { Community } from "../../types/community";
import { Users, Plus, Check, X, UserX } from "lucide-react";

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

  // Manage members drawer
  const [manageOpen, setManageOpen] = useState<string | null>(null);
  const [membersList, setMembersList] = useState<any[]>([]);

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
        undefined, // we'll filter manually
        undefined
      );

      if (filterType === "educational") {
        // Only show subgroups (parent_id not null)
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
        // all: show social groups and educational subgroups (no parents)
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

  const openManageMembers = async (communityId: string) => {
    setManageOpen(communityId);
    try {
      const members = await fetchMembers(communityId);
      setMembersList(members);
    } catch (err) {
      console.error(err);
      setMembersList([]);
    }
  };

  const handleKick = async (userId: string) => {
    if (!manageOpen) return;
    if (!confirm("Kick this member?")) return;
    try {
      await kickMember(manageOpen, userId);
      setMembersList(prev => prev.filter(m => m.user_id !== userId));
      setMemberCounts(prev => ({
        ...prev,
        [manageOpen]: Math.max(0, (prev[manageOpen] ?? 1) - 1),
      }));
      if (userId === user?.id) {
        setUserMemberships(prev => {
          const next = new Set(prev);
          next.delete(manageOpen);
          return next;
        });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to kick member.");
    }
  };

  const canManage = (community: Community) => {
    if (!user) return false;
    return user.id === community.created_by || role === "admin" || role === "moderator";
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
              className={`px-4 py-2 rounded-full text-sm font-semibold capitalize border transition-all ${
                filterType === t
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
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
              className="px-3 py-2 rounded-xl border text-sm bg-white dark:bg-slate-800"
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
              className="px-3 py-2 rounded-xl border text-sm bg-white dark:bg-slate-800"
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
          <div className="text-center py-12 opacity-60">
            <span className="text-5xl mb-3 block">🏕️</span>
            <p className="font-semibold">No communities found</p>
            <p className="text-sm mt-1">
              Try changing filters or wait for admins to add them.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allCommunities.map(community => {
              const memberCount = memberCounts[community.id] ?? 0;
              const isJoined = userMemberships.has(community.id);
              return (
                <div
                  key={community.id}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${community.cover_color} p-5 shadow-md hover:shadow-lg transition-all duration-300 group`}
                >
                  <div className="absolute -bottom-4 -right-4 text-6xl opacity-20 select-none">
                    {community.icon}
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-3xl">
                        {community.icon.startsWith("http") ? (
                          <img
                            src={community.icon}
                            alt=""
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                        ) : (
                          community.icon
                        )}
                      </div>
                      {canManage(community) && (
                        <button
                          onClick={() => openManageMembers(community.id)}
                          className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30"
                          title="Manage members"
                        >
                          <UserX size={14} />
                        </button>
                      )}
                    </div>
                    <h3 className="font-bold text-white text-lg leading-tight mb-1">
                      {community.name}
                    </h3>
                    <p className="text-white/80 text-sm line-clamp-2 mb-3">
                      {community.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-white/90 text-xs font-medium">
                        <Users size={14} />
                        <span>
                          {memberCount} {memberCount === 1 ? "member" : "members"}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleMembership(community.id)}
                        disabled={joining === community.id}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          isJoined
                            ? "bg-white/20 text-white"
                            : "bg-white text-slate-900 hover:bg-white/90"
                        } disabled:opacity-60`}
                      >
                        {isJoined ? (
                          <>
                            <Check size={14} /> Joined
                          </>
                        ) : (
                          <>
                            <Plus size={14} /> Join
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Manage Members Drawer */}
        {manageOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setManageOpen(null)}
          >
            <div
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl p-4 animate-slide-up max-h-[60vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Members</h2>
                <button onClick={() => setManageOpen(null)} className="p-2">
                  <X size={18} />
                </button>
              </div>
              <div className="overflow-y-auto max-h-[50vh] space-y-2">
                {membersList.map(m => (
                  <div
                    key={m.user_id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      {m.avatar_url ? (
                        <img
                          src={m.avatar_url}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs">
                          {m.username?.[0]?.toUpperCase()}
                        </div>
                      )}
                      <span className="font-medium text-sm">{m.username}</span>
                    </div>
                    <button
                      onClick={() => handleKick(m.user_id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
                      title="Kick"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {membersList.length === 0 && (
                  <p className="text-center opacity-60 text-sm py-4">No members</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </AppShell>
  );
}