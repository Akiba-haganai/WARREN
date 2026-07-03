import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/authStore";
import {
  fetchRecentlyViewed,
  fetchStudyMaterials,
  fetchTrendingMaterials,
} from "../services/study.service";
import { fetchSavedMaterialIds } from "../services/study.service";

export function usePersonalizedFeed() {
  const user = useAuthStore((s) => s.user);
  const userId = user?.id;

  // 1. Get recently viewed and saved subjects
  const { data: recentSubjects } = useQuery({
    queryKey: ["personalizedSubjects", userId],
    queryFn: async () => {
      if (!userId) return [];
      const [recent, saved] = await Promise.all([
        fetchRecentlyViewed(userId, 10),
        fetchSavedMaterialIds(userId),
      ]);
      // Extract unique subjects
      const subjects = new Set<string>();
      recent.forEach((m) => subjects.add(m.subject));
      if (saved.length > 0) {
        // For saved, we need to fetch actual materials to get subjects; skip for simplicity
        // We'll just use recent subjects for now
      }
      return Array.from(subjects);
    },
    enabled: !!userId,
  });

  // 2. Fetch materials for those subjects + trending as fallback
  const { data: personalizedMaterials } = useQuery({
    queryKey: ["personalizedMaterials", recentSubjects],
    queryFn: async () => {
      if (!recentSubjects || recentSubjects.length === 0) {
        // No history, return trending
        return fetchTrendingMaterials(10);
      }
      // Fetch materials from those subjects, limited to 10
      const materials: any[] = [];
      for (const subject of recentSubjects.slice(0, 3)) {
        const res = await fetchStudyMaterials({ subject });
        materials.push(...res.slice(0, 4));
        if (materials.length >= 10) break;
      }
      if (materials.length < 10) {
        const trending = await fetchTrendingMaterials(10 - materials.length);
        materials.push(...trending);
      }
      return materials.slice(0, 10);
    },
    enabled: !!userId,
  });

  return {
    personalizedMaterials: personalizedMaterials ?? [],
    isLoading: !personalizedMaterials,
  };
}