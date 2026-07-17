import { useEffect, useState } from "react";

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
import { Grid3X3, List } from "lucide-react";
import { supabase } from "../../lib/supabase";

// Optional UI enhancement: Exam countdown widget (events table + event_type=exam)
import { ExamCountdown } from "../../features/events/components/ExamCountdown";

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

  const { communities, parentSchools, memberCounts, userMemberships, isLoading } =
    useCommunities();
  const { join, leave, isJoining } = useCommunityMembership();

  const [manageCommunityId, setManageCommunityId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Realtime events hook placeholder. If you later track a currently opened community here,
  // set selectedCommunity accordingly.
  const [selectedCommunity] = useState<string | null>(null);

  const canManage = (community: Community) => {
    if (!user) return false;
    return user.id === community.created_by || role === "admin" || role === "moderator";
  };

  const toggleMembership = (communityId: string) => {
    if (!user) return showToast("Please sign in", "err");
    if (userMemberships.has(communityId)) leave(communityId);
    else join(communityId);
  };

  useEffect(() => {
    // If/when we track a currently opened community on this page, we can stream events into the cache.
    if (!selectedCommunity) return;

    const channel = supabase
      .channel(`events-${selectedCommunity}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "events",
          filter: `community_id=eq.${selectedCommunity}`,
        },
        (payload) => {
          queryClient.setQueryData(["communityEvents", selectedCommunity], (prev: any) => {
            const prevList = (prev ?? []) as any[];
            return [payload.new, ...prevList];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedCommunity, queryClient]);

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Communities</h1>
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            aria-label="Toggle view"
          >
            {viewMode === "grid" ? <List size={20} /> : <Grid3X3 size={20} />}
          </button>
        </div>

        {/* Exam countdown widget (only when a community is selected/opened) */}
        {selectedCommunity && (
          <div className="mb-4">
            <ExamCountdown communityId={selectedCommunity} />
          </div>
        )}

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
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
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

        {/* Community list / grid */}
        {isLoading ? (
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "space-y-2"}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : communities.length === 0 ? (
          <div className="text-center py-12 opacity-60">
            <span className="text-5xl mb-3 block">🏕️</span>
            <p className="font-bold text-xl">No communities found</p>
          </div>
        ) : viewMode === "grid" ? (
          <CommunityGrid
            communities={communities}
            memberCounts={memberCounts}
            userMemberships={userMemberships}
            isJoining={isJoining}
            canManage={canManage}
            onToggleMembership={toggleMembership}
            onManageMembers={setManageCommunityId}
          />
        ) : (
          <div className="space-y-1">
            {communities.map((community) => (
              <div
                key={community.id}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              >
                <div className="text-2xl shrink-0">{community.icon || "👥"}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{community.name}</p>
                  <p className="text-xs text-slate-500">{memberCounts[community.id] ?? 0} members</p>
                </div>
                {userMemberships.has(community.id) ? (
                  <button
                    onClick={() => leave(community.id)}
                    className="text-xs border border-slate-300 dark:border-slate-600 px-3 py-1.5 rounded-full"
                  >
                    Leave
                  </button>
                ) : (
                  <button
                    onClick={() => join(community.id)}
                    className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full"
                  >
                    Join
                  </button>
                )}
                {canManage(community) && (
                  <button
                    onClick={() => setManageCommunityId(community.id)}
                    className="text-xs text-slate-400 underline"
                  >
                    Manage
                  </button>
                )}
              </div>
            ))}
          </div>
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

