import { useQuery } from "@tanstack/react-query";
import { fetchLeaderboard } from "../services/study.service";

export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => fetchLeaderboard(20),
    staleTime: 5 * 60 * 1000,
  });
}