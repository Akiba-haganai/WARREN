import { useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { useCommunitiesStore } from "../../features/communities/store/communities.store";
import { useCommunities } from "../../features/communities/hooks/useCommunities";
import { useCommunityMembership } from "../../features/communities/hooks/useCommunityMembership";
import { CommunityGrid } from "../../features/communities/components/CommunityGrid";
import CommunityMembersDrawer from "../../features/communities/components/CommunityMembersDrawer";
import { useAuthStore } from "../../store/authStore";
import { useUserRole } from "../../hooks/useUserRole";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../store/toastStore";
import type { Community } from "../../types/community";


type FilterType = "all" | "social" | "educational";



export default function CommunityPage() {
  const user = useAuthStore((s) => s.user);
  const { role } = useUserRole();
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const filterType = useCommunitiesStore((s) => s.filterType);
  const setFilterType = useCommunitiesStore((s) => s.setFilterType);
  const selectedParentId = useCommunitiesStore((s) => s.selectedParentId);
  const setSelectedParentId = useCommunitiesStore((s) => s.setSelectedParentId);
  const selectedYear = useCommunitiesStore((s) => s.selectedYear);
  const setSelectedYear = useCommunitiesStore((s) => s.setSelectedYear);

  const { communities, parentSchools, memberCounts, userMemberships, isLoading } = useCommunities();
  const { join, leave, isJoining } = useCommunityMembership();

  const [manageCommunityId, setManageCommunityId] = useState<string | null>(null);

  const canManage = (community: Community) => {
    if (!user) return false;
    return user.id === community.created_by || role === "admin" || role === "moderator";
  };

  const toggleMembership = (communityId: string) => {
    if (!user) return showToast("Please sign in", "err");
    if (userMemberships.has(communityId)) leave(communityId);
    else join(communityId);
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Communities</h1>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {(["all", "social", "educational"] as FilterType[]).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`min-h-[44px] px-5 py-2.5 rounded-full text-sm font-semibold capitalize border ${
                filterType === t
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500"
              }`}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>

        {/* If you need a community detail view inside this page, wire the Room tab here. */}

        {/* Educational filters */}
        {filterType === "educational" && (
          <div className="flex gap-2 mb-4 flex-wrap">
            <select
              title="Select school"
              value={selectedParentId ?? ""}
              onChange={(e) => setSelectedParentId(e.target.value || null)}

              className="min-h-[44px] px-4 py-2.5 rounded-2xl border text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            >
              <option value="">All Schools</option>
              {parentSchools.map((school) => (
                <option key={school.id} value={school.id}>{school.name}</option>
              ))}
            </select>
            <select
              title="Select year"
              value={selectedYear ?? ""}
              onChange={(e) => setSelectedYear(e.target.value || null)}

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

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <CommunityGrid
            communities={communities}
            memberCounts={memberCounts}
            userMemberships={userMemberships}
            isJoining={isJoining}
            canManage={canManage}
            onToggleMembership={toggleMembership}
            onManageMembers={setManageCommunityId}
          />
        )}

        {manageCommunityId && (
          <CommunityMembersDrawer
            communityId={manageCommunityId}
            open={!!manageCommunityId}
            onClose={() => setManageCommunityId(null)}
            onMembersChanged={() => {
              queryClient.invalidateQueries({ queryKey: ["communityMemberCounts"] });
            }}
          />
        )}
      </div>
    </AppShell>
  );
}