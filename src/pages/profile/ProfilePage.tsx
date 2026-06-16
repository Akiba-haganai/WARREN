import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useAuthStore } from "../../store/authStore";
import { fetchProfile, fetchUserStats, fetchRecentActivity } from "../../services/profileService";
import type { Database } from "../../types/database.types";
import {
  Settings, Shield, Bookmark, MessageSquare, Trophy, Users, ChevronRight, Bell, BellOff
} from "lucide-react";
import { usePushNotifications } from "../../hooks/usePushNotifications";
import { Moon } from "lucide-react";
import { useThemeStore } from "../../store/themeStore";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useThemeStore();
  const user = useAuthStore((s) => s.user);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState({ posts: 0, comments: 0, karma: 0 });
  const [activities, setActivities] = useState<{ posts: any[]; comments: any[] }>({ posts: [], comments: [] });
  const [loading, setLoading] = useState(true);

  const { subscribed, requestPermission, unsubscribe } = usePushNotifications();

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const [prof, stat, act] = await Promise.all([
          fetchProfile(user.id),
          fetchUserStats(user.id),
          fetchRecentActivity(user.id),
        ]);
        setProfile(prof);
        setStats(stat);
        setActivities(act);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) return <AppShell><div className="p-4">Loading profile...</div></AppShell>;
  if (!profile) return <AppShell><div className="p-4">Profile not found.</div></AppShell>;

  return (
    <AppShell>
      <div className="px-4 pb-8 space-y-6">
        <div className="relative">
          <div className="h-36 rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400" />
          <div className="absolute -bottom-10 left-5">
            <div className="h-24 w-24 rounded-full border-4 border-white dark:border-slate-950 bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center">
              {profile.avatar_url ? (
                <img aria-label="profile avatr" src={profile.avatar_url} className="h-full w-full rounded-full object-cover" />
              ) : (
                <span className="text-3xl font-bold">{profile.username?.charAt(0).toUpperCase()}</span>
              )}
            </div>
          </div>
        </div>

        <div className="pt-12">
          <h1 className="text-2xl font-bold">{profile.username ?? "Anonymous"}</h1>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-2 mt-2">

  {profile.role === "admin" && (
    <span className="px-3 py-1 rounded-full text-xs bg-red-500 text-white">
      🛡 Admin
    </span>
  )}

  {profile.role === "moderator" && (
    <span className="px-3 py-1 rounded-full text-xs bg-green-500 text-white">
      🛠 Moderator
    </span>
  )}

  {(!profile.role ||
    profile.role === "student") && (
    <span className="px-3 py-1 rounded-full text-xs bg-blue-500 text-white">
      🎓 Student
    </span>
  )}

</div>
            <span className="text-sm opacity-70">
              Member since {new Date(profile.created_at!).getFullYear()}
            </span>
          </div>
          {profile.bio && (
            <p className="mt-4 text-slate-600 dark:text-slate-300">{profile.bio}</p>
          )}
        </div>
        <button
  onClick={() => navigate("/profile/edit")}
  className="mt-4 rounded-xl bg-blue-600 text-white px-4 py-2"
>
  Edit Profile
</button>
<ProfileItem
  icon={<Moon size={20} />}
  label={
    darkMode
      ? "Dark Mode ON"
      : "Dark Mode OFF"
  }
  onClick={toggleTheme}
/>

        <div className="grid grid-cols-3 gap-3">
          <StatBox label="Posts" value={stats.posts} />
          <StatBox label="Karma" value={stats.karma} />
          <StatBox label="Comments" value={stats.comments} />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm">
          <ProfileItem icon={<Bookmark size={20} />} label="Saved Posts" onClick={() => navigate("/profile/saved")} />
          <ProfileItem icon={<MessageSquare size={20} />} label="My Discussions" onClick={() => navigate("/search")} />
          <ProfileItem icon={<Users size={20} />} label="Campus Groups" onClick={() => navigate("/announcements")} />
          <ProfileItem icon={<Trophy size={20} />} label="Achievements" />
          <ProfileItem icon={<Shield size={20} />} label="Privacy & Security" />
          <ProfileItem icon={<Settings size={20} />} label="Settings" onClick={() => navigate("/profile/edit")} />
          <ProfileItem
            icon={subscribed ? <Bell size={20} /> : <BellOff size={20} />}
            label={subscribed ? "Notifications ON" : "Enable Notifications"}
            onClick={subscribed ? unsubscribe : requestPermission}
          />
        </div>

        <div>
          <h2 className="font-bold text-lg mb-3">Recent Activity</h2>
          {activities.posts.map((post) => (
            <div key={post.id} className="rounded-2xl bg-white dark:bg-slate-900 p-4 mb-2 shadow-sm">
              <p className="font-medium">Posted</p>
              <p className="text-sm opacity-70">{post.content}</p>
              <p className="text-xs opacity-50 mt-1">{new Date(post.created_at).toLocaleString()}</p>
            </div>
          ))}
          {activities.comments.map((comment) => (
            <div key={comment.id} className="rounded-2xl bg-white dark:bg-slate-900 p-4 mb-2 shadow-sm">
              <p className="font-medium">Commented</p>
              <p className="text-sm opacity-70">{comment.content}</p>
              <p className="text-xs opacity-50 mt-1">{new Date(comment.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
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

function ProfileItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800"
    >
      <div className="flex items-center gap-3">
        {icon} <span>{label}</span>
      </div>
      <ChevronRight size={18} />
    </button>
  );
}
