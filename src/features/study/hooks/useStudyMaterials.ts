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
    // Fix #9: pageParam is now an offset into the DB result set.
    // Previously the queryFn fetched ALL records then sliced client-side,
    // meaning every page request transferred the entire table over the wire.
    queryFn: async ({ pageParam = 0 }) => {
      const offset = (pageParam as number) * PAGE_SIZE;
      const data = await fetchStudyMaterials(filters, PAGE_SIZE, offset);
      return {
        data,
        // If we got a full page, there may be more; otherwise we're at the end.
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

export function useTrendingMaterials() {
  return useInfiniteQuery({
    queryKey: ["trendingMaterials"],
    queryFn: async ({ pageParam = 0 }) => {
      const all = await fetchTrendingMaterials(20);
      const start = (pageParam as number) * PAGE_SIZE;
      return {
        data: all.slice(start, start + PAGE_SIZE),
        nextCursor: all.length > start + PAGE_SIZE ? (pageParam as number) + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
}