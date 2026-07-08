import { useState, useEffect, useRef } from "react";
import { supabase } from "../../../lib/supabase";

interface Member {
  user_id: string;
  profiles: { username: string | null; avatar_url: string | null };
}

interface Props {
  communityId: string;
  onSelect: (userId: string, username: string) => void;
  onClose: () => void;
  query: string; // text after @
}

export function MentionsDropdown({ communityId, onSelect, onClose, query }: Props) {
  const [members, setMembers] = useState<Member[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!communityId) return;
    supabase
      .from("community_members")
      .select("user_id, profiles(user_id, username, avatar_url)")
      .eq("community_id", communityId)
      .then(({ data }) => {
        if (data) {
          const filtered = (data as any).filter((m: any) =>
            m.profiles?.username?.toLowerCase().includes(query.toLowerCase())
          );
          setMembers(filtered);
        }
      });
  }, [communityId, query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div ref={ref} className="absolute bottom-full left-0 w-48 bg-white dark:bg-slate-800 border rounded-xl shadow-lg max-h-40 overflow-y-auto z-50">
      {members.slice(0, 10).map((m) => (
        <button
          key={m.user_id}
          onClick={() => { onSelect(m.user_id, m.profiles.username || "User"); onClose(); }}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center text-[10px] font-bold">
            {m.profiles.username?.[0]?.toUpperCase() || "?"}
          </div>
          <span className="truncate">{m.profiles.username}</span>
        </button>
      ))}
    </div>
  );
}