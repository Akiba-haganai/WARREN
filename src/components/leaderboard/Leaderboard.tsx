import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Database } from "../../types/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function Leaderboard() {
  const [users, setUsers] = useState<Pick<Profile, "username" | "avatar_url" | "karma">[]>([]);

  useEffect(() => {
    supabase.from("profiles").select("username, avatar_url, karma").order("karma", { ascending: false }).limit(10).then(({ data }) => setUsers((data ?? []) as Pick<Profile, "username" | "avatar_url" | "karma">[]));
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4">
      <h3 className="font-bold mb-3">🏆 Weekly Leaderboard</h3>
      {users.map((u, i) => (
        <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
          <span className="text-sm font-bold w-6">{i + 1}</span>
          <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">{u.username?.[0]?.toUpperCase()}</div>
          <span className="text-sm">{u.username}</span>
          <span className="ml-auto text-xs font-semibold text-amber-600">{u.karma} ⚡</span>
        </div>
      ))}
    </div>
  );
}
