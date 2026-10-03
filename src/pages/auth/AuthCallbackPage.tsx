import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      // Not signed in — Supabase either failed or hasn't finished yet
      const t = setTimeout(() => {
        if (!useAuthStore.getState().user) navigate("/login", { replace: true });
      }, 3000);
      return () => clearTimeout(t);
    }
    const next = params.get("next") || "/";
    navigate(next, { replace: true });
  }, [user, loading, navigate, params]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <div className="h-10 w-10 mx-auto rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        <p className="mt-3 text-sm text-slate-500">Signing you in…</p>
      </div>
    </div>
  );
}
