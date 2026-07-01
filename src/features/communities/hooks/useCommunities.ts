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
    queryKey: ["communities", filterType, selectedParentId, selectedYear],
    queryFn: async () => {
      let data = await fetchCommunities(filterType === "all" ? undefined : filterType);
      if (filterType === "educational") {
        data = data.filter((c) => c.parent_id !== null);
        if (selectedParentId) data = data.filter((c) => c.parent_id === selectedParentId);
        if (selectedYear) data = data.filter((c) => c.year === selectedYear);
      } else if (filterType === "social") {
        data = data.filter((c) => c.type === "social");
      } else {
        data = data.filter((c) => c.type === "social" || c.parent_id !== null);
      }
      return data;
    },
  });

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