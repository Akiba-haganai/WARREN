import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinCommunity, leaveCommunity } from "../services/communities.service";

export function useCommunityMembership() {
  const queryClient = useQueryClient();

  const joinMutation = useMutation({
    mutationFn: (communityId: string) => joinCommunity(communityId),
    onSuccess: () => {
      // Invalidate all community-related queries so the UI updates immediately
      // without requiring a page refresh.
      queryClient.invalidateQueries({ queryKey: ["userMemberships"] });
      queryClient.invalidateQueries({ queryKey: ["communityMemberCounts"] });
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      queryClient.invalidateQueries({ queryKey: ["studyGroups"] });
    },
  });

  const leaveMutation = useMutation({
    mutationFn: (communityId: string) => leaveCommunity(communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userMemberships"] });
      queryClient.invalidateQueries({ queryKey: ["communityMemberCounts"] });
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      queryClient.invalidateQueries({ queryKey: ["studyGroups"] });
    },
  });

  return {
    join: joinMutation.mutate,
    leave: leaveMutation.mutate,
    isJoining: joinMutation.isPending || leaveMutation.isPending,
  };
}