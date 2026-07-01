import { useQuery } from "@tanstack/react-query";
import { fetchProfile, fetchUserStats, fetchRecentActivity } from "../services/profile.service";

export function useProfileData(userId: string | undefined) {
  const profileQuery = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfile(userId!),
    enabled: !!userId,
  });

  const statsQuery = useQuery({
    queryKey: ["profileStats", userId],
    queryFn: () => fetchUserStats(userId!),
    enabled: !!userId,
  });

  const activityQuery = useQuery({
    queryKey: ["profileActivity", userId],
    queryFn: () => fetchRecentActivity(userId!),
    enabled: !!userId,
  });

  return {
    profile: profileQuery.data ?? null,
    isLoading: profileQuery.isLoading,
    error: profileQuery.error,
    stats: statsQuery.data ?? { posts: 0, comments: 0, karma: 0 },
    activities: activityQuery.data ?? { posts: [], comments: [] },
    refetch: () => {
      profileQuery.refetch();
      statsQuery.refetch();
      activityQuery.refetch();
    },
  };
}