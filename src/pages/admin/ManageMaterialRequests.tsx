import { useEffect, useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import { supabase } from "../../lib/supabase";
import { useUserRole } from "../../hooks/useUserRole";

interface MaterialRequest {
  id: string;
  title: string;
  description: string | null;
  subject: string | null;
  created_at: string | null;
  user_id: string;
  profiles: {
    username: string | null;
  } | null;
}

export default function ManageMaterialRequests() {
  const { role } = useUserRole();
  const [requests, setRequests] = useState<MaterialRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "admin" && role !== "moderator") {
      setLoading(false);
      return;
    }
    fetchRequests();
  }, [role]);

  async function fetchRequests() {
    try {
      const { data, error } = await supabase
        .from("material_requests")
        .select("*, profiles:user_id (username)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setRequests(data as MaterialRequest[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this request?")) return;
    await supabase.from("material_requests").delete().eq("id", id);
    setRequests((prev) => prev.filter((r) => r.id !== id));
  }

  if (role !== "admin" && role !== "moderator") {
    return (
      <AppShell>
        <div className="p-6 text-center">
          <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
          <h1 className="text-xl font-bold">Access Denied</h1>
          <p className="opacity-70 mt-2">Only moderators and admins can view this page.</p>
        </div>
      </AppShell>
    );
  }

  if (loading) return <AppShell><div className="p-4">Loading requests...</div></AppShell>;

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Material Requests</h1>
        {requests.length === 0 ? (
          <p className="text-center opacity-60">No requests yet.</p>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => (
              <div key={req.id} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{req.title}</h3>
                    {req.subject && <p className="text-xs text-slate-500">{req.subject}</p>}
                    {req.description && <p className="text-xs text-slate-400 mt-1">{req.description}</p>}
                    <p className="text-xs text-slate-400 mt-1">
                      Requested by {req.profiles?.username ?? "Unknown"} · {req.created_at ? new Date(req.created_at).toLocaleDateString() : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(req.id)}
                    className="text-red-400 hover:text-red-600 ml-3 shrink-0"
                    aria-label="Delete request"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}