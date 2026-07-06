import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { supabase } from "../../lib/supabase";
import { useUserRole } from "../../hooks/useUserRole";
import { AlertTriangle, GraduationCap } from "lucide-react";

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  role: "student" | "moderator" | "admin";
  is_lecturer: boolean | null;
  karma: number;
  created_at: string | null;
}

export default function ManageUsers() {
  const { role } = useUserRole();
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "admin") {
      setLoading(false);
      return;
    }
    fetchUsers();
  }, [role]);

  async function fetchUsers() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setUsers(data as Profile[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateRole(userId: string, newRole: Profile["role"]) {
    await supabase.from("profiles").update({ role: newRole }).eq("id", userId);
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  }

  async function toggleLecturer(userId: string, current: boolean | null) {
    const newValue = !current;
    await supabase.from("profiles").update({ is_lecturer: newValue }).eq("id", userId);
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, is_lecturer: newValue } : u))
    );
  }

  if (role !== "admin") {
    return (
      <AppShell>
        <div className="p-6 text-center">
          <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
          <h1 className="text-xl font-bold">Access Denied</h1>
          <p className="opacity-70 mt-2">Only admins can view this page.</p>
        </div>
      </AppShell>
    );
  }

  if (loading)
    return (
      <AppShell>
        <div className="p-4 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"
            />
          ))}
        </div>
      </AppShell>
    );

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 border flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {user.username?.[0]?.toUpperCase() ?? "?"}
                </div>
                <div>
                  <p className="font-semibold text-sm">{user.username ?? "Unknown"}</p>
                  <p className="text-xs text-slate-500">{user.karma} karma</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select
                  aria-label="Select role"
                  value={user.role}
                  onChange={(e) => updateRole(user.id, e.target.value as Profile["role"])}
                  className="text-xs border rounded-lg px-2 py-1 bg-white dark:bg-slate-800"
                >
                  <option value="student">Student</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={() => toggleLecturer(user.id, user.is_lecturer)}
                  className={`p-1.5 rounded-lg ${
                    user.is_lecturer
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                  }`}
                  aria-label="Toggle lecturer status"
                >
                  <GraduationCap size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

