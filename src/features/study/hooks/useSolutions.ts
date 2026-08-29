import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchSolutions, createSolution, toggleSolutionUpvote } from "../services/bounty.service";
import { useAuthStore } from "../../../store/authStore";

export function useSolutions(materialId: string) {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const solutionsQuery = useQuery({
    queryKey: ["solutions", materialId, user?.id],
    queryFn: () => fetchSolutions(materialId, user?.id),
    enabled: !!materialId,
  });

  const createMutation = useMutation({
    mutationFn: ({ questionNumber, solutionText }: { questionNumber: string; solutionText: string }) => {
      if (!user) throw new Error("Not authenticated");
      return createSolution(user.id, materialId, questionNumber, solutionText);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["solutions", materialId] }),
  });

  const upvoteMutation = useMutation({
    mutationFn: (solutionId: string) => toggleSolutionUpvote(solutionId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["solutions", materialId] }),
  });

  return {
    solutions: solutionsQuery.data ?? [],
    isLoading: solutionsQuery.isLoading,
    createSolution: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    toggleUpvote: upvoteMutation.mutateAsync,
  };
}
