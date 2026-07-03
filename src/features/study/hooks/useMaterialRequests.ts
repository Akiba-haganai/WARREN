import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createMaterialRequest, fetchMaterialRequests } from "../services/study.service";
import { useAuthStore } from "../../../store/authStore";

export function useMaterialRequests() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const requestsQuery = useQuery({
    queryKey: ["materialRequests"],
    queryFn: fetchMaterialRequests,
  });

  const createMutation = useMutation({
    mutationFn: (data: { title: string; description?: string; subject?: string }) =>
      createMaterialRequest(user!.id, data.title, data.description, data.subject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materialRequests"] });
    },
  });

  return {
    requests: requestsQuery.data ?? [],
    createRequest: createMutation.mutateAsync,
  };
}