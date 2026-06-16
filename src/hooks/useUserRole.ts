import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { fetchProfile } from "../services/profileService";

export function useUserRole() {
  const user = useAuthStore((s) => s.user);

  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadRole() {
      if (!user) {
        if (mounted) {
          setRole(null);
          setLoading(false);
        }
        return;
      }

      try {
        const profile = await fetchProfile(user.id);

        if (mounted) {
          setRole(profile?.role ?? "student");
        }
      } catch {
        if (mounted) {
          setRole("student");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadRole();

    return () => {
      mounted = false;
    };
  }, [user]);

  return {
    role,
    loading,
  };
}