import { useQuery } from "@tanstack/react-query";
import { fetchRelatedMaterials } from "../services/study.service";
import type { StudyMaterial } from "../services/study.service";

export function useRelatedMaterials(material: StudyMaterial | null) {
  return useQuery({
    queryKey: ["relatedMaterials", material?.id],
    queryFn: () => fetchRelatedMaterials(material!),
    enabled: !!material,
  });
}