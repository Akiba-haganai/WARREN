import { useEffect, useState } from "react";
import { X, MessageCircle, AlertTriangle, Loader2 } from "lucide-react";
import { fetchMembers, kickMember } from "../../../features/communities/services/communities.service";
import { useAuthStore } from "../../../store/authStore";
import { useToastStore } from "../../../store/toastStore";

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
  const { showToast } = useToastStore();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Custom modal state
  const [memberToKick, setMemberToKick] = useState<Member | null>(null);
  const [isKicking, setIsKicking] = useState(false);

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

  const confirmKick = async () => {
    if (!memberToKick) return;
    setIsKicking(true);
    try {
      await kickMember(communityId, memberToKick.user_id);
      setMembers((prev) => prev.filter((m) => m.user_id !== memberToKick.user_id));
      onMembersChanged?.();
      showToast(`${memberToKick.username} was removed from the community`, "ok");
    } catch (err) {
      console.error(err);
      showToast("Failed to kick member", "err");
    } finally {
      setIsKicking(false);
      setMemberToKick(null);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Main Drawer */}
      <div
        className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl p-4 animate-slide-up flex flex-col shadow-2xl"
          style={{ maxHeight: "70vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h2 className="font-bold text-lg">Members ({members.length})</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close members drawer">
              <X size={18} />
            </button>
          </div>

          {/* Scrollable member list */}
          <div
            className="flex-1 overflow-y-auto space-y-2"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#94a3b8 transparent",
              paddingBottom: "env(safe-area-inset-bottom, 16px)",
            }}
          >
            {loading ? (
              <p className="text-center text-sm opacity-60 py-4">Loading…</p>
            ) : members.length === 0 ? (
              <p className="text-center text-sm opacity-60 py-4">No members</p>
            ) : (
              members.map((m) => (
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
                      onClick={() => setMemberToKick(m)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
                      title="Kick member"
                      aria-label={`Kick ${m.username}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal overlay (rendered on top of drawer) */}
      {memberToKick && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-scale-in text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Kick {memberToKick.username}?</h3>
            <p className="text-slate-500 text-sm mb-6">
              This will remove them from the community. They will have to join again if they want to participate.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMemberToKick(null)}
                disabled={isKicking}
                className="flex-1 py-3 px-4 rounded-xl font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmKick}
                disabled={isKicking}
                className="flex-1 py-3 px-4 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                {isKicking ? <Loader2 size={18} className="animate-spin" /> : "Kick"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}