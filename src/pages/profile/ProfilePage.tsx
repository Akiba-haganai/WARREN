import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useAuthStore } from "../../store/authStore";
import { useProfileData } from "../../features/profile/hooks/useProfileData";
import { useBlockUser } from "../../features/profile/hooks/useBlockUser";
import { ProfileHeader } from "../../features/profile/components/ProfileHeader";
import { ProfileInfo } from "../../features/profile/components/ProfileInfo";
import { ProfileStats } from "../../features/profile/components/ProfileStats";
import { ProfileActions } from "../../features/profile/components/ProfileActions";
import { RecentActivity } from "../../features/profile/components/RecentActivity";
import DirectMessageDrawer from "../../components/community/DirectMessageDrawer";

export default function ProfilePage() {
  const { userId } = useParams<{ userId?: string }>();
  const currentUser = useAuthStore((s) => s.user);
  const targetUserId = userId || currentUser?.id;
  const isOwn = !userId || userId === currentUser?.id;

  const { profile, isLoading, error, stats, activities } = useProfileData(targetUserId);
  const { blocked, toggleBlock } = useBlockUser(isOwn ? undefined : targetUserId);

  const [dmOpen, setDmOpen] = useState(false);
  const [dmReceiver, setDmReceiver] = useState<{ id: string; name: string } | null>(null);

  // When profile loads, set DM receiver for the "Message" button
  useEffect(() => {
    if (profile && !isOwn) {
      setDmReceiver({ id: profile.id, name: profile.username ?? "User" });
    }
  }, [profile, isOwn]);

  const handleMessage = () => {
    setDmOpen(true);
  };

  if (isLoading) return <AppShell><div className="p-4">Loading profile...</div></AppShell>;
  if (error) return <AppShell><div className="p-4 text-red-500">Error loading profile</div></AppShell>;
  if (!profile) return <AppShell><div className="p-4">Profile not found.</div></AppShell>;

  return (
    <AppShell>
      <div className="px-4 pb-8 space-y-6">
        <ProfileHeader avatarUrl={profile.avatar_url} username={profile.username ?? "?"} karma={profile.karma} />
        <ProfileInfo
          profile={profile}
          isOwn={isOwn}
          blocked={blocked}
          onMessage={handleMessage}
          onToggleBlock={toggleBlock}
        />
        <ProfileStats stats={stats} />
        <ProfileActions isOwn={isOwn} userId={targetUserId} />
        <RecentActivity activities={activities} userId={targetUserId} />

        {dmReceiver && (
          <DirectMessageDrawer
            open={dmOpen}
            onClose={() => setDmOpen(false)}
            receiverId={dmReceiver.id}
            receiverName={dmReceiver.name}
          />
        )}
      </div>
    </AppShell>
  );
}