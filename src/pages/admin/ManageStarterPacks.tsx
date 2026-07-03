import { useQuery } from "@tanstack/react-query";
import { fetchStarterPacks, fetchStarterPackMaterials, type StarterPack } from "../../features/study/services/study.service";


export default function ManageStarterPacks() {
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