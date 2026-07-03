import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { rateMaterial, fetchAverageRating, fetchMaterialRating } from "../services/study.service";
import { useAuthStore } from "../../../store/authStore";

export function useRateMaterial(materialId: string) {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const ratingQuery = useQuery({
    queryKey: ["materialRating", materialId],
    queryFn: () => fetchAverageRating(materialId),
  });

  const reviewsQuery = useQuery({
    queryKey: ["materialReviews", materialId],
    queryFn: () => fetchMaterialRating(materialId),
  });

  const rateMutation = useMutation({
    mutationFn: async ({ rating, review }: { rating: number; review?: string }) => {
      if (!user) throw new Error("Not authenticated");
      await rateMaterial(user.id, materialId, rating, review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materialRating", materialId] });
      queryClient.invalidateQueries({ queryKey: ["materialReviews", materialId] });
    },
  });

  return {
    averageRating: ratingQuery.data ?? 0,
    reviews: reviewsQuery.data ?? [],
    rate: rateMutation.mutate,
  };
}