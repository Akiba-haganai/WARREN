import { Navigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user =
    useAuthStore(
      (state) => state.user
    );

  const loading =
    useAuthStore(
      (state) => state.loading
    );

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (!user)
    return (
      <Navigate
        to="/login"
        replace
      />
    );

  return children;
}