import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blockUser, unblockUser, isBlocked as checkBlocked } from "../../../services/blockService";
import { useAuthStore } from "../../../store/authStore";

export function useBlockUser(targetUserId: string | undefined) {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((s) => s.user);
  const isOwn = !targetUserId || targetUserId === currentUser?.id;

  const blockedQuery = useQuery({
    queryKey: ["blocked", targetUserId],
    queryFn: () => checkBlocked(targetUserId!),
    enabled: !!targetUserId && !isOwn,
  });

  const blockMutation = useMutation({
    mutationFn: () => blockUser(targetUserId!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blocked", targetUserId] }),
  });

  const unblockMutation = useMutation({
    mutationFn: () => unblockUser(targetUserId!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blocked", targetUserId] }),
  });

  return {
    blocked: blockedQuery.data ?? false,
    toggleBlock: () => (blockedQuery.data ? unblockMutation.mutate() : blockMutation.mutate()),
    isToggling: blockMutation.isPending || unblockMutation.isPending,
  };
}