import { useQuery } from "@tanstack/react-query";
import { fetchStarterPacks, fetchStarterPackMaterials, type StarterPack } from "../services/study.service";

export function useStarterPacks() {
  const packsQuery = useQuery({ queryKey: ["starterPacks"], queryFn: fetchStarterPacks });

  const packMaterialsQueries = useQuery({
    queryKey: ["starterPackMaterials", packsQuery.data],
    queryFn: async () => {
      if (!packsQuery.data) return [];
      const all = await Promise.all(packsQuery.data.map((p: StarterPack) => fetchStarterPackMaterials(p)));
      return all;
    },
    enabled: !!packsQuery.data,
  });

  return {
    packs: packsQuery.data ?? [],
    packMaterials: packMaterialsQueries.data ?? [],
    isLoading: packsQuery.isLoading,
  };
}