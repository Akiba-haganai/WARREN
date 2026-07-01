import { useQuery } from "@tanstack/react-query";
import { useStudyStore } from "../store/study.store";
import { fetchStudyMaterials, fetchSubjects, fetchSavedMaterialIds } from "../services/study.service";
import { useAuthStore } from "../../../store/authStore";

export function useStudyMaterials() {
  const { search, yearFilter, typeFilter, subjectFilter } = useStudyStore();
  const user = useAuthStore((s) => s.user);

  const filters = {
    search: search || undefined,
    year_group: yearFilter !== "All" ? yearFilter : undefined,
    material_type: typeFilter !== "All" ? typeFilter : undefined,
    subject: subjectFilter !== "All" ? subjectFilter : undefined,
  };

  const materialsQuery = useQuery({
    queryKey: ["studyMaterials", filters],
    queryFn: () => fetchStudyMaterials(filters),
  });

  const subjectsQuery = useQuery({
    queryKey: ["studySubjects"],
    queryFn: fetchSubjects,
    staleTime: Infinity,
  });

  const savedIdsQuery = useQuery({
    queryKey: ["savedMaterials", user?.id],
    queryFn: () => fetchSavedMaterialIds(user!.id),
    enabled: !!user,
  });

  return {
    materials: materialsQuery.data ?? [],
    subjects: subjectsQuery.data ?? [],
    savedIds: new Set(savedIdsQuery.data ?? []),
    isLoading: materialsQuery.isLoading,
    isError: materialsQuery.isError,
    error: materialsQuery.error,
    refetch: materialsQuery.refetch,
  };
}