import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchPendingPins, approvePin, rejectPin } from "../services/map.service";

export function usePendingPins() {
  const queryClient = useQueryClient();

  const pendingQuery = useQuery({
    queryKey: ["pendingPins"],
    queryFn: fetchPendingPins,
  });

  const approveMutation = useMutation({
    mutationFn: (pinId: string) => approvePin(pinId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingPins"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (pinId: string) => rejectPin(pinId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pendingPins"] }),
  });

  return {
    pendingPins: pendingQuery.data ?? [],
    isLoading: pendingQuery.isLoading,
    approve: approveMutation.mutateAsync,
    isApproving: approveMutation.isPending,
    reject: rejectMutation.mutateAsync,
    isRejecting: rejectMutation.isPending,
  };
}
