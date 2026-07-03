import { useQuery } from "@tanstack/react-query";
import { fetchRecentlyViewed } from "../services/study.service";
import { useAuthStore } from "../../../store/authStore";

export function useContinueLearning() {
  const user = useAuthStore((s) => s.user);
  return useQuery({
    queryKey: ["continueLearning", user?.id],
    queryFn: () => fetchRecentlyViewed(user!.id),
    enabled: !!user,
  });
}