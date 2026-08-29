import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useStudyStore } from "../store/study.store";
import { fetchStudyMaterials, fetchSubjects, fetchSavedMaterialIds, fetchTrendingMaterials } from "../services/study.service";
import { useAuthStore } from "../../../store/authStore";
import type { StudyFilters } from "../services/study.service";

const PAGE_SIZE = 10;

export function useStudyMaterials() {
  const { search, yearFilter, typeFilter, subjectFilter, programmeFilter } = useStudyStore();
  const user = useAuthStore((s) => s.user);

  const filters: StudyFilters = {
    search: search || undefined,
    year_group: yearFilter !== "All" ? yearFilter : undefined,
    material_type: typeFilter !== "All" ? typeFilter : undefined,
    subject: subjectFilter !== "All" ? subjectFilter : undefined,
    programme: programmeFilter !== "All" ? programmeFilter : undefined,
  };

  const materialsQuery = useInfiniteQuery({
    queryKey: ["studyMaterials", filters],
    queryFn: async ({ pageParam = 0 }) => {
      const offset = (pageParam as number) * PAGE_SIZE;
      const data = await fetchStudyMaterials(filters, PAGE_SIZE, offset);
      return {
        data,
        nextCursor: data.length === PAGE_SIZE ? (pageParam as number) + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
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
    materials: materialsQuery.data?.pages.flatMap((p) => p.data) ?? [],
    subjects: subjectsQuery.data ?? [],
    savedIds: new Set(savedIdsQuery.data ?? []),
    isLoading: materialsQuery.isLoading,
    isFetchingNextPage: materialsQuery.isFetchingNextPage,
    hasNextPage: !!materialsQuery.hasNextPage,
    fetchNextPage: materialsQuery.fetchNextPage,
    isError: materialsQuery.isError,
    error: materialsQuery.error,
    refetch: materialsQuery.refetch,
  };
}

// Fixed: this used to call fetchTrendingMaterials(20) on every page and
// slice a fixed 20-row pool client-side, so infinite scroll silently
// dead-ended after 20 items no matter how many materials were actually
// trending. It now asks the server for the next page directly, the same
// way useStudyMaterials does, so pagination has no artificial ceiling.
export function useTrendingMaterials() {
  return useInfiniteQuery({
    queryKey: ["trendingMaterials"],
    queryFn: async ({ pageParam = 0 }) => {
      const offset = (pageParam as number) * PAGE_SIZE;
      const data = await fetchTrendingMaterials(PAGE_SIZE, offset);
      return {
        data,
        nextCursor: data.length === PAGE_SIZE ? (pageParam as number) + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
}