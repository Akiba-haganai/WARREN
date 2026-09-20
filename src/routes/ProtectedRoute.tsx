import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  // IMPORTANT: block rendering until auth is known
  if (loading || loading === undefined) {
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

  return <>{children}</>;
}