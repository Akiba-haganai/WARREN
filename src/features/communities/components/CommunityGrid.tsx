import CommunityCard from "./CommunityCard";
import type { Community } from "../../../types/community";

interface Props {
  communities: Community[];
  memberCounts: Record<string, number>;
  userMemberships: Set<string>;
  isJoining: boolean;
  canManage: (community: Community) => boolean;
  onToggleMembership: (communityId: string) => void;
  onManageMembers: (communityId: string) => void;
}

export function CommunityGrid({
  communities,
  memberCounts,
  userMemberships,
  isJoining,
  canManage,
  onToggleMembership,
  onManageMembers,
}: Props) {
  if (communities.length === 0) {
    return (
      <div className="text-center py-12 opacity-60">
        <span className="text-6xl mb-4 block">🏕️</span>
        <p className="font-bold text-xl">No communities found</p>
        <p className="text-sm mt-2">Try changing filters or wait for admins to add them.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {communities.map((community) => (
        <CommunityCard
          key={community.id}
          community={community}
          memberCount={memberCounts[community.id] ?? 0}
          isJoined={userMemberships.has(community.id)}
          isJoining={isJoining}
          canManage={canManage(community)}
          onToggleMembership={() => onToggleMembership(community.id)}
          onManageMembers={onManageMembers}
        />
      ))}
    </div>
  );
}