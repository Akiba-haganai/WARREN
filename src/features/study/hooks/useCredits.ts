import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { spendCredits, fetchUnlockedMaterialIds } from "../services/study.service";
import { useAuthStore } from "../../../store/authStore";

export function useCredits() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const creditsQuery = useQuery({
    queryKey: ["userCredits", user?.id],
    queryFn: async () => {
      if (!user) return 0;
      const { data } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", user.id)
        .single();
      return data?.credits ?? 0;
    },
    enabled: !!user,
  });

  const unlockedQuery = useQuery({
    queryKey: ["unlockedMaterials", user?.id],
    queryFn: () => fetchUnlockedMaterialIds(user!.id),
    enabled: !!user,
  });

  const unlockMutation = useMutation({
    mutationFn: (materialId: string) => spendCredits(user!.id, materialId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userCredits", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["unlockedMaterials", user?.id] });
    },
  });

  return {
    credits: creditsQuery.data ?? 0,
    unlockedMaterialIds: new Set(unlockedQuery.data ?? []),
    unlockMaterial: unlockMutation.mutate,
  };
}