import { useQuery } from "@tanstack/react-query";
import { useCommunitiesStore } from "../store/communities.store";
import {
  fetchCommunities,
  fetchParentSchools,
  getMemberCounts,
  getUserMemberships,
} from "../services/communities.service";
import { useAuthStore } from "../../../store/authStore";

export function useCommunities() {
  const filterType = useCommunitiesStore((s) => s.filterType);
  const selectedParentId = useCommunitiesStore((s) => s.selectedParentId);
  const selectedYear = useCommunitiesStore((s) => s.selectedYear);
  const user = useAuthStore((s) => s.user);

  const communitiesQuery = useQuery({
    // staleTime: 0 ensures the cache is always considered stale so
    // invalidation from join/leave mutations triggers an immediate refetch.
    staleTime: 0,
    queryKey: ["communities", filterType, selectedParentId, selectedYear],
    queryFn: async () => {
      // Fetch all communities (no type filter when "all") from the service.
      const data = await fetchCommunities(filterType === "all" ? undefined : filterType);

      if (filterType === "educational") {
        // Fix #2: include BOTH parent schools (parent_id = null) AND subgroups
        // (parent_id ≠ null). Previously, parent schools were hidden entirely.
        let filtered = data; // all educational by type

        if (selectedParentId) {
          // Drill-down: only show children of the selected school.
          filtered = data.filter((c) => c.parent_id === selectedParentId);
        }
        // No parentId selected → show both parent schools and their subgroups.

        if (selectedYear) {
          filtered = filtered.filter((c) => c.year === selectedYear || c.year === null);
        }

        return filtered;
      }

      if (filterType === "social") {
        return data.filter((c) => c.type === "social");
      }

      // "all" tab — Fix #2: include all types (social, educational parents AND
      // subgroups, study). Previously parent educational communities were hidden.
      return data.filter(
        (c) => c.type === "social" || c.type === "educational" || c.type === "study"
      );
    },
  });

  // Parent schools are used by the school-filter dropdown. Cache indefinitely
  // since school names rarely change.
  const parentSchoolsQuery = useQuery({
    queryKey: ["parentSchools"],
    queryFn: fetchParentSchools,
    staleTime: Infinity,
  });

  const memberCountsQuery = useQuery({
    queryKey: ["communityMemberCounts", communitiesQuery.data?.map((c) => c.id)],
    queryFn: () => getMemberCounts(communitiesQuery.data?.map((c) => c.id) ?? []),
    enabled: !!communitiesQuery.data && communitiesQuery.data.length > 0,
  });

  const membershipsQuery = useQuery({
    queryKey: ["userMemberships", user?.id],
    queryFn: () => getUserMemberships(user!.id),
    enabled: !!user,
    staleTime: 0,
  });

  return {
    communities: communitiesQuery.data ?? [],
    parentSchools: parentSchoolsQuery.data ?? [],
    memberCounts: memberCountsQuery.data ?? {},
    userMemberships: membershipsQuery.data ?? new Set(),
    isLoading: communitiesQuery.isLoading,
    refetch: communitiesQuery.refetch,
  };
}