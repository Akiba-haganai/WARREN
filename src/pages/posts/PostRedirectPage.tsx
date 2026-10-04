import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageLoader } from "../../components/common/PageLoader";

export default function PostRedirectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/", { replace: true });
      return;
    }
    navigate(`/?post=${id}`, { replace: true });
  }, [id, navigate]);

  return <PageLoader />;
}
