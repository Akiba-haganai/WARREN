import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useAuthStore } from "../../store/authStore";
import { fetchProfile, fetchUserStats, fetchRecentActivity } from "../../services/profileService";
import { blockUser, unblockUser, isBlocked as checkBlocked } from "../../services/blockService";
import type { Database } from "../../types/database.types";
import {
  Settings, Bookmark, MessageSquare, Trophy, Users, ChevronRight,
  Bell, BellOff, Moon, Send, UserX, UserPlus, Lock,
} from "lucide-react";
import { usePushNotifications } from "../../hooks/usePushNotifications";
import { useThemeStore } from "../../store/themeStore";
import DirectMessageDrawer from "../../components/community/DirectMessageDrawer";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

// ─── Sub‑components ─────────────────────────────────────────────────────────

function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <div className="relative">
      <div className="h-36 rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400" />
      <div className="absolute -bottom-10 left-5">
        <div className="h-24 w-24 rounded-full border-4 border-white dark:border-slate-950 bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt={profile.username ?? ""} className="h-full w-full rounded-full object-cover" />
          ) : (
            <span className="text-3xl font-bold">{profile.username?.charAt(0).toUpperCase()}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileInfo({
  profile,
  isOwn,
  onMessage,
  onToggleBlock,
  blocked,
}: {
  profile: Profile;
  isOwn: boolean;
  onMessage: () => void;
  onToggleBlock: () => void;
  blocked: boolean;
}) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const { subscribed, requestPermission, unsubscribe } = usePushNotifications();
  const darkMode = theme === "dark";

  return (
    <div className="pt-12">
      <h1 className="text-2xl font-bold">{profile.username ?? "Anonymous"}</h1>
      <div className="mt-2 flex items-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs text-white ${
            profile.role === "admin" ? "bg-red-500" : profile.role === "moderator" ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          {profile.role === "admin" ? "🛡 Admin" : profile.role === "moderator" ? "🛠 Moderator" : "🎓 Student"}
        </span>
        <span className="text-sm opacity-70">Member since {new Date(profile.created_at!).getFullYear()}</span>
      </div>
      {profile.bio && <p className="mt-4 text-slate-600 dark:text-slate-300">{profile.bio}</p>}

      {isOwn ? (
        <div className="mt-4 space-y-2">
          <button onClick={() => navigate("/profile/edit")} className="rounded-2xl bg-blue-600 text-white px-4 py-2 text-sm min-h-[44px] w-full font-semibold shadow-sm transition-all duration-200 motion-safe:active:scale-[0.98]">
            Edit Profile
          </button>
          <ProfileItem icon={<Moon size={20} />} label={darkMode ? "Dark Mode ON" : "Dark Mode OFF"} onClick={toggleTheme} />
          <ProfileItem
            icon={subscribed ? <Bell size={20} /> : <BellOff size={20} />}
            label={subscribed ? "Notifications ON" : "Enable Notifications"}
            onClick={subscribed ? unsubscribe : requestPermission}
          />
        </div>
      ) : (
        <div className="mt-4 flex gap-2">
          <button
            onClick={onMessage}
            className="flex-1 rounded-2xl bg-blue-600 text-white px-4 py-2 text-sm flex items-center justify-center gap-2 min-h-[44px] font-semibold shadow-sm transition-all duration-200 motion-safe:active:scale-[0.98]"
          >
            <Send size={20} /> Message
          </button>
          <button
            onClick={onToggleBlock}
            className={`rounded-2xl px-4 py-2 text-sm flex items-center justify-center gap-2 border min-h-[44px] font-semibold transition-all duration-200 motion-safe:active:scale-[0.98] ${
              blocked ? "border-red-500 text-red-500 hover:bg-red-50" : "border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {blocked ? <UserX size={20} /> : <UserPlus size={20} />}
            {blocked ? "Unblock" : "Block"}
          </button>
        </div>
      )}
    </div>
  );
}

function ProfileStats({ stats }: { stats: { posts: number; comments: number; karma: number } }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <StatBox label="Posts" value={stats.posts} />
      <StatBox label="Karma" value={stats.karma} />
      <StatBox label="Comments" value={stats.comments} />
    </div>
  );
}

function ProfileActions({ isOwn, userId }: { isOwn: boolean; userId?: string }) {
  const navigate = useNavigate();
  const target = userId ? `/profile/${userId}` : "/profile";

  const links = [
    { icon: <Bookmark size={20} />, label: "Saved Posts", path: "/profile/saved", ownOnly: true },
    { icon: <MessageSquare size={20} />, label: "My Discussions", path: `${target}/discussions` },
    { icon: <Users size={20} />, label: "Campus Groups", path: `${target}/groups` },
    { icon: <Trophy size={20} />, label: "Achievements", path: `${target}/achievements` },
    { icon: <Lock size={20} />, label: "Privacy & Security", path: `${target}/privacy`, ownOnly: true },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings", ownOnly: true },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm">
      {links
        .filter(l => !l.ownOnly || isOwn)
        .map(({ icon, label, path }) => (
          <ProfileItem key={label} icon={icon} label={label} onClick={() => navigate(path)} />
        ))}
    </div>
  );
}

function RecentActivity({ activities, userId }: { activities: { posts: any[]; comments: any[] }; userId?: string }) {
  const navigate = useNavigate();
  const previewPosts = activities.posts.slice(0, 2);
  const previewComments = activities.comments.slice(0, 2);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-lg">Recent Activity</h2>
        {activities.posts.length > 2 || activities.comments.length > 2 ? (
          <button
            onClick={() => navigate(`/profile/${userId}/discussions`)}
            className="text-sm text-blue-600 dark:text-blue-400 font-medium"
          >
            View all
          </button>
        ) : null}
      </div>
      <div className="space-y-2">
        {previewPosts.map(post => (
          <ActivityCard key={post.id} type="post" content={post.content} date={post.created_at} />
        ))}
        {previewComments.map(comment => (
          <ActivityCard key={comment.id} type="comment" content={comment.content} date={comment.created_at} />
        ))}
        {previewPosts.length === 0 && previewComments.length === 0 && (
          <p className="text-sm opacity-60">No recent activity</p>
        )}
      </div>
    </div>
  );
}

function ActivityCard({ type, content, date }: { type: "post" | "comment"; content: string; date: string }) {
  return (
    <div className="rounded-xl bg-white dark:bg-slate-900 p-3 shadow-sm border border-slate-100 dark:border-slate-800">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
        {type === "post" ? "Posted" : "Commented"}
      </p>
      <p className="text-sm text-slate-700 dark:text-slate-200 line-clamp-2">{content}</p>
      <p className="text-[11px] text-slate-400 mt-1">{new Date(date).toLocaleDateString()}</p>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 text-center shadow-sm">
      <h2 className="font-bold text-xl">{value}</h2>
      <p className="text-xs opacity-70">{label}</p>
    </div>
  );
}

function ProfileItem({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-4 min-h-[44px] border-b border-slate-100 dark:border-slate-800 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 motion-safe:active:scale-[0.98]"
    >
      <div className="flex items-center gap-3 font-medium">
        {icon} <span>{label}</span>
      </div>
      <ChevronRight size={20} />
    </button>
  );
}

// ─── Main ProfilePage ─────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { userId } = useParams<{ userId?: string }>();
  const currentUser = useAuthStore((s) => s.user);
  const targetUserId = userId || currentUser?.id;
  const isOwn = !userId || userId === currentUser?.id;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState({ posts: 0, comments: 0, karma: 0 });
  const [activities, setActivities] = useState<{ posts: any[]; comments: any[] }>({ posts: [], comments: [] });
  const [loading, setLoading] = useState(true);

  const [dmOpen, setDmOpen] = useState(false);
  const [dmReceiver, setDmReceiver] = useState<{ id: string; name: string } | null>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!targetUserId) return;
    (async () => {
      try {
        setLoading(true);
        const [prof, stat, act] = await Promise.all([
          fetchProfile(targetUserId),
          fetchUserStats(targetUserId),
          fetchRecentActivity(targetUserId),
        ]);
        setProfile(prof);
        setStats(stat);
        setActivities(act);

        if (!isOwn) {
          const isB = await checkBlocked(targetUserId);
          setBlocked(isB);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [targetUserId]);

  const handleMessage = () => {
    if (profile) {
      setDmReceiver({ id: profile.id, name: profile.username ?? "User" });
      setDmOpen(true);
    }
  };

  const handleToggleBlock = async () => {
    if (!targetUserId) return;
    try {
      if (blocked) {
        await unblockUser(targetUserId);
        setBlocked(false);
      } else {
        await blockUser(targetUserId);
        setBlocked(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <AppShell><div className="p-4">Loading profile...</div></AppShell>;
  if (!profile) return <AppShell><div className="p-4">Profile not found.</div></AppShell>;

  return (
    <AppShell>
      <div className="px-4 pb-8 space-y-6">
        <ProfileHeader profile={profile} />
        <ProfileInfo
          profile={profile}
          isOwn={isOwn}
          onMessage={handleMessage}
          onToggleBlock={handleToggleBlock}
          blocked={blocked}
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
