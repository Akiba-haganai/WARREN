import { Navigate } from "react-router-dom";
import { useUserRole } from "../hooks/useUserRole";

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function RoleRoute({
  allowedRoles,
  children,
}: Props) {
  const { role, loading } =
    useUserRole();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!role) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Admin inherits moderator permissions
  const hasAccess = allowedRoles.includes(role) || (role === "admin" && allowedRoles.includes("moderator"));

  if (!hasAccess) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <>{children}</>;
}
