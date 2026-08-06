import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Plus, UserX, MessageCircle, Mic, Phone } from "lucide-react";
import { useToastStore } from "../../../store/toastStore";
import type { Community } from "../../../types/community";
import { getCommunityGradient } from "../utils/communityColors";

interface Props {
  community: Community;
  memberCount: number;
  isJoined: boolean;
  isJoining: boolean;
  canManage: boolean;
  onToggleMembership: (id: string) => void;
  onManageMembers: (id: string) => void;
}

function CommunityCard({
  community,
  memberCount,
  isJoined,
  isJoining,
  canManage,
  onToggleMembership,
  onManageMembers,
}: Props) {
  const navigate = useNavigate();
  const { showToast } = useToastStore();

  const handleCardClick = () => {
    if (isJoined) {
      navigate(`/community/${community.id}/chat`);
    } else {
      showToast("Join the community to chat!");
    }
  };

  const gradientClass = getCommunityGradient(community.cover_color, community.id || community.name);

  return (
    <div
      onClick={handleCardClick}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradientClass} p-5 shadow-lg border border-white/10 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 group cursor-pointer`}
      title={isJoined ? "Open chat" : "Join to chat"}
    >
      {/* Subtle ambient lighting mesh */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/15 pointer-events-none" />

      {/* Background icon */}
      <div className="absolute -bottom-4 -right-4 text-6xl opacity-20 select-none pointer-events-none group-hover:scale-110 transition-transform duration-300">
        {community.icon}
      </div>

      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between mb-2">
          <div className="text-3xl">
            {community.icon.startsWith("http") ? (
              <img src={community.icon} alt="" className="w-8 h-8 rounded-lg object-cover" />
            ) : (
              community.icon
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {canManage && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onManageMembers(community.id);
                }}
                className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30"
                title="Manage members"
              >
                <UserX size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Name & Description */}
        <h3 className="font-bold text-white text-lg leading-tight mb-1">
          {community.name}
        </h3>
        <p className="text-white/80 text-sm line-clamp-2 mb-3">
          {community.description}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white/90 text-xs font-medium">
            <Users size={14} />
            <span>
              {memberCount} {memberCount === 1 ? "member" : "members"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isJoined ? (
              <>
                <span className="flex items-center gap-1.5 bg-white text-slate-900 drop-shadow-md text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95">
                  <MessageCircle size={14} />
                  Open Chat
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/community/${community.id}/ama`);
                  }}
                  className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 drop-shadow-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-white/30 hover:scale-105 active:scale-95"
                  title="Ask Me Anything sessions"
                >
                  <Mic size={14} />
                  AMAs
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/community/${community.id}/room`);
                  }}
                  className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 drop-shadow-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-white/30 hover:scale-105 active:scale-95"
                  title="Open Study Room"
                >
                  <Phone size={14} />
                  Study Room
                </button>
              </>
            ) : (

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleMembership(community.id);
                }}
                disabled={isJoining}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-900 hover:bg-white/90 disabled:opacity-60"
              >
                <Plus size={14} /> Join
              </button>
            )}
          </div>


        </div>
      </div>
    </div>
  );
}

export default memo(CommunityCard);
