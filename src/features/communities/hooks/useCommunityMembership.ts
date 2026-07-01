import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinCommunity, leaveCommunity } from "../services/communities.service";

export function useCommunityMembership() {
  const queryClient = useQueryClient();

  const joinMutation = useMutation({
    mutationFn: (communityId: string) => joinCommunity(communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userMemberships"] });
      queryClient.invalidateQueries({ queryKey: ["communityMemberCounts"] });
    },
  });

  const leaveMutation = useMutation({
    mutationFn: (communityId: string) => leaveCommunity(communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userMemberships"] });
      queryClient.invalidateQueries({ queryKey: ["communityMemberCounts"] });
    },
  });

  return {
    join: joinMutation.mutate,
    leave: leaveMutation.mutate,
    isJoining: joinMutation.isPending || leaveMutation.isPending,
  };
}