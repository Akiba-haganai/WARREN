import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchBounties, createBounty, fulfillBounty, closeBounty } from "../services/bounty.service";
import type { CreateBountyParams, BountyStatus } from "../services/bounty.service";
import { useAuthStore } from "../../../store/authStore";

export function useBounties(initialStatus: BountyStatus = "open") {
  const [status, setStatus] = useState<BountyStatus>(initialStatus);
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const bountiesQuery = useQuery({
    queryKey: ["bounties", status],
    queryFn: () => fetchBounties(status),
  });

  const createMutation = useMutation({
    mutationFn: (params: CreateBountyParams) => {
      if (!user) throw new Error("Not authenticated");
      return createBounty(user.id, params);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bounties"] }),
  });

  const fulfillMutation = useMutation({
    mutationFn: ({ bountyId, materialId }: { bountyId: string; materialId: string }) =>
      fulfillBounty(bountyId, materialId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bounties"] });
      queryClient.invalidateQueries({ queryKey: ["studyLeaderboard"] });
    },
  });

  const closeMutation = useMutation({
    mutationFn: (bountyId: string) => closeBounty(bountyId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bounties"] }),
  });

  return {
    bounties: bountiesQuery.data ?? [],
    isLoading: bountiesQuery.isLoading,
    status,
    setStatus,
    createBounty: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    fulfillBounty: fulfillMutation.mutateAsync,
    isFulfilling: fulfillMutation.isPending,
    closeBounty: closeMutation.mutateAsync,
  };
}
