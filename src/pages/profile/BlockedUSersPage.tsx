import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { getBlockedUsers, unblockUser } from "../../services/blockService";
import { supabase } from "../../lib/supabase";
import { X } from "lucide-react";

export default function BlockedUsersPage() {
  const [blocked, setBlocked] = useState<any[]>([]);

  useEffect(() => {
    getBlockedUsers().then(async (ids) => {
      if (ids.length === 0) return;
      const { data } = await supabase
        .from("profiles")
        .select("id, username, avatar_url")
        .in("id", ids);
      setBlocked(data ?? []);
    });
  }, []);

  const handleUnblock = async (userId: string) => {
    await unblockUser(userId);
    setBlocked((prev) => prev.filter((b) => b.id !== userId));
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Blocked Users</h1>
        {blocked.length === 0 ? (
          <p className="text-center opacity-60 py-10">No blocked users.</p>
        ) : (
          <div className="space-y-2">
            {blocked.map((user) => (
              <div key={user.id} className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                    {user.username?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <span className="font-medium text-sm">{user.username}</span>
                </div>
                <button
                  onClick={() => handleUnblock(user.id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}