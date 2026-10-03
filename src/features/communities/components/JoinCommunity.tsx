import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { joinCommunity } from "../services/communities.service";
import { useAuthStore } from "../../../store/authStore";
import { Loader2 } from "lucide-react";

export default function JoinCommunity() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [error, setError] = useState("");
  const hasAttempted = useRef(false);

  useEffect(() => {
    if (!id || !user || hasAttempted.current) return;
    hasAttempted.current = true;
    joinCommunity(id)
      .then(() => navigate(`/community/${id}/chat`, { replace: true }))
      .catch(() => setError("Failed to join group. It may be private."));
  }, [id, user, navigate]);

  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;
  return (
    <div className="flex justify-center py-12">
      <Loader2 className="animate-spin" size={24} />
    </div>
  );
}

