import { useCurrentProfile } from "./useCurrentProfile";

export function useUserRole() {
  const { data: profile, isLoading } = useCurrentProfile();

  return {
    role: profile?.role ?? "student",
    loading: isLoading,
  };
}