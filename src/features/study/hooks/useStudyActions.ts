import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveMaterial, unsaveMaterial, incrementDownloadCount } from "../services/study.service";
import { useAuthStore } from "../../../store/authStore";

export function useStudyActions() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const toggleSaveMutation = useMutation({
    mutationFn: async ({ materialId, saved }: { materialId: string; saved: boolean }) => {
      if (!user) throw new Error("Not authenticated");
      if (saved) await unsaveMaterial(user.id, materialId);
      else await saveMaterial(user.id, materialId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedMaterials"] });
    },
  });

  const downloadMutation = useMutation({
    mutationFn: async (material: { id: string; file_url?: string | null; external_url?: string | null }) => {
      await incrementDownloadCount(material.id);
      const url = material.file_url ?? material.external_url;
      if (url) window.open(url, "_blank", "noopener,noreferrer");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studyMaterials"] });
    },
  });

  return {
    toggleSave: toggleSaveMutation.mutate,
    download: downloadMutation.mutate,
  };
}