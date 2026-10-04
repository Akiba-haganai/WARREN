import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/authStore";
import {
  fetchUserPlans,
  fetchPlanItems,
  toggleItemCompleted,
  generatePlan,
  type CramPlan,
  type CramItem,
} from "../services/cram.service";

export function useCramPlans() {
  const user = useAuthStore((s) => s.user);
  return useQuery<CramPlan[]>({
    queryKey: ["cramPlans", user?.id],
    queryFn: async () => {
      if (!user) return [];
      return fetchUserPlans(user.id);
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCramPlan(planId: string | null) {
  const { data: plans } = useCramPlans();
  return plans?.find((p) => p.id === planId) ?? null;
}

export function useCramPlanItems(planId: string | null) {
  const user = useAuthStore((s) => s.user);
  return useQuery<CramItem[]>({
    queryKey: ["cramPlanItems", planId, user?.id],
    queryFn: async () => {
      if (!user || !planId) return [];
      return fetchPlanItems(planId, user.id);
    },
    enabled: !!user && !!planId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCramActions() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const generate = useMutation({
    mutationFn: async ({
      courseKey,
      examDate,
    }: {
      courseKey: string;
      examDate: string;
    }) => {
      if (!user) throw new Error("User not authenticated");
      return generatePlan(user.id, courseKey, examDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cramPlans", user?.id] });
    },
  });

  const toggle = useMutation({
    mutationFn: async ({
      itemId,
      completed,
      planId,
    }: {
      itemId: string;
      completed: boolean;
      planId: string;
    }) => {
      if (!user) throw new Error("User not authenticated");
      await toggleItemCompleted(itemId, user.id, completed);
      return { itemId, completed, planId };
    },
    onMutate: async ({ itemId, completed, planId }) => {
      await queryClient.cancelQueries({ queryKey: ["cramPlanItems", planId, user?.id] });
      const previousItems = queryClient.getQueryData<CramItem[]>([
        "cramPlanItems",
        planId,
        user?.id,
      ]);

      if (previousItems) {
        queryClient.setQueryData<CramItem[]>(
          ["cramPlanItems", planId, user?.id],
          previousItems.map((item) =>
            item.id === itemId ? { ...item, completed } : item
          )
        );
      }

      return { previousItems };
    },
    onError: (_err, { planId }, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(
          ["cramPlanItems", planId, user?.id],
          context.previousItems
        );
      }
    },
    onSettled: (_data, _err, { planId }) => {
      queryClient.invalidateQueries({ queryKey: ["cramPlanItems", planId, user?.id] });
    },
  });

  return {
    generatePlan: generate.mutateAsync,
    isGenerating: generate.isPending,
    generateError: generate.error,
    toggleItem: toggle.mutate,
  };
}
