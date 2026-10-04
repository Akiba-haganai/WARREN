import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { OnboardingFlow } from "../features/onboarding/components/OnboardingFlow";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const queryClient = useQueryClient();

  const { data: academicProfile, isLoading: profileLoading } = useQuery({
    queryKey: ["academic_profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await (supabase.from as any)("student_academic_profile")
        .select("onboarding_completed")
        .eq("user_id", user.id)
        .maybeSingle();
      
      // If error (e.g. table not found during dev), assume completed to not block
      if (error) {
        console.error("Academic profile check failed:", error);
        return { onboarding_completed: true };
      }
      
      return data;
    },
    enabled: !!user,
    staleTime: Infinity,
  });

  // IMPORTANT: block rendering until auth and profile are known
  if (loading || loading === undefined || (user && profileLoading)) {
    return (
      <div className="min-h-screen bg-blue-50 dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // Only redirect AFTER auth is confirmed resolved
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Handle onboarding
  const needsOnboarding = academicProfile === null || !academicProfile.onboarding_completed;
  if (needsOnboarding) {
    return <OnboardingFlow onComplete={() => queryClient.invalidateQueries({ queryKey: ["academic_profile", user.id] })} />;
  }

  return <>{children}</>;
}