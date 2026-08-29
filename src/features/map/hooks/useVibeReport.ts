import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchActiveVibe, fetchMyVibeReport, reportVibe } from "../services/vibe.service";
import type { NoiseLevel, CrowdLevel } from "../services/vibe.service";
import { useAuthStore } from "../../../store/authStore";

export function useVibeReport(pinId: string) {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const summaryQuery = useQuery({
    queryKey: ["pinVibe", pinId],
    queryFn: () => fetchActiveVibe(pinId),
    enabled: !!pinId,
  });

  const myReportQuery = useQuery({
    queryKey: ["pinVibe", pinId, "mine", user?.id],
    queryFn: () => fetchMyVibeReport(pinId, user!.id),
    enabled: !!pinId && !!user,
  });

  const reportMutation = useMutation({
    mutationFn: ({ noise, crowd }: { noise: NoiseLevel; crowd: CrowdLevel }) => {
      if (!user) throw new Error("Not authenticated");
      return reportVibe(user.id, pinId, noise, crowd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pinVibe", pinId] });
    },
  });

  return {
    summary: summaryQuery.data ?? null,
    isLoading: summaryQuery.isLoading,
    myReport: myReportQuery.data ?? null,
    report: reportMutation.mutateAsync,
    isReporting: reportMutation.isPending,
  };
}
