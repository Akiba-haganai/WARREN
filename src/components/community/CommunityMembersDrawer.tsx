import { useEffect, useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { fetchMembers, kickMember } from "../../services/communityService";
import { useAuthStore } from "../../store/authStore";

interface Props {
  communityId: string;
  open: boolean;
  onClose: () => void;
  onMembersChanged?: () => void;
  onDirectMessage?: (userId: string) => void;
}

type Member = {
  user_id: string;
  username: string | null;
  avatar_url: string | null;
};

export default function CommunityMembersDrawer({
  communityId,
  open,
  onClose,
  onMembersChanged,
  onDirectMessage,
}: Props) {
  const user = useAuthStore((s) => s.user);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !communityId) return;
    (async () => {
      setLoading(true);
      try {
        const list = await fetchMembers(communityId);
        setMembers(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [open, communityId]);

  const handleKick = async (userId: string) => {
    if (!confirm("Kick this member?")) return;
    try {
      await kickMember(communityId, userId);
      setMembers((prev) => prev.filter((m) => m.user_id !== userId));
      onMembersChanged?.();
    } catch (err) {
      console.error(err);
      alert("Failed to kick member.");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl p-4 animate-slide-up max-h-[60vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Members</h2>
          <button onClick={onClose} className="p-2" aria-label="Close members drawer">
            <X size={18} />
          </button>
        </div>

        {loading ? (
          <p className="text-center text-sm opacity-60 py-4">Loading…</p>
        ) : members.length === 0 ? (
          <p className="text-center text-sm opacity-60 py-4">No members</p>
        ) : (
          <div className="overflow-y-auto max-h-[50vh] space-y-2">
            {members.map((m) => (
              <div
                key={m.user_id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {m.avatar_url ? (
                    <img
                      src={m.avatar_url}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {m.username?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <span className="font-medium text-sm truncate">
                    {m.username ?? "Unknown"}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {user?.id !== m.user_id && (
                    <button
                      onClick={() => onDirectMessage?.(m.user_id)}
                      className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg"
                      title="Send direct message"
                      aria-label={`Message ${m.username}`}
                    >
                      <MessageCircle size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleKick(m.user_id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
                    title="Kick member"
                    aria-label={`Kick ${m.username}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}