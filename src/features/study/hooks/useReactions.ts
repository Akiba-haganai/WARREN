import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleReaction, fetchReactions } from "../services/study.service";
import { useAuthStore } from "../../../store/authStore";

export function useReactions(materialId: string) {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const reactionsQuery = useQuery({
    queryKey: ["materialReactions", materialId],
    queryFn: () => fetchReactions(materialId),
  });

  const toggleMutation = useMutation({
    mutationFn: (emoji: string) => toggleReaction(user!.id, materialId, emoji),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materialReactions", materialId] });
    },
  });

  return {
    reactions: reactionsQuery.data ?? [],
    toggle: (emoji: string) => toggleMutation.mutate(emoji),
  };
}