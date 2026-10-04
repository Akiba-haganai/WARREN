import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { fetchProfile, type Profile } from "../features/profile/services/profile.service";

export type CurrentProfile = Profile;

export function useCurrentProfile() {
  const user = useAuthStore((s) => s.user);
  return useQuery<Profile | null>({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      return fetchProfile(user.id);
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });
}
